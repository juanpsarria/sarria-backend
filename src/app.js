import express from 'express'
import { apiProducts } from '../router/products.js'
import { apiCarts } from '../router/carts.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(apiProducts)
app.use(apiCarts)

app.use((error, req, res, next) => {
    switch (error.message) {
        case 'id no encontrado':
            res.status(404)
            break
        case 'falta un argumento':
            res.status(400)
            break
        default:
            res.status(500)
    }
    res.json({ message: error.message })
})

const server = app.listen(8080)