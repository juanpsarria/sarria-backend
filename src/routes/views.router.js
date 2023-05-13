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

viewsRouter.get('/products', async (req, res, next) => {
    try {
        const product = await productsManager.getProductsWithPagination(req.query.limit,req.query.page,req.query.query, req.query.sort)
        res.render('products', {
            title: 'Productos',
            productsList: product.payload.length > 0,
            products: product.payload,
            page: product.page,
            totalPages: product.totalPages,
            hasNextPage: product.hasNextPage,
            nextPage: product.nextPage,
            hasPrevPage: product.hasPrevPage,
            prevPage: product.prevPage,
            pagingCounter: product.pagingCounter
        })
    } catch (error){
        next (error)
    }
})

viewsRouter.get('/carts/:cid', async (req, res, next) => {
    try {
        const cart = await cartsManager.getCartById(req.params.cid)
        const products = cart.products
        //const productList = products.length > 0
        res.render('carts', {
            title: 'Carrito de compras',
            productList: cart.products.length > 0,
            products: cart.products
        })
    } catch (error){
        next (error)
    }
})