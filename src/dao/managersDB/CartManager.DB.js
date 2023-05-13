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

    async getProductsInCart(id){
        const cart = await this.#cartsDB.findById(id).lean()
        if(!cart){
            throw new Error('Cart ID does not exist.')
        }
        return cart.products
    }

    async addToCart(cartId, productId){
        const cart = await this.getCartById(cartId)
        const product = await productsManager.getProductById(productId)
        const pid = product._id

        const i = cart.products.findIndex(p => p.product._id.toString() === pid.toString())
        if( i === -1){
            cart.products.push({product: pid, quantity: 1})
        }else {
            cart.products[i].quantity++
        }
        await this.#cartsDB.updateOne({_id: cart._id}, cart)
        return cart
    }

    async deleteFromCart(cartId, productId){
        const cart = await this.getCartById(cartId)
        const product = await productsManager.getProductById(productId)
        const pid = product._id

        const i = cart.products.findIndex(p => p.product._id.toString() === pid.toString())
        cart.products.splice(i, 1)

        await this.#cartsDB.updateOne({_id: cart._id}, cart)
        return cart
    }

    async deleteAllProducts(cartId){
        const cart = await this.getCartById(cartId)
        cart.products = []
        await this.#cartsDB.updateOne({_id: cart._id}, cart)
        return cart
    }

    async updateCart(cartId, body){
        const cart = await this.#cartsDB.findOne({_id: cartId})
        if(cart){
            cart.products = body.products
            await cart.save()
        }
        return cart
    }

    async updateQuantity(cartId, productId, body){
        const cart = await this.getCartById(cartId)
        const product = await productsManager.getProductById(productId)
        const pid = product._id

        const i = cart.products.findIndex(p => p.product._id.toString() === pid.toString())
        if( i === -1){
            throw new Error('Product ID does not exist in cart')
        }else {
            cart.products[i].quantity = body.quantity
        }
        await this.#cartsDB.updateOne({_id: cart._id}, cart)
        return cart
    }
}

export const cartsManager = new CartManager()

/* const asd = await cartsManager.getProductsInCart("643984a286a54da4970ac05d")

console.log(asd) */