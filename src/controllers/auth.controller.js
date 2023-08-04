const SessionDTO = require("../model/DTO/session.dto.js")
const AuthService = require("../services/auth.service.js")
const authService = new AuthService

class AuthController {
    async logOut(req, res) {
        authService.logOut(req.session)
        return res.redirect('/auth/login')
    }

    async logInGet(req, res) {
        return res.render('login', {})
    }

    async login(req, res) {
        let clearUser = new SessionDTO(await req.user)
        req.session.user = clearUser
        return res.redirect('/products')
    }

    async registerGet(req, res) {
        return res.render('register', {})
    }

    async register(req, res) {
        return res.status(200).send({ status: "success", message: 'user created', payload: req.user })
        //podria agregar una vista de registrado successfull
    }
    async failure(req, res) {
        return res.status(400).send({
            status: 'Something went wrong!',
            msg: `Something went wrong! Try again later`,
        });
    }

}


module.exports = AuthController