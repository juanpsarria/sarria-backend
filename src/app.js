import express from 'express'
import { engine } from 'express-handlebars'
import { Server as SocketIOServer } from 'socket.io'
import { productsRouter } from './routes/products.js'
import { cartsRouter } from './routes/carts.js'
import { viewsRouter } from './routes/views.js'
import { PORT } from './config.js'
import { configureProductsSocket } from './sockets/products.sockets.js'

const app = express()

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewsRouter)

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

//port
const httpServer = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})

const io = new SocketIOServer(httpServer)

io.on('connection', async clientSocket => {
    console.log(`New client online. Socket ID: ${clientSocket}`)
    configureProductsSocket(io, clientSocket)
})