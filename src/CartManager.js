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
}

