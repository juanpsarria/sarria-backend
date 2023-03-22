import { productsManager } from "../managers/ProductManager.js"

export function configureProductsSocket(io, socket) {
    socket.on('nuevoProducto', prod => {
        productsManager.addProduct(prod)
        io.sockets.emit('productos', productsManager.getProducts)
    })

    socket.on('refrescarProductos', () => {
        io.sockets.emit('productos', productsManager.getProducts())
    })
}