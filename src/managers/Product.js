export class Product {
    constructor({title, description, code, price, status, stock, category, thumbnail, id}) {
        this.title = String(title)
        this.description = String(description)
        this.code = String(code)
        this.price = Number(price)
        this.status = Boolean(status)
        this.stock = Number(stock)
        this.category = String(category)
        this.thumbnail = String(thumbnail)
        this.id = id

        if(!title){
            throw new Error('Title is missing.')
        }
        if(!description){
            throw new Error('Description is missing.')
        }
        if(!code){
            throw new Error('Code is missing.')
        }
        if(!price){
            throw new Error('Price is missing.')
        }
        if(!stock){
            throw new Error('Stock is missing.')
        }
        if(!category){
            throw new Error('Category is missing.')
        }
    }
}