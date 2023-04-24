import { Router } from 'express'
import { productsManager } from '../dao/managersDB/ProductManager.DB.js'
import { messagesManager } from '../dao/managersDB/MessageManager.DB.js'
import { cartsManager } from '../dao/managersDB/CartManager.DB.js'

export const viewsRouter = Router()

viewsRouter.get('/', async (req, res, next) => {
    try {
        const products = await productsManager.getProducts()
        const productsList = products.length > 0
        res.render('home',{
            title: 'Home',
            productsList,
            products
        })
    } catch (error){
        next(error)
    }
})

viewsRouter.get('/realtimeproducts', async (req, res, next) => {
    try {
        const products = await productsManager.getProducts()
        const productsList = products.length > 0
        res.render('realtimeproducts',{
            title: 'Productos en tiempo real',
            productsList,
            products
        })
    } catch (error){
        next(error)
    }
})

viewsRouter.get('/chat', async (req, res, next) => {
    try {
        const msg = await messagesManager.getMessages()
        const msgList = msg.length > 0
        res.render('chat', { 
            title: 'Chat',
            msgList,
            msg
        })
    } catch (error) {
        next(error)
    }
})

viewsRouter.get('carts/:cid', async (req, res, next) => {
    try {
        const cart = await cartsManager.getCartById(req.params.cid)
        const productList = cart.products.length > 0
        res.render('cart', {
            title: 'Carrito de compras',
            productList,
            cart
        })
    } catch (error){
        next (error)
    }
})