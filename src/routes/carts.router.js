import express, { Router } from "express"
import { cartsManager } from "../dao/managersDB/CartManager.DB.js"

export const cartsRouter = Router()

cartsRouter.use(express.json())

cartsRouter.post('/', async (req, res, next) => {
    try {
        const cart = await cartsManager.createCart()
        res.json({ result: 'success', payload: cart})
    } catch(error) {
        next(error)
    }
})

cartsRouter.get('/:cid', async (req, res, next) => {
    try {
        const cart = await cartsManager.getCartById(req.params.cid)
        res.json({ result: 'success', payload: cart })
    } catch(error) {
        next(error)
    }

    const cart = await cartsManager.getCartById(req.params.cid)
    const products = cart.products
    req['io'].sockets.emit('refreshCart', products)
})

cartsRouter.post('/:cid/products/:pid', async (req, res, next) => {
    try {
        const addProduct = await cartsManager.addToCart(req.params.cid, req.params.pid)
        res.json({ result: 'success', payload: addProduct })
    } catch(error){
        next(error)
    }
})

cartsRouter.delete('/:cid/products/:pid', async (req, res, next) => {
    try {
        const deleteProduct = await cartsManager.deleteFromCart(req.params.cid, req.params.pid)
        res.json({ result: 'success', payload: deleteProduct })
    } catch (error) {
        next (error)
    }
})

cartsRouter.delete('/:cid', async (req, res, next) => {
    try {
        const deleteAll = await cartsManager.deleteAllProducts(req.params.cid)
        res.json({ result: 'success', payload: deleteAll })
    } catch (error) {
        next (error)
    }
})

cartsRouter.put('/:cid', async (req, res, next) => {
    try {
        const update = await cartsManager.updateCart(req.params.cid, req.body)
        res.json({ result: 'success', payload: update })
    } catch (error) {
        next (error)
    }
})

cartsRouter.put('/:cid/products/:pid', async (req, res, next) => {
    try {
        const quantity = await cartsManager.updateQuantity(req.params.cid, req.params.pid, req.body)
        res.json({ result: 'success', payload: quantity })
    } catch (error) {
        next (error)
    }
})