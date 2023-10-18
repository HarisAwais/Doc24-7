const { body } = require("express-validator");
const { systemRoles } = require("../schemas/user.schema");

const signupUserValidation = [
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("First name must be string")
    .toUpperCase(),
  body("lastName")
    .notEmpty()
    .isString()
    .withMessage("Last name must be string")
    .toUpperCase(),
  body("age")
    .notEmpty()
    .withMessage("Age is required")
    .isNumeric()
    .withMessage("Age must be number"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid"),
  body("password").notEmpty().withMessage("Password is required"),
  // .isStrongPassword()
  // .withMessage("Password must be strong"),
  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .isString()
    .withMessage("Phone number must be string"),
  body("address")
    .optional()
    .isString()
    .withMessage("Phone number must be string"),
  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .toUpperCase()
    .isIn(["MALE", "FEMALE"])
    .withMessage(`Gender must be one from these: "MALE", "FEMALE"`),
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .toUpperCase()
    .isIn(["ACTIVE", "INACTIVE"]),
  body("systemRoles")
    .isArray()
    .withMessage("System roles must be an array")
    .custom((array) => {
      if (array.length) {
        return true;
      }
      throw new Error("System roles must be a non-empty array.");
    }),
  body("systemRoles.*.role")
    .notEmpty()
    .withMessage("Role is required")
    .toUpperCase()
    .isIn(systemRoles.role)
    .withMessage(`Role must be one from these: ${systemRoles.role.join(", ")}`),
  body("systemRoles.*.shift")
    .notEmpty()
    .withMessage("Shift is required")
    .toUpperCase()
    .isIn(systemRoles.shift)
    .withMessage(
      `Shift must be one from these: ${systemRoles.shift.join(", ")}`
    ),
  body("systemRoles.*.department")
    .notEmpty()
    .withMessage("Department is required")
    .toUpperCase()
    .isIn(systemRoles.department)
    .withMessage(
      `Department must be one from these: ${systemRoles.department.join(", ")}`
    ),
];

const signinUserValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid"),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = { signupUserValidation, systemRoles };
