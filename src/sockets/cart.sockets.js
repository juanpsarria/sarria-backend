/* import { cartsManager } from "../dao/managersDB/CartManager.DB.js"

export async function configureCartSocket(io, socket){
    socket.on('refreshCart', async cart => {
        await cartsManager.getCartById()
    })
    io.sockets.emit('refreshCart', await cartsManager.getCartById())
} */