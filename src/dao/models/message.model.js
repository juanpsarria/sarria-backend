import mongoose from "mongoose";

const messageCollection = 'messages'

const messageSchema = new mongoose.Schema({
    user: {type: String, require: true},
    message: {type: String, require: true}
}, { versionKey: false })

export const messageModel = mongoose.model(messageCollection, messageSchema)