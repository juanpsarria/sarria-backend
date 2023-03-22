import { Router } from 'express'
import { Product } from '../managers/Product.js'
import { productsManager } from '../managers/ProductManager.js'

export const viewsRouter = Router()

viewsRouter.get('/', async (req, res, next) => {
    try {
        const products = await productsManager.getProducts()
        const productsList = products.length > 0
        res.render('/',{
            title: 'Home',
            productsList,
            products
        })
    } catch (error){
        next(error)
    }
})