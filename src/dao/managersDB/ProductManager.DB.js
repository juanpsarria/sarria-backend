import mongoose from "mongoose";
import { productModel } from "../models/product.model.js"

class ProductManager{
    #productsDb

    constructor(){
        this.#productsDb = productModel
    }

    async addProduct(data){
        let product = await this.#productsDb.create(data)
        product = JSON.parse(JSON.stringify(product))
        return product
    }

    async getProducts(){
        const product = await this.#productsDb.find().lean()
        return product
    }

    async getProductById(id){
        const product = await this.#productsDb.findById(id).lean()
        if(!product){
            throw new Error('Product ID not found.')
        }
        return product
    }

    //ver
    async updateProduct(id, body){
        const filter = id
        if(!id){
            throw new Error('Product ID not found.')
        }

        const update = body

        let result = await this.#productsDb.findOneAndUpdate(filter, update, {
            new: true
        })

        return result
    }

    async deleteProduct(id){
        const product = await this.#productsDb.deleteOne(id)
        if(!product){
            throw new Error('Product ID not found.')
        }
        return product
    }
}

export const productsManager = new ProductManager()