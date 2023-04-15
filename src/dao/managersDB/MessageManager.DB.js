import { messageModel } from "../models/message.model.js"

class MessageManager{
    #messagesDB

    constructor(){
        this.#messagesDB = messageModel
    }

    async sendMessage(data){
        let message = await this.#messagesDB.create(data)
        message = JSON.parse(JSON.stringify(message))
        return message
    }

    async getMessages(){
        const messages = await this.#messagesDB.find().lean()
        return messages
    }
}

export const messagesManager = new MessageManager()