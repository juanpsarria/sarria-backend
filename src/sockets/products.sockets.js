import { productsManager } from "../dao/managersDB/ProductManager.DB.js"

export async function configureProductsSocket(io, socket) {
    socket.on('refreshProducts', async prod => {
        await productsManager.getProducts()
    })
    io.sockets.emit('refreshProducts', await productsManager.getProducts())
}