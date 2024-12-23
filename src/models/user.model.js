import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// db is in the configuration folder, this is used to access the database






// Create a user in data base
export const createUserDB = async (data) => {
  try {
    const { username, full_name, email, password } = data;

    // check if email or username is in database
    const find_email = "SELECT email FROM users WHERE email = ? OR username = ?";
    const [row] = await db.query(find_email, [email, username]);
    if (row.length == 1) {
      throw new Error("this email or username already in use");
    }

    // encript password
    const hashedPassword = await bcrypt.hash(password, 12);


    // This inserts the user into the Database with encrypted password
    const sentence = "INSERT INTO users (email, password_hash, username, full_name) VALUES (?, ?, ?, ?)";
    await db.query(sentence, [email, hashedPassword, username, full_name]);

    return {
      message: `user ${username} created successfully`
    };
  } catch (error) {
    console.log(error.message)
    const expectedErrors = [
      "this email or username already in use"
    ];
    if (!expectedErrors.includes(error.message)) {
      throw new Error("unexpected error to create user")
    }
    throw error
  }
};



// login
export const loginUserDB = async (data) => {
  try {
    const { email, password } = data;

    // find the email
    const sentence = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.query(sentence, [email]);

    // email exists?
    if (rows.length === 0) {
      throw new Error("Email not found");
    }

    const user = rows[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error("Incorrect password");
    }

    // Generate jwt (token)
    const token = jwt.sign(
      { email: user.email, role: user.role_user },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // token expiration time
    );

    return {
      token: token,
    };

  } catch (error) {
    console.log(error.message)
    const expectedErrors = [
      "Email not found",
      "Incorrect password",
    ];
    if (!expectedErrors.includes(error.message)) {
      throw new Error("unexpected error to login")
    }
    throw error
  }
};

// update user
export const updateUsernameDB = async (data) => {
  try {
    const { email, username, password } = data

    // find email
    const sentence = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.query(sentence, [email]);
    // email exists?
    if (rows.length === 0) {
      throw new Error("Email not found");
    }


    // Verify password
    const user = rows[0]
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error("Incorrect password");
    }

    // begin the update
    const sentence2 = `
      UPDATE users 
      SET username = ? 
      WHERE email = ? 
      AND DATEDIFF(NOW(), updated_at) >= 14`; // Is the difference between now and update_at more than 14 days?
    const [result] = await db.query(sentence2, [username, email]);
    if (result.affectedRows === 0) {
      throw new Error(
        "14 days have not passed since the last update"
      )
    };

    return {
      email: email,
      newUsername: username,
    };
  } catch (error) {
    console.log(error.message)
    const expectedErrors = [
      "Incorrect password",
      "Email not found",
      "14 days have not passed since the last update",
    ];

    if (!expectedErrors.includes(error.message)) {
      throw new Error("Unexpected error while updating");
    }
    throw error
  }
}

// udate role
export const updateRoleUserDB = async (data) => {
  try {
    const { email, role } = data;

    // find email
    const sentence = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.query(sentence, [email]);

    // email exists?
    if (rows.length === 0) {
      throw new Error("Email not found");
    }

    const sentence2 = `UPDATE users SET role_user = ? WHERE email = ?`;
    await db.query(sentence2, [role, email]);

    return {
      email: email,
      newRole: role,
    };

  } catch (error) {
    console.log(error.message)
    const expectedErrors = [
      "Email not found"
    ];
    if (!expectedErrors.includes(error.message)) {
      throw new Error("Unexpected error while updating")
    }
    throw error
  }
};

// delete user
export const deleteUserDB = async (data) => {
  try {
    const { email, password, username } = data;

    // Find email and username
    const sentence = "SELECT * FROM users WHERE email = ? AND username = ?";
    const [rows] = await db.query(sentence, [email, username]);

    // Email and username exist?
    if (rows.length === 0) {
      throw new Error("Email or username is incorrect");
    }

    const user = rows[0]; // First matching user

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordCorrect) {
      throw new Error("Password is incorrect");
    }

    // Delete user
    const sentence2 = "DELETE FROM users WHERE email = ? AND username = ?";
    const [result] = await db.query(sentence2, [user.email, user.username]);

    if (result.affectedRows === 0) {
      throw new Error("Failed to delete user");
    }

    return { success: true, message: "User deleted successfully" }
  } catch (error) {
    console.log(error.message);

    const expectedErrors = [
      "Email or username is incorrect",
      "Password is incorrect",
      "Failed to delete user",
    ];

    if (!expectedErrors.includes(error.message)) {
      throw new Error("Unexpected error while deleting");
    }

    throw error; // Re-throw expected errors
  }
};

