import express, { Router } from 'express'
import { CartManager } from '../src/CartManager.js'

export const apiCarts = Router()

apiCarts.use(express.json())
apiCarts.use(express.urlencoded({ extended: true }))

const cartsManager = new CartManager('./database/carts.json', './database/products.json')

apiCarts.post('/api/carts', async (req, res, next)=> {
    try {
        const addNewCart = await cartsManager.createCart()
        res.json({addNewCart})
    } catch (error) {
        next (error)
    }
})

apiCarts.get('/api/carts/:cid', async (req, res, next) => {
    try {
        const cart = await cartsManager.getCartById(parseInt(req.params.cid))
        res.json({cart})
    } catch (error) {
        next (error)
    }
})

apiCarts.post('/api/carts/:cid/product/:pid', async (req, res, next) => {
    try {
        const addProduct = await cartsManager.addToCart(req.params.cid, parseInt(req.params.pid))
        res.json({addProduct})
    } catch (error){
        next (error)
    }
})