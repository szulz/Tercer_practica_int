const express = require('express');
const { PORT } = require('../config/env.config');
const profileRouter = express.Router()

profileRouter.get('/', async (req, res) => {
    let user = req.session.user
    return res.render('profile', { user, PORT })
})

module.exports = profileRouter