import mongoose from "mongoose";
import { productModel } from "../models/product.model.js"

class ProductManager {
    #productsDb

    constructor() {
        this.#productsDb = productModel
    }

    async addProduct(data) {
        let product = await this.#productsDb.create(data)
        product = JSON.parse(JSON.stringify(product))
        return product
    }

    async getProducts(){
        const product = await this.#productsDb.find().lean()
        return product
    }

    async getProductsWithPagination(limit, page, query, sort) {
        const pageQuery = {}

        const options = {
            limit: limit || 10,
            page: page || 1,
            sort: {} || { price: sort },
            lean: true
        }

        // @ts-ignore
        const result = await this.#productsDb.paginate(pageQuery, options)
        return {
            status: result.status,
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            limit: result.limit,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage === false ? null : result.prevLink,
            nextLink: result.hasNextPage === false ? null : result.NextLink
        }
    }

    async getProductById(id) {
        const product = await this.#productsDb.findById(id).lean()
        if (!product) {
            throw new Error('Product ID not found.')
        }
        return product
    }

    async getProductsByCategory(category){

    }

    async getProductsByStatus(status){

    }

    async updateProduct(id, body) {
        const product = await this.#productsDb.findOne({_id: id})

        if(product){
            product.title = body.title
            product.description = body.description
            product.code = body.code
            product.price = body.price
            product.status = body.status
            product.stock = body.stock
            product.category = body.category
            product.thumbnail = body.thumbnail
            await product.save()
        }
        return product
    }

    async deleteProduct(id) {
        const product = await this.#productsDb.deleteOne(id)
        if (!product) {
            throw new Error('Product ID not found.')
        }
        return product
    }
}

export const productsManager = new ProductManager()