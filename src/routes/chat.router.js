const express = require('express')
const Auth = require('../middlewares/auth')
const auth = new Auth
const chatRouter = express.Router()


chatRouter.get('/', auth.allowUsersInSession, async (req, res) => {
    return res.render('chat', {})
})

module.exports = chatRouter