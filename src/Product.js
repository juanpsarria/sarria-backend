export class Product {
    constructor({title, description, code, price, stock, category, thumbnail}) {
        this.title = title
        this.description = description
        this.price = price
        this.stock = stock
        this.category = category
        this.code = code
        this.thumbnail = [thumbnail]
    }
}