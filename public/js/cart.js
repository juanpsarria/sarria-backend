// @ts-ignore
const serverSocket = io('http://localhost:8080')

const cartContainer = document.getElementById('cartContainer')

const cartTemplate = `
{{#if productsList}}
<ul>
    {{#each product}}
    <div id="container">
        <div id="cart">
            <h3>Producto: {{this.title}}</h3>
            <p>{{this.description}}</p>
            <p>Precio: {{this.price}}</p>
            <p>Código: {{this.code}}</p>
        </div>
    </div>
    {{/each}}
</ul>
{{else}}
<h3>No se encuentran productos</h3>
{{/if}}
`
// @ts-ignore
const compileCartTemplate = Handlebars.compile(cartTemplate)

serverSocket.on('refreshCart', cart => {
    const cartContainer = document.getElementById('cartContainer')
    if (cartContainer) {
        cartContainer.innerHTML = compileCartTemplate({
        cart,
        productsList: cart.products.length > 0
        })
    }
})