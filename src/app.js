import express from 'express'
import { engine } from 'express-handlebars'
import { Server as SocketIOServer } from 'socket.io'
//import { productsRouter } from './routes/products.js'
//import { cartsRouter } from './routes/carts.js'
import { viewsRouter } from './routes/views.router.js'
import { PORT } from './config.js'
import mongoose from 'mongoose'
import { productsRouter } from './routes/products.router.js'
import { cartsRouter } from './routes/carts.router.js'
import { configureProductsSocket } from './sockets/products.sockets.js'
import { configureMessagesSocket } from './sockets/messages.sockets.js'


const app = express()
app.use(express.json())

//port
const httpServer = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})

const io = new SocketIOServer(httpServer)

//mongoose
mongoose.connect('mongodb+srv://coderprueba1:coderprueba1@backend-ecommerce.ajja6ie.mongodb.net/ecommerce'), (error) =>{
    if(error){
        console.log('Cannot connect to database: ' + error)
        process.exit()
    }
}

app.use((req, res, next) => {
    req['io'] = io
    next()
})

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


io.on('connection', async socket => {
    console.log(`New client online. Socket ID: ${socket.id}`)
    configureProductsSocket(io, socket)
    configureMessagesSocket(io, socket)
})



