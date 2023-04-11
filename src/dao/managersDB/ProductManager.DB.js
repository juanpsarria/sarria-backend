// @ts-ignore
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
        return product
    }

    async updateProduct(id, data){
        let product = await this.getProductById(id)
        const newData = data

        // @ts-ignore
        product.description = newData.description ?? product.description
        // @ts-ignore
        product.thumbnail = newData.thumbnail ?? product.thumbnail
        // @ts-ignore
        product.title = newData.title ?? product.title
        // @ts-ignore
        product.price = newData.price ?? product.price
        // @ts-ignore
        product.stock = newData.stock ?? product.stock

        // @ts-ignore
        product = await this.#productsDb.updateOne(id, product)
        return product
    }

    async deleteProduct(id){
        const product = await this.#productsDb.deleteOne(id)
        return product
    }
}

export const productsManager = new ProductManager()