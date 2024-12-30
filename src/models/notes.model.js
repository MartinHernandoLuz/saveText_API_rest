import db from "../config/db.js";
import { decrypt, encrypt } from "../tools/textEncrypt.js";
import bcrypt from 'bcryptjs'

// Create a note in database
export const createNoteDB = async (data) => {
    try {
        const { note_name, text, user_username, email, password } = data;

        // Check if email or username exists in the database
        const find_email = "SELECT email, password_hash FROM users WHERE email = ? OR username = ?";
        const [rows] = await db.query(find_email, [email, user_username]);

        if (rows.length === 0) {
            throw new Error("This email or username does not exist");
        }
        // Check if note already exists in the database
        const find_note = "SELECT note_name FROM notes WHERE user_username = ? and note_name = ?";
        const [row2] = await db.query(find_note, [user_username, note_name]);

        if (row2.length > 0) {
            throw new Error("This note_name already exist");
        }

        // Verify password
        const user = rows[0]; // Get the first row
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new Error("Incorrect password");
        }

        // Encrypt the text for the note
        const encrypted_text = await encrypt(text);

        console.log(encrypted_text);

        // Insert the note into the database
        const insert_note = "INSERT INTO notes (user_username, note_name, encrypted_text) VALUES (?, ?, ?)";
        await db.query(insert_note, [user_username, note_name, encrypted_text]);

        return {
            message: `Note ${note_name} created successfully`
        };
    } catch (error) {
        console.error(error.message);

        const expectedErrors = [
            "This email or username does not exist",
            "Incorrect password",
            "This note_name already exist"
        ];

        // Handle unexpected errors
        if (!expectedErrors.includes(error.message)) {
            throw new Error("Unexpected error while creating user");
        }

        throw error; // Rethrow known errors
    }
};

// Get note by note name
export const getNoteByNoteNameDB = async (data) => {
    try {
        const { note_name, user_username, password, email } = data;

        /* middleware
         // Validate input
         if (!note_name || !user_username || !password || !email) {
             throw new Error("Missing required fields: note_name, user_username, password, email");
         }
         */


        // Check if email or username exists in the database
        const sqlFindUser = `
            SELECT email, password_hash 
            FROM users 
            WHERE (email = ? OR username = ?) 
            LIMIT 1
        `;
        const [userRows] = await db.query(sqlFindUser, [email, user_username]);

        if (userRows.length === 0) {
            throw new Error("Invalid credentials");
        }

        // Verify password
        const user = userRows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        // Retrieve the note
        const sqlFindNote = `
            SELECT encrypted_text 
            FROM notes 
            WHERE note_name = ? AND user_username = ?
        `;
        const [noteRows] = await db.query(sqlFindNote, [note_name, user_username]);

        if (noteRows.length === 0) {
            throw new Error("Note not found");
        }

        const note = noteRows[0];
        const text = await decrypt(note.encrypted_text);

        return { message: text };
    } catch (error) {
        console.error("Error in getNoteByNoteName:", error);

        const expectedErrors = [
            "Invalid credentials",
            "Note not found"
        ];

        if (!expectedErrors.includes(error.message)) {
            throw new Error("Unexpected error while retrieving note");
        }

        throw error; // Rethrow known errors
    }
};

// get all notes by username
export const getNotesByUserNameDB = async (data) => {
    try {
        const { user_username, password, email } = data;

        // Check if email or username exists in the database
        const sqlFindUser = `
            SELECT email, password_hash 
            FROM users 
            WHERE (email = ? OR username = ?) 
            LIMIT 1
        `;
        const [userRows] = await db.query(sqlFindUser, [email, user_username]);

        if (userRows.length === 0) {
            throw new Error("Invalid credentials");
        }

        // Verify password
        const user = userRows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        // Retrieve the notes
        const sqlFindNote = `
            SELECT note_name 
            FROM notes 
            WHERE user_username = ?
        `;
        const [noteRows] = await db.query(sqlFindNote, [user_username]);

        if (noteRows.length === 0) {
            return { notes: [] };
        }

        return { notes: noteRows };
    } catch (error) {
        console.error(error);

        const expectedErrors = [
            "Invalid credentials"
        ];

        if (!expectedErrors.includes(error.message)) {
            throw new Error("Unexpected error while retrieving notes");
        }

        throw error; // Rethrow known errors
    }
};

