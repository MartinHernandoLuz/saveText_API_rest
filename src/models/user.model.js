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
    if (error.message != "this email or username already in use") {
      error.message = "unexpected error to create user"
    }
    throw new Error(error.message)
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
    const isPasswordValid = bcrypt.compareSync(password, user.password_hash);
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
    if (error.message != "Email not found" && error.message != "Incorrect password") {
      error.message = "unexpected error to login"
    }
    throw new Error(error.message);
  }
};



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
      newRole: role
    };

  } catch (error) {
    console.log(error.message)
    if (error.message != "Email not found") {
      error.message = "unexpected error to update"
    }
    throw new Error(error.message);
  }
};
