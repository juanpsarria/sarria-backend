// @ts-ignore
const socket = io()

const user = document.getElementById("user")
const newMessage = document.getElementById("message")
const sendButton = document.getElementById("sendButton")


sendButton?.addEventListener('click', e => {
    if(user instanceof HTMLInputElement && newMessage instanceof HTMLInputElement && user.value && newMessage.value){
        const msg = {
            user: user.value,
            message: newMessage.value
        }
        socket.emit('newMessage', msg)
    }
})

const messagesTemplate = `
{{#if hayMensajes}}
<ul>
    {{#each mensajes}}
    <li>{{this.user}}: {{this.message}}</li>
    {{/each}}
</ul>
{{else}}
No hay mensajes
{{/if}}`

// @ts-ignore
const showMessages = Handlebars.compile(messagesTemplate)

socket.on('mensajes', mensajes => {
    const chatBox = document.getElementById("chatBox")
    if(chatBox){
        chatBox.innerHTML = showMessages({
            hayMensajes: mensajes.length > 0,
            mensajes
        })
    }
})

socket.emit('refrescarMensajes')