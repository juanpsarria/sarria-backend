import express, { Router } from 'express'
import { ProductManager } from '../src/ProductManager.js'
import { Cart } from '../src/Cart.js'
import { CartManager } from '../src/CartManager.js'

export const apiCarts = Router()

apiCarts.use(express.json())
apiCarts.use(express.urlencoded({ extended: true }))

const cartsManager = new CartManager('./database/carts.json')
const productManager = new ProductManager('./database/products.json')

apiCarts.post('/api/carts', async (req, res, next)=> {
    try {
        const newCart = new Cart({...req.body})
        const addNewCart = await cartsManager.createCart(newCart)
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
        //busco id del carrito
        const cart = await cartsManager.getCartById(parseInt(req.params.cid))

        //busco id del producto
        const product = await productManager.getProductById(parseInt(req.params.pid))

        //busco si el producto existe en el carrito
        
        res.json({cart})
    } catch (error){
        next (error)
    }
})