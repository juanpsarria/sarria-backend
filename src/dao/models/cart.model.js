import mongoose from "mongoose";

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    products: [{
        product: {type: String, required: true},
        quantity: {type: Number, min: 1, required: true}
    }]
}, { versionKey: false })

export const cartModel = mongoose.model(cartCollection, cartSchema)