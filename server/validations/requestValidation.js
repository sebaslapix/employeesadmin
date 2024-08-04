const { check } = require('express-validator');

const validateRequest = [
    check('code')
        .trim()
        .notEmpty().withMessage('Code cannot be empty')
        .escape(),
    check('description')
        .trim()
        .notEmpty().withMessage('Code cannot be empty')
        .escape(),
    check('summary')
        .trim()
        .notEmpty().withMessage('Code cannot be empty')
        .escape()
];

const validateRequestSearch = [
    check('parameter')
        .trim()
        .notEmpty().withMessage('Code cannot be empty')
        .escape(),
];

module.exports = { validateRequest, validateRequestSearch };