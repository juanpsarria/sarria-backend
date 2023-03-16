import fs from 'fs/promises'
import { randomUUID } from 'crypto'
import { Cart } from './Cart.js'

export class CartManager {
    #cartPath
    #productPath
    #carts
    #products

    constructor (cartPath, productPath) {
        this.#cartPath = cartPath
        this.#productPath = productPath
    }

    async #readCartsFile(){
        const json = await fs.readFile(this.#cartPath, 'utf-8')
        this.#carts = JSON.parse(json)
    }

    async #writeCartsFile(){
        const json = JSON.stringify(this.#carts, null, 2)
        await fs.writeFile(this.#cartPath, json)
    }

    async #readProductsFile(){
        const json = await fs.readFile(this.#productPath, 'utf-8')
        this.#products = JSON.parse(json)
    }

    async createCart(){
        await this.#readCartsFile()
        const newCart = new Cart({
            id: randomUUID(),
            products: []
        })
        this.#carts.push(newCart)
        await this.#writeCartsFile()
        return newCart
    }

    async getCartById(cid){
        await this.#readCartsFile()

        const cart = this.#carts.find(e => e.id === cid)
        if(!cart){
            throw new Error('Cart ID does not exist.')
        }

        return cart
    }
    
    async addToCart(cid, pid){
        await this.#readCartsFile()
        await this.#readProductsFile()

        const cart = this.#carts.findIndex(c => c.id === cid)
        if(cart === -1){
            throw new Error('Cart ID does not exist.')
        }

        const product = this.#products.find(p => p.id === pid)
        if(!product){
            throw new Error('Product ID does not exist.')
        }

        //suma un producto nuevo con cantidad 1
        const index = this.#carts[cart].products.findIndex(e => e.id === pid)

        //suma cantidad+1 al 1er elemento del array
        //const index = this.#carts[cart].products.findIndex(e => e.id === this.#carts[cart].products.product)

        if(index === -1){
            this.#carts[cart].products.push({product: pid, quantity: 1})
        } else {
            this.#carts[cart].products[index].quantity++
        }
        await this.#writeCartsFile()
        return this.#carts[cart].products
    }
}

