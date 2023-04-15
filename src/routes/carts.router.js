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
})

cartsRouter.post('/:cid/product/:pid', async (req, res, next) => {
    try {
        const addProduct = await cartsManager.AddToCart(req.params.cid, req.params.pid)
        res.json({ result: 'success', payload: addProduct })
    } catch(error){
        next(error)
    }
})