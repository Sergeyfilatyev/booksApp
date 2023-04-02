const express = require('express');
const auth = require('../middlewares/auth');
const authController = require('../controllers/AuthController');

const authRouter =express.Router();

authRouter.post( "/register", authController.registerNewUser);

authRouter.post("/login", authController.loginUser);

authRouter.get("/logout", auth, authController.logoutUser);

module.exports = authRouter;