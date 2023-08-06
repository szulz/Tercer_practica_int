const express = require('express');
const Auth = require('../middlewares/auth.js');
const auth = new Auth;
const authRouter = express.Router();
const passport = require('passport');
const AuthController = require('../controllers/auth.controller.js');
const CartsController = require('../controllers/carts.controller.js');
const cartsController = new CartsController
const authController = new AuthController


authRouter.get('/logOut', cartsController.clearCart , authController.logOut)

authRouter.get('/login', auth.currentSession, authController.logInGet)

authRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/fail' }), authController.login)

authRouter.get('/register', auth.currentSession, authController.registerGet)

authRouter.post('/register', passport.authenticate('register', { failureRedirect: '/auth/fail' }), authController.register)

authRouter.get('/fail', authController.failure)

module.exports = authRouter;