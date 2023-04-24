import mongoose, { Schema } from "mongoose";

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    products: [{
        product: {type: Schema.Types.ObjectId, ref: 'products', required: true},
        quantity: {type: Number, required: true}
    }],
}, { versionKey: false })

cartSchema.pre(/^find/, function (next){
    this.populate('products.product')
    next()
})

export const cartModel = mongoose.model(cartCollection, cartSchema)