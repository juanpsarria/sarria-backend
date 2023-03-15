import { ProductManager } from "./ProductManager.js"
import { Product } from "./Product.js"
import colors from 'colors'

const manager = new ProductManager('../desafio-backend-sarria/database/products.json')


//se crean objetos

//se agregan objetos al array


console.log(await manager.getProducts())

console.log(colors.yellow.underline('fin'))


/* async addToCart(cid, pid){
    await this.#readCartsFile()
    await this.#readProductsFile()

    const product = this.#products.find(p => p.id === pid)
    if(!product){
        throw new Error('Product ID does not exist.')
    }
    const cart = this.#carts.findIndex(c => c.id === cid)
    if(!cart){
        throw new Error('Cart ID does not exist.')
    }

    const prodInCart = this.#carts[cart].products.findIndex(e => e.id === pid)
    if(prodInCart === -1){
        this.#carts[cart].products.push({product: pid, quantity: 1})
        await this.#writeCartsFile
        return this.#carts[cart].products
    } else {
        this.#carts[cart].products.splice(prodInCart, 1, {
            ...prodInCart, quantity: this.#carts[cart].products[prodInCart].quantity ++
        })
        await this.#writeCartsFile
        return this.#carts[cart].products
    }
}
} */