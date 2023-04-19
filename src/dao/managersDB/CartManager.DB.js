import mongoose from 'mongoose'
import { cartModel } from '../models/cart.model.js'
import { productModel } from "../models/product.model.js"
import { productsManager } from './ProductManager.DB.js'

class CartManager{
    #cartsDB
    #productsDB

    constructor() {
        this.#cartsDB = cartModel
        this.#productsDB = productModel
    }

    async createCart(data){
        let cart = await this.#cartsDB.create(data)
        cart = JSON.parse(JSON.stringify(cart))
        return cart
    }

    async getCartById(id){
        const cart = await this.#cartsDB.findById(id).lean()
        if(!cart){
            throw new Error('Cart ID does not exist.')
        }
        return cart
    }

    async AddToCart(cartId, productId){
        const cid = await this.getCartById(cartId)
        const product = await productsManager.getProductById(productId)
        const pid = product._id.toString()

        const i = cid.products.findIndex(p => p.product === pid)
        if(i === -1){
            cid.products.push({product: pid, quantity: 1})
        } else {
            cid.products[i].quantity++
        }
        await this.#cartsDB.updateOne({_id: cid._id}, cid)
        return cid
    }
}

export const cartsManager = new CartManager()