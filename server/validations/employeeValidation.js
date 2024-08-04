const { check } = require('express-validator');

const validateEmployee = [
    check('name')
        .trim()
        .notEmpty().withMessage('Name cannot be empty')
        .escape(),
    check('salary')
        .notEmpty().withMessage('Salary cannot be empty')
        .isNumeric().withMessage('Salary must be a number')
        .escape(),
    check('role')
        .notEmpty().withMessage('role cannot be empty')
        .escape(),
    check('username')
        .notEmpty().withMessage('password cannot be empty')
        .escape(),
    check('password')
        .notEmpty().withMessage('password cannot be empty')
        .escape()
];

const validateEmployeeLogin = [
    check('username')
        .notEmpty().withMessage('password cannot be empty')
        .escape(),
    check('password')
        .notEmpty().withMessage('password cannot be empty')
        .escape()
];

const validateEmployeeSearch = [
    check('parameter')
        .trim()
        .notEmpty().withMessage('Code cannot be empty')
        .escape(),
];

module.exports = { validateEmployee, validateEmployeeLogin, validateEmployeeSearch };