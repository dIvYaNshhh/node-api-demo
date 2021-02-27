const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { createUserSchema, loginUserSchema } = require('../middleware/validators/userValidator.middlerware');
const awaitHandlerFactory  = require('../middleware/awaitHandleFactory.moddleware');

router.post('/login', loginUserSchema, awaitHandlerFactory(userController.login));
router.post('/register',createUserSchema,  awaitHandlerFactory(userController.createUser));

module.exports = router;