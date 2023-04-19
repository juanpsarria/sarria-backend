import { messagesManager } from "../dao/managersDB/MessageManager.DB.js"

export async function configureMessagesSocket(io, socket) {

    socket.on('newMsg', async msg => {
        await messagesManager.sendMessage({
            date: new Date().toLocaleString(),
            ...msg
        })
        io.sockets.emit('refreshMsg', await messagesManager.getMessages())
    })

    io.sockets.emit('refreshMsg', await messagesManager.getMessages())
    
}