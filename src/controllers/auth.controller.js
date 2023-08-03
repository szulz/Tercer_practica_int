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

    async saveSession(req, res) {
        console.log(req.session);
        //tengo que pasarlo a el dto para que me reestructure el usuario para hacerlo mas legible
        //sacarle la basura y retornarlo
        await authService.saveSession(req.session, req.user)
        return res.redirect('/products')
    }

    async registerGet(req, res) {
        return res.render('register', {})
    }

    async failure(req, res) {
        return res.status(400).send({
            status: 'Something went wrong!',
            msg: `Something went wrong! Try again later`,
        });
    }

}


module.exports = AuthController