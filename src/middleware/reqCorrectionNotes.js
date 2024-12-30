import { body, validationResult } from "express-validator";

export const reqCreateNoteControl = [
    // Validation for the note_name field
    body("note_name")
        .isLength({ max: 100 })
        .withMessage("The note name must not exceed 100 characters")
        .notEmpty()
        .withMessage("Note name is required"),

    // Validation for the text field
    body("text")
        .isLength({ max: 1000000 })
        .withMessage("The text must not exceed 10,000,000 characters")
        .notEmpty()
        .withMessage("Text is required"),

    // Validation for the user_username field
    body("user_username")
        .isLength({ max: 50 })
        .withMessage("The username must not exceed 50 characters")
        .notEmpty()
        .withMessage("Username is required"),

    // Validation for the email field
    body("email")
        .isEmail()
        .withMessage("Invalid email format")
        .notEmpty()
        .withMessage("Email is required"),

    // Validation for the password field
    body("password")
        .isLength({ min: 8 })
        .withMessage("The password must be at least 8 characters long")
        .notEmpty()
        .withMessage("Password is required"),

    // Middleware to handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const reqGetNoteByNameControl = [
    // Validation for the note_name field
    body("note_name")
        .isLength({ max: 100 })
        .withMessage("The note name must not exceed 100 characters")
        .notEmpty()
        .withMessage("Note name is required"),

    // Validation for the user_username field
    body("user_username")
        .isLength({ max: 50 })
        .withMessage("The username must not exceed 50 characters")
        .notEmpty()
        .withMessage("Username is required"),

    // Validation for the email field
    body("email")
        .isEmail()
        .withMessage("Invalid email format")
        .notEmpty()
        .withMessage("Email is required"),

    // Validation for the password field
    body("password")
        .isLength({ min: 8 })
        .withMessage("The password must be at least 8 characters long")
        .notEmpty()
        .withMessage("Password is required"),

    // Middleware to handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const reqGetAllNotesByUserControl = [
    // Validation for the user_username field
    body("user_username")
        .isLength({ max: 50 })
        .withMessage("The username must not exceed 50 characters")
        .notEmpty()
        .withMessage("Username is required"),

    // Validation for the email field
    body("email")
        .isEmail()
        .withMessage("Invalid email format")
        .notEmpty()
        .withMessage("Email is required"),

    // Validation for the password field
    body("password")
        .isLength({ min: 8 })
        .withMessage("The password must be at least 8 characters long")
        .notEmpty()
        .withMessage("Password is required"),

    // Middleware to handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const reqUpdateNoteNameControl = [
    // Validation for the note_name field
    body("note_name")
        .isLength({ max: 100 })
        .withMessage("The note name must not exceed 100 characters")
        .notEmpty()
        .withMessage("Note name is required"),
    // Validation for the new_note_name field
    body("new_note_name")
        .isLength({ max: 100 })
        .withMessage("The note name must not exceed 100 characters")
        .notEmpty()
        .withMessage("Note name is required"),

    // Validation for the user_username field
    body("user_username")
        .isLength({ max: 50 })
        .withMessage("The username must not exceed 50 characters")
        .notEmpty()
        .withMessage("Username is required"),

    // Validation for the email field
    body("email")
        .isEmail()
        .withMessage("Invalid email format")
        .notEmpty()
        .withMessage("Email is required"),

    // Validation for the password field
    body("password")
        .isLength({ min: 8 })
        .withMessage("The password must be at least 8 characters long")
        .notEmpty()
        .withMessage("Password is required"),

    // Middleware to handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const reqUpdateTextControl = [
    // Validation for the note_name field
    body("note_name")
        .isLength({ max: 100 })
        .withMessage("The note name must not exceed 100 characters")
        .notEmpty()
        .withMessage("Note name is required"),

    // Validation for the text field
    body("new_text")
        .isLength({ max: 1000000 })
        .withMessage("The text must not exceed 10,000,000 characters")
        .notEmpty()
        .withMessage("Text is required"),

    // Validation for the user_username field
    body("user_username")
        .isLength({ max: 50 })
        .withMessage("The username must not exceed 50 characters")
        .notEmpty()
        .withMessage("Username is required"),

    // Validation for the email field
    body("email")
        .isEmail()
        .withMessage("Invalid email format")
        .notEmpty()
        .withMessage("Email is required"),

    // Validation for the password field
    body("password")
        .isLength({ min: 8 })
        .withMessage("The password must be at least 8 characters long")
        .notEmpty()
        .withMessage("Password is required"),

    // Middleware to handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const reqDeleteNoteControl = [
    // Validation for the note_name field
    body("note_name")
        .isLength({ max: 100 })
        .withMessage("The note name must not exceed 100 characters")
        .notEmpty()
        .withMessage("Note name is required"),

    // Validation for the user_username field
    body("user_username")
        .isLength({ max: 50 })
        .withMessage("The username must not exceed 50 characters")
        .notEmpty()
        .withMessage("Username is required"),

    // Validation for the email field
    body("email")
        .isEmail()
        .withMessage("Invalid email format")
        .notEmpty()
        .withMessage("Email is required"),

    // Validation for the password field
    body("password")
        .isLength({ min: 8 })
        .withMessage("The password must be at least 8 characters long")
        .notEmpty()
        .withMessage("Password is required"),

    // Middleware to handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];