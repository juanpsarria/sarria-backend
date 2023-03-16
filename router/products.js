import express, { Router } from 'express'
import { Product } from '../src/Product.js'
import { ProductManager } from '../src/ProductManager.js'

export const apiProducts = Router()

apiProducts.use(express.json())
apiProducts.use(express.urlencoded({ extended: true }))

const productsManager = new ProductManager('./database/products.json')

apiProducts.get('/api/products', async (req, res, next) => {
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

apiProducts.get('/api/products/:pid', async (req, res, next) => {
    try {
        const product = await productsManager.getProductById(parseInt(req.params.pid))
        res.json({product})
    } catch (error) {
        next(error)
    }
})

apiProducts.post('/api/products', async (req, res, next) => {
    try {
        const newProduct = new Product({ ...req.body, "status": true })
        const addNewProduct = await productsManager.addProduct(newProduct)
        res.json(addNewProduct)
    } catch (error) {
        next(error)
    }
})

apiProducts.put('/api/products/:pid', async (req, res, next) => {
    try {
        const updateProduct = await productsManager.updateProduct(parseInt(req.params.pid))
        res.json({updateProduct})
    } catch (error) {
        next(error)
    }
})

apiProducts.delete('/api/products/:pid', async (req, res, next) => {
    try {
        const deleteProduct = await productsManager.deleteProduct(parseInt(req.params.pid))
        res.json(deleteProduct)
    } catch (error) {
        next(error)
    }
})