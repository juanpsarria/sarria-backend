// @ts-ignore
const socket = io('http://localhost:8080')


const sendButton = document.getElementById("sendButton")


sendButton?.addEventListener('click', e => {

    const inputUser = document.getElementById("user")
    const inputMessage = document.getElementById("message")
    
    if(inputUser instanceof HTMLInputElement && inputMessage instanceof HTMLInputElement && inputUser.value && inputMessage.value){
        const user = inputUser.value
        const message = inputMessage.value
        socket.emit('newMsg', {user, message})
    }

})

const messagesTemplate = `
{{#if msgList}}
<ul>
    {{#each msg}}
    <li>({{this.date}}) {{this.user}}: {{this.message}}</li>
    {{/each}}
</ul>
{{else}}
<p>No se encuentran mensajes.</p>
{{/if}}`

// @ts-ignore
const showMessages = Handlebars.compile(messagesTemplate)

socket.on('refreshMsg', msg => {
    const chatBox = document.getElementById("chatBox")
    if(chatBox){
        chatBox.innerHTML = showMessages({
            msg,
            msgList: msg.length > 0,
        })
    }
})

