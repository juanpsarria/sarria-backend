import { productsManager } from "../managers/ProductManager.js"

export function configureProductsSocket(io, socket) {
    socket.on('newProduct', prod => {
        productsManager.addProduct(prod)
        io.sockets.emit('products', productsManager.getProducts)
    })

    socket.on('refreshProducts', () => {
        io.sockets.emit('products', productsManager.getProducts())
    })
}