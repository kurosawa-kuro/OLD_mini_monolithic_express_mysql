const { check } = require('express-validator');

module.exports = [
    check('email').isEmail().withMessage('メールアドレスを入力して下さい'),
    check('password').isLength({ min: 5 }).withMessage('短すぎます'),
];