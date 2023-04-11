import fs from 'fs/promises'
import { Product } from './Product.js'

class ProductManager {
    #path
    #products

    constructor(path){
        this.#path = path
        this.#products
    }

    async #readProductsFile(){
        const json = await fs.readFile(this.#path, 'utf-8')
        this.#products = JSON.parse(json)
    }

    async #writeProductsFile(){
        const json = JSON.stringify(this.#products, null, 2)
        await fs.writeFile(this.#path, json)
    }


    async addProduct(product) {
        await this.#readProductsFile()

        //validar que no se repita el código de producto
        const repeatedCode = this.#products.some(item => item.code === product.code);
        if(repeatedCode){
            throw new Error('Code already exists.');
        }

        //asignarle un id al producto
        this.#products.length === 0 ? product.id = 1 : product.id = this.#products[this.#products.length - 1].id + 1;

        //se asigna valor true a status
        product.status = true
        product.thumbnail = []

        //push
        this.#products.push(product)
        await this.#writeProductsFile()
        return product
    }

    async getProducts(){
        //recupera todos los productos
        await this.#readProductsFile()
        return this.#products;
    }

    async getProductById(productId){
        //recupera productos por id
        await this.#readProductsFile()

        const product = this.#products.find(e => e.id === productId);
        if(!product){
            throw new Error('Product ID not found.')
        }

        return product
    }

    /* async updateProduct(productId, body){
        await this.#readProductsFile()

        //modifica un objeto que se encuentra por id, sin modificar la misma
        const product = this.#products.find(e => e.id === productId);
        if(!product){
            throw new Error('Product ID not found.')
        } else{
            const i = this.#products.findIndex(p => p.id === productId)
            const update = new Product({ ...product, ...body})
            this.#products[i] = update
            update.id = productId
            await this.#writeProductsFile()
            return update
        }
    } */
    
    async updateProduct(productId, body){
        await this.#readProductsFile()

        //modifica un objeto que se encuentra por id, sin modificar la misma
        const i = this.#products.findIndex(p => p.id === productId)
        if(i === -1){
            throw new Error('Product ID not found.')
        }
        
        const product = this.#products[i]

        product.title = body.title ?? product.title
        product.description = body.description ?? product.description
        product.price = body.price ?? product.price
        product.stock = body.stock ?? product.stock
        product.status = body.status ?? product.status
        
        await this.#writeProductsFile()
        return product
    }

    async deleteProduct(productId){
        //elimina producto seleccionado por id
        await this.#readProductsFile()

        const productFound = this.#products.findIndex(e => e.id === productId)
        if(productFound === -1){
            throw new Error('ID not found.')
        }

        this.#products.splice(productFound, 1)
        
        await this.#writeProductsFile()
        console.log(`Product ${productId} deleted.`)
    }
}

export const productsManager = new ProductManager('./database/products.json')