import express, { Router } from 'express'
import { cartsManager } from '../dao/managers/CartManager.js'

export const cartsRouter = Router()

cartsRouter.use(express.json())
cartsRouter.use(express.urlencoded({ extended: true }))


cartsRouter.post('/api/carts', async (req, res, next)=> {
    try {
        const addNewCart = await cartsManager.createCart()
        res.json({addNewCart})
    } catch (error) {
        next (error)
    }
})

cartsRouter.get('/api/carts/:cid', async (req, res, next) => {
    try {
        const cart = await cartsManager.getCartById(parseInt(req.params.cid))
        res.json({cart})
    } catch (error) {
        next (error)
    }
})

cartsRouter.post('/api/carts/:cid/product/:pid', async (req, res, next) => {
    try {
        const addProduct = await cartsManager.addToCart(req.params.cid, parseInt(req.params.pid))
        res.json({addProduct})
    } catch (error){
        next (error)
    }
})