// update note name by username (####### SIN TERMINAR)
export const updateNoteNameDB = async (data) => {
    try {
        const { note_name, new_note_name, user_username, password, email } = data;

        // Check if email or username exists in the database
        const find_email = "SELECT email, password_hash FROM users WHERE email = ? OR username = ?";
        const [rows] = await db.query(find_email, [email, user_username]);

        if (rows.length === 0) {
            throw new Error("Invalid credentials");
        }

        // Verify password
        const user = rows[0]; // Get the first row
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        // Check if note name exists in the database and new_note_name already exists
        const find_note = "SELECT note_name FROM notes WHERE user_username = ? and note_name = ?";
        const [row2] = await db.query(find_note, [user_username, note_name]);

        if (row2.length === 0) {
            throw new Error("Note name does not exist");
        }
        else if (row2[0].note_name === new_note_name) {
            throw new Error("New note name already exists");
        }


        // update note name
        const sentence2 = `UPDATE notes 
                            SET note_name = ? 
                            WHERE user_username = ? and note_name = ?`;
        await db.query(sentence2, [new_note_name, user_username, note_name]);

        return { message: `${note_name} updated to ${new_note_name}` };

    } catch (error) {
        console.error("Error in updateNoteNameDB: ", error);

        const expectedErrors = [
            "Invalid credentials",
            "Note name does not exist",
            "New note name already exists"
        ];

        if (!expectedErrors.includes(error.message)) {
            throw new Error("Unexpected error while updating note name");
        }

        throw error; // Rethrow known errors
    }
}

// update text by user and username (######## SIN TERMINAR)
export const updateTextDB = async (data) => {
    try {
        const { note_name, new_text, user_username, email, password } = data;

        // Check if email or username exists in the database
        const find_email = "SELECT email, password_hash FROM users WHERE email = ? OR username = ?";
        const [rows] = await db.query(find_email, [email, user_username]);

        if (rows.length === 0) {
            throw new Error("Invalid credentials");
        }

        // Verify password
        const user = rows[0]; // Get the first row
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        // Check if note  exists in the database
        const find_note = "SELECT note_name FROM notes WHERE user_username = ? and note_name = ?";
        const [row2] = await db.query(find_note, [user_username, note_name]);

        if (row2.length === 0) {
            throw new Error("The note name does not exist");
        }



        // Encrypt the text for the note
        const encrypted_text = await encrypt(new_text);

        console.log(encrypted_text);

        // update note name
        const sentence2 = `UPDATE notes 
                            SET encrypted_text = ? 
                            WHERE user_username = ? and note_name = ?`;
        await db.query(sentence2, [encrypted_text, user_username, note_name]);

        return { message: `text updated successfully` };
    } catch (error) {
        console.error("Error in updatedNoteNameDB: ", error);

        const expectedErrors = [
            "Invalid credentials",
            "The note name does not exist"
        ];

        if (!expectedErrors.includes(error.message)) {
            throw new Error("Unexpected error while retrieving note");
        }

        throw error; // Rethrow known errors
    }
}

// delete note by note name and username
export const deleteNoteByNoteNameDB = async (data) => {
    try {
        const { user_username, password, email, note_name } = data;

        // Check if email or username exists in the database
        const sqlFindUser = `
            SELECT email, password_hash 
            FROM users 
            WHERE (email = ? OR username = ?) 
            LIMIT 1
        `;
        const [userRows] = await db.query(sqlFindUser, [email, user_username]);

        if (userRows.length === 0) {
            throw new Error("Invalid credentials");
        }

        // Verify password
        const user = userRows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        // Find note ID
        const sqlGetNoteId = `
            SELECT id_note 
            FROM notes 
            WHERE note_name = ? AND user_username = ?
        `;
        const [idNoteRows] = await db.query(sqlGetNoteId, [note_name, user_username]);

        if (idNoteRows.length === 0) {
            throw new Error("Note not found");
        }

        // Delete note
        const sqlDeleteNote = `
            DELETE FROM notes 
            WHERE id_note = ?
        `;
        const [deleteResult] = await db.query(sqlDeleteNote, [idNoteRows[0].id_note]);

        if (deleteResult.affectedRows === 0) {
            throw new Error("Failed to delete note");
        }

        return { message: "Note successfully deleted" };
    } catch (error) {
        console.error("Error in deleteNoteByNoteName:", error);

        const expectedErrors = [
            "Invalid credentials",
            "Note not found"
        ];

        if (!expectedErrors.includes(error.message)) {
            throw new Error("Unexpected error while deleting note");
        }

        throw error; // Rethrow known errors
    }
};
