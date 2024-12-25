import crypto from 'crypto'

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

const IV_LENGTH = 16

// Function to encrypt text (wrapped in a Promise to use async/await)
export async function encrypt(text) {
    return new Promise((resolve, reject) => {
        try {
            const iv = crypto.randomBytes(IV_LENGTH); // Generate a random IV
            const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
            let encrypted = cipher.update(text, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            // Return the concatenated IV and encrypted text as a string
            resolve(iv.toString('hex') + ':' + encrypted);
        } catch (error) {
            reject(error); // Reject the promise if any error occurs
        }
    });
}

// Function to decrypt text (wrapped in a Promise to use async/await)
export async function decrypt(text) {
    return new Promise((resolve, reject) => {
        try {
            const parts = text.split(':'); // Split the IV from the encrypted text
            const iv = Buffer.from(parts[0], 'hex'); // Convert the IV from hex to a buffer
            const encryptedText = parts[1]; // Extract the encrypted text
            const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
            let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
            decrypted += decipher.final('utf8'); // Final step to get the decrypted text
            resolve(decrypted); // Return the decrypted text
        } catch (error) {
            reject(error); // Reject the promise if any error occurs
        }
    });
}
