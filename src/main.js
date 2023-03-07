import { ProductManager } from "./ProductManager.js"
import { Product } from "./Product.js"
import colors from 'colors'

const manager = new ProductManager('../desafio-backend-sarria/database/products.json')


//se crean objetos
const product1 = new Product({title: 'producto prueba 1', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc123', stock: 25})

const product2 = new Product({title: 'producto prueba 2', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc456', stock: 25})

const product3 = new Product({title: 'producto prueba 3', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc789', stock: 25})

const product4 = new Product({title: 'producto prueba 4', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'asd123', stock: 25})

const product5 = new Product({title: 'producto prueba 5', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'asd456', stock: 25})

const product6 = new Product({title: 'producto prueba 6', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'asd789', stock: 25})

const product7 = new Product({title: 'producto prueba 7', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'asd111', stock: 25})

const product8 = new Product({title: 'producto prueba 8', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'asd222', stock: 25})

const product9 = new Product({title: 'producto prueba 9', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'asd333', stock: 25})

const product10 = new Product({title: 'producto prueba 10', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'asd444', stock: 25})


//se agregan objetos al array
await manager.addProduct(product1)
await manager.addProduct(product2)
await manager.addProduct(product3)
await manager.addProduct(product4)
await manager.addProduct(product5)
await manager.addProduct(product6)
await manager.addProduct(product7)
await manager.addProduct(product8)
await manager.addProduct(product9)
await manager.addProduct(product10)

console.log(await manager.getProducts())

console.log(colors.yellow.underline('fin'))