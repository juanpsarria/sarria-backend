import express, { Router } from "express";
import { productModel } from "../dao/models/product.model.js";
import { productsManager } from "../dao/managersDB/ProductManager.DB.js";

export const productsRouter = Router()

productsRouter.use(express.json())

productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await productsManager.getProductsWithPagination(req.query.limit,req.query.page,req.query.query, req.query.sort)
        res.json({ result: 'success', payload: products})
    } catch (error){
        next(error)
    }
})

productsRouter.get('/:pid', async (req, res, next) => {
    try {
        const product = await productsManager.getProductById(req.params.pid)
        res.json({ result: 'success', payload: product})
    } catch (error) {
        next (error)
    }
})

productsRouter.post('/', async (req, res, next) => {
    try {
        const { 
            title, 
            description, 
            code, 
            price, 
            status, 
            stock, 
            category, 
            thumbnail} = req.body
        if(!title || !description || !code || !price || !status || !stock || !category || !thumbnail){
            return res.send({ status: 'error', error: 'Incomplete values.'})
        }
        const result = await productsManager.addProduct(req.body)
        res.json({ result: 'success', payload: result})
    } catch (error) {
        next (error)
    }

    const products = await productsManager.getProducts()
    req['io'].sockets.emit('refreshProducts', products)
})

productsRouter.put('/:uid', async (req, res, next) => {
    try {
        const result = await productsManager.updateProduct(req.params.uid, req.body)
        res.send({ status: 'success', payload: result })
    } catch (error) {
        next (error)
    }

    const products = await productsManager.getProducts()
    req['io'].sockets.emit('refreshProducts', products)
})

productsRouter.delete('/:uid', async (req, res, next) => {
    try {
        const {uid} = req.params
        const result = await productsManager.deleteProduct({_id: uid})
        res.json({status: 'success', payload: result})
    } catch (error){
        next (error)
    }

    const products = await productsManager.getProducts()
    req['io'].sockets.emit('refreshProducts', products)
})