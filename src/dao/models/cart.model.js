import mongoose, { Mongoose } from "mongoose";

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    products: { type: Array, require: true}
}, { versionKey: false })

export const cartModel = mongoose.model(cartCollection, cartSchema)