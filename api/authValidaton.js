const {check} = require("express-validator");

const registrationValidation = [
    check("email", 'please provide valid email address').isEmail().withMessage("invalid email address"),
    check("username").isLength({min: 3}).withMessage("Username should have minimum three character"),
    check("password").isLength({min:6}).withMessage("Password should have mimimum  6 digits"),

]
const loginValidation = [
    check("email").isEmail().withMessage("please provide valid email address"),
    check("password").isLength({min:6}).withMessage("Password should have mimimum  6 digits"),
]

module.exports = [registrationValidation, loginValidation]