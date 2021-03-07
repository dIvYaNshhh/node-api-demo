const { check } = require('express-validator')

exports.createUserSchema = [
  check('username').exists().withMessage('username is required'),

  check('email')
    .exists()
    .withMessage('email is required')
    .isEmail()
    .withMessage('Must be valid email'),
]

exports.loginUserSchema = [
  check('email')
    .exists()
    .withMessage('email is required')
    .isEmail()
    .withMessage('Must be valid email'),
  check('password').exists().withMessage('password is required'),
]
