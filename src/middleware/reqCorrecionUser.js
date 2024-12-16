import { body, validationResult } from "express-validator";

export const reqCreateControl = [
  // Validation for the email field
  body("email")
    .isEmail()
    .withMessage("The email must have a valid format")
    .notEmpty()
    .withMessage("Email is required"),

  // Validation for the username field
  body("username")
    .matches(/^@[a-zA-Z0-9_-]+$/)
    .withMessage(
      "The username must start with '@' and contain only alphanumeric characters, hyphens, or underscores"
    )
    .notEmpty()
    .withMessage("Username is required"),

  // Validation for the password field
  body("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("The password must be between 8 and 20 characters")
    .notEmpty()
    .withMessage("Password is required"),

  // Validation for the full name field
  body("full_name")
    .isLength({ max: 100 })
    .withMessage("The full name must not exceed 100 characters")
    .notEmpty()
    .withMessage("Full name is required"),

  // Middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const reqLoginControl = [
  // Validation for the email field
  body("email")
    .isEmail()
    .withMessage("The email must have a valid format")
    .notEmpty()
    .withMessage("Email is required"),

  // Validation for the password field
  body("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("The password must be between 8 and 20 characters")
    .notEmpty()
    .withMessage("Password is required"),


  // Middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];


/*
export const reqControlUpdateRango = [
  // Validación del campo email
  check("email")
    .isEmail()
    .withMessage("El email debe tener un formato válido")
    .notEmpty()
    .withMessage("El email es obligatorio"),

  // Validación del campo password
  check("rango")
    .isIn(["cliente", "empleado", "administrador"])
    .withMessage("El rango debe ser 'cliente', 'empleado' o 'administrador'")
    .notEmpty()
    .withMessage("El rango es obligatorio"),

  // Middleware para manejar los errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
*/