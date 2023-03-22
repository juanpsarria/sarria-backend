import fs from 'fs/promises'
import { randomUUID } from 'crypto'
import { Cart } from './Cart.js'

class CartManager {
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

        const i = this.#carts.findIndex(c => c.id === cid)
        if(i === -1){
            throw new Error('Cart ID does not exist.')
        }

        const product = this.#products.find(p => p.id === pid)
        if(!product){
            throw new Error('Product ID does not exist.')
        }

        //suma un producto nuevo con cantidad 1
        const index = this.#carts[i].products.findIndex(e => e.product === pid)

        if(index === -1){
            this.#carts[i].products.push({product: pid, quantity: 1})
        } else {
            this.#carts[i].products[index].quantity++
        }
        await this.#writeCartsFile()
        return this.#carts[i].products
    }
}

export const cartsManager = new CartManager('./database/carts.json', './database/products.json')