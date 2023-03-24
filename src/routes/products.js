import express, { Router } from 'express'
import { Product } from '../managers/Product.js'
import { productsManager } from '../managers/ProductManager.js'

export const productsRouter = Router()

productsRouter.use(express.json())
productsRouter.use(express.urlencoded({ extended: true }))


productsRouter.get('/api/products', async (req, res, next) => {
    try {
        const products = await productsManager.getProducts()
        const limit = req.query.limit

        if(!limit){
            return res.json({products})
        }

        const selectedLimit = products.slice(0, limit)
        res.json({products: selectedLimit})
    } catch (error) {
        next(error)
    }
})

productsRouter.get('/api/products/:pid', async (req, res, next) => {
    try {
        const product = await productsManager.getProductById(parseInt(req.params.pid))
        res.json({product})
    } catch (error) {
        next(error)
    }
})

productsRouter.post('/api/products', async (req, res, next) => {
    try {
        const newProduct = new Product({ ...req.body, "status": true })
        const addNewProduct = await productsManager.addProduct(newProduct)
        res.json(addNewProduct)

        const products = await productsManager.getProducts()
        req['io'].sockets.emit('refreshProducts', products)
    } catch (error) {
        next(error)
    }
})

productsRouter.put('/api/products/:pid', async (req, res, next) => {
    try {
        const updateProduct = await productsManager.updateProduct(parseInt(req.params.pid), req.body)
        res.json({updateProduct})

        const products = await productsManager.getProducts()
        req['io'].sockets.emit('refreshProducts', products)
    } catch (error) {
        next(error)
    }
})

productsRouter.delete('/api/products/:pid', async (req, res, next) => {
    try {
        const deleteProduct = await productsManager.deleteProduct(parseInt(req.params.pid))
        res.json(deleteProduct)

        const products = await productsManager.getProducts()
        req['io'].sockets.emit('refreshProducts', products)
    } catch (error) {
        next(error)
    }
})