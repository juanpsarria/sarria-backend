import { ProductManager } from './ProductManager.js'
import express from 'express'

const app = express()

const manager = new ProductManager('../desafio-backend-sarria/database/products.json')

const products = await manager.getProducts()

//console.log(products)

//console.log(products.length)

app.get('/products', (req, res) => {
    let limit = req.query.limit

    if(!limit){
        return res.json({products})
    }

    if(limit > products.length){
        return res.send({error: 'El número ingresado supera la cantidad de productos en existencia.'})
    }
    
    let selectedLimit = products.slice(0, limit)
    res.json({products: selectedLimit})
})

app.get('/products/:pid', (req, res) =>{
    const pid = parseInt(req.params.pid)
    const product = products.find(e => e.id === pid)

    if(!product){
        return res.send({ error: 'El producto ingresado no existe.' })
    }

    res.json({product})
})

const server = app.listen(8080)