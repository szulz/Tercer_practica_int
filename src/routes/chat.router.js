const express = require('express')
const socketServer = require('../app')
const chatRouter = express.Router()
const Auth = require('../middlewares/auth')
const auth = new Auth


chatRouter.get('/', /*auth.allowUsersInSession,*/async (req, res) => {
    return res.render('chat', {})
})

const { Server } = require('socket.io');

async function connectSocket(httpServer) {
    const socketServer = new Server(httpServer)

    socketServer.on('connection', async (socket) => {
        console.log('se abrio un socket en ' + socket.id);

        socket.on('msgFront', async (message) => {
            console.log(message.msg);
            
        });


    });
}

module.exports = {
    chatRouter: chatRouter,
    connectSocket: connectSocket
}