const {check, validationResult} = require('express-validator');

const rules = [
    check('full_name', "harus string") 
            .notEmpty()
            .isString()
            .trim()
            .escape(),

    check('email')
            .notEmpty()
            .isEmail()
            .trim()
            .escape(),

    check('username')
            .notEmpty()
            .trim()
            .escape(),

    check('profil_image_url')
            .notEmpty()
            .isURL()
            .trim()
            .escape(),

    check('age')
            .notEmpty()
            .isInt()
            .trim()
            .escape(),

    check('phone_number')
            .notEmpty()
            .isInt()
            .trim()
            .escape(),
];

module.exports = {rules}