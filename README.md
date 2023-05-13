# Segunda pre-entrega del proyecto final.

En esta segunda pre-entrega se busca manejar bases de productos y carritos con el método CRUD. Se utiliza como sistema de persistencia MongoDB.

**Objetivos generales**

-Contarás con Mongo como sistema de persistencia principal
-Tendrás definidos todos los endpoints para poder trabajar con productos y carritos.

**Objetivos específicos**

-Profesionalizar las consultas de productos con filtros, paginación y ordenamientos
-Profesionalizar la gestión de carrito para implementar los últimos conceptos vistos.

**Se debe entregar:**

+ Con base en nuestra implementación actual de productos, modificar el método GET / para que cumpla con los siguientes puntos:

> Deberá poder recibir por query params un limit (opcional), una page (opcional), un sort (opcional) y un query (opcional)

>> limit permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir limit, éste será de 10

>> page permitirá devolver la página que queremos buscar, en caso de no recibir page, ésta será de 1

>> query, el tipo de elemento que quiero buscar (es decir, qué filtro aplicar), en caso de no recibir query, realizar la búsqueda general

>> sort: asc/desc, para realizar ordenamiento ascendente o descendente por precio, en caso de no recibir sort, no realizar ningún ordenamiento

+ El método GET deberá devolver un objeto con el siguiente formato:

{<br>
  status:success/error,<br>
  payload: Resultado de los productos solicitados,<br>
  totalPages: Total de páginas,<br>
  prevPage: Página anterior,<br>
  nextPage: Página siguiente,<br>
  page: Página actual,<br>
  hasPrevPage: Indicador para saber si la página previa existe,<br>
  hasNextPage: Indicador para saber si la página siguiente existe,<br>
  prevLink: Link directo a la página previa (null si hasPrevPage=false),<br>
  nextLink: Link directo a la página siguiente (null si hasNextPage=false)<br>
}

+ Se deberá poder buscar productos por categoría o por disponibilidad, y se deberá poder realizar un ordenamiento de estos productos de manera ascendente o descendente por precio.

+ Además, agregar al router de carts los siguientes endpoints:
>> DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.<br>
>> PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.<br>
>> PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body<br>
>> DELETE api/carts/:cid deberá eliminar todos los productos del carrito <br>
>> Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products. Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados.

+ Crear una vista en el router de views ‘/products’ para visualizar todos los productos con su respectiva paginación. Cada producto mostrado puede resolverse de dos formas:<br>
++ Llevar a una nueva vista con el producto seleccionado con su descripción completa, detalles de precio, categoría, etc. Además de un botón para agregar al carrito.<br>
++ Contar con el botón de “agregar al carrito” directamente, sin necesidad de abrir una página adicional con los detalles del producto.

+ Además, agregar una vista en ‘/carts/:cid (cartId) para visualizar un carrito específico, donde se deberán listar SOLO los productos que pertenezcan a dicho carrito. 
