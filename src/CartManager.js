import fs from 'fs/promises'

export class CartManager {
    #path
    #carts

    constructor (path) {
        this.#path = path
        this.#carts
    }

    async #readCartsFile(){
        const json = await fs.readFile(this.#path, 'utf-8')
        this.#carts = JSON.parse(json)
    }

    async writeCartsFile(){
        const json = JSON.stringify(this.#carts, null, 2)
        await fs.writeFile(this.#path, json)
    }

    async createCart(cart){
        await this.#readCartsFile()
        this.#carts.length === 0 ? cart.id = 1 : cart.id = this.#carts[this.#carts.length - 1].id + 1;
        this.#carts.push({id: cart, products: []})
        await this.writeCartsFile()
        return cart
    }

    async getCartById(cid){
        await this.#readCartsFile()

        const cart = this.#carts.find(e => e.id === cid)
        if(!cart){
            throw new Error('Cart ID does not exist.')
        }

        return cart
    }
    
}