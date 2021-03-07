const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const {
  createUserSchema,
  loginUserSchema,
} = require('../middleware/validators/userValidator.middlerware')
const awaitHandlerFactory = require('../middleware/awaitHandleFactory.moddleware')
const auth = require('../middleware/auth.middleware')

router.post(
  '/login',
  loginUserSchema,
  awaitHandlerFactory(userController.login)
)
router.post(
  '/register',
  createUserSchema,
  awaitHandlerFactory(userController.createUser)
)
router.get('/testToken', auth(), awaitHandlerFactory(userController.testToken))

module.exports = router
