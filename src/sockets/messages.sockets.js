import { messagesManager } from "../dao/managersDB/MessageManager.DB.js"

export function configureMessagesSocket(io, socket) {

    socket.on('newMessage', msg => {
        messagesManager.sendMessage(msg)
        io.sockets.emit('mensajes', messagesManager.getMessages())
    })

    socket.on('refrescarMensajes', () => {
        io.sockets.emit('newMessage', messagesManager.getMessages())
    })
}