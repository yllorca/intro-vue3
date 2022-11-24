# Representación condicional

Queremos mostrar diferentes elementos HTML basados ​​en una condición. Mostraremos una petiqueta que diga "en stock" cuando nuestro producto esté en stock, o una que diga "agotado" cuando no lo esté.

En nuestro archivo index.html, agregaremos dos nuevas petiquetas.

````
<p>In Stock</p>
<p>Out of Stock</p>
````

Solo queremos que aparezca uno de estos dependiendo de si nuestro producto está en stock o no, por lo que nos dirigiremos al objeto de datos de nuestra aplicación Vue y agregaremos un nuevo inStock valor booleano.

````
const app = Vue.createApp({
    data() {
        return {
            product: 'Socks',
            image: './assets/images/socks_blue.jpg',
            inStock: true // new data property //
        }
    }
})
````

Ahora que hemos agregado los elementos que queremos renderizar condicionalmente y la condición ( inStock) que usaremos para decidir cuál renderizar, estamos listos para conocer otra directiva de Vue.

## La directiva v-if

Podemos agregar la v-ifdirectiva a un elemento para representarlo en función de una condición, así:

```
<p v-if="inStock">In Stock</p>
```

Ahora, este elemento se renderizará solo si inStock es verdadero.

Podemos combinar la v-if directiva con su directiva hermana v-else para mostrar otro elemento como respaldo si la primera condición resulta ser falsa.

````
<p v-if="inStock">In Stock</p>
<p v-else>Out of Stock</p>
````

Ahora, si inStockes false, veremos que "Agotado" se muestra en la página.

## Mostrar y ocultar

Vale la pena señalar que no siempre es necesario emparejarse v-if con v-else. Hay muchos casos de uso en los que no necesita un elemento alternativo para renderizar. Sin embargo, en estos casos, a veces es una mejor opción usar la v-show directiva.

````
<p v-show="inStock">In Stock</p>
````

La v-showdirectiva se usa para alternar la visibilidad de un elemento en lugar de agregar y eliminar el elemento del DOM por completo, como v-iflo hace.

Como puede imaginar, esta es una opción de mayor rendimiento si tiene algo que se enciende y apaga en la pantalla con frecuencia. Podemos verificar esto configurando inStock y false viendo el elemento en las herramientas de desarrollo del navegador. Cuando v-show se usa, podemos ver que el elemento todavía está presente en el DOM, pero ahora está oculto con un estilo en línea display: none; agregado.

 ![Img 1 L4](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1.opt.1596495756689.jpg?alt=media&token=45d879db-6189-495b-9676-59aa85fca735)


## Lógica condicional encadenada

Anteriormente, vimos v-if with v-else, ahora echemos un vistazo a cómo podemos agregar capas adicionales de lógica condicional.

Para hacer esto, reemplazaremos inStock con inventory:

````
const app = Vue.createApp({
    data() {
        return {
            ...
            inventory: 100 
    }
````

Dado que nuestra condición ( inventory) ahora es un número entero, podemos usar una lógica un poco más compleja dentro de nuestra expresión. Por ejemplo:

````
<p v-if="inventory > 10">In Stock</p>
<p v-else>Out of Stock</p>
````

Ahora, solo mostraremos la primera petiqueta si inventoryes mayor que 10.

Digamos que queremos mostrar un nuevo mensaje cuando el producto está casi agotado. En esta situación, podríamos agregar otro nivel condicional, en el que estemos atentos inventorya estar por debajo 10 pero por encima 0.

````
<p v-if="inventory > 10">In Stock</p>
<p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
<p v-else>Out of Stock</p>
````

La v-else-ifdirectiva nos da una capa intermedia de lógica. Entonces, en este ejemplo, si inventoryfuera 8, esta petiqueta se representaría.

Por supuesto, si inventoryes cero, usaremos el nivel final de forma predeterminada y mostraremos v-else "Agotado".








