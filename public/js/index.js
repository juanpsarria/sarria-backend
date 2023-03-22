// @ts-ignore
const serverSocket = io('http://localhost:8080/')

const container = document.getElementById('container')

const template = `
{{#if productsList}}
<ul>
    {{#each products}}
    <div id="container">
        <div id="cart">
            <h3>Producto: {{this.title}}</h3>
            <p>{{this.description}}</p>
            <p>Precio: {{this.price}}</p>
        </div>
    </div>
    {{/each}}
</ul>
{{else}}
<h3>No se encuentran productos</h3>
{{/if}}
`
const compileTemplate = Handlebars.compile(template)

