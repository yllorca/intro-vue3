## Creación de una aplicación Vue

Para mostrar nuestros datos dentro de nuestro HTML, primero tendremos que crear una aplicación Vue. En nuestro archivo main.js , crearemos nuestra aplicación con:

main.js

````
const app = Vue.createApp({})
````

Como argumento, vamos a pasar un objeto y agregar una propiedad de datos. Esta va a ser una función que devuelve otro objeto, donde almacenaremos nuestros datos. Aquí, agregaremos product como un elemento de datos.

main.js
````
const app = Vue.createApp({
    data() {
        return {
            product: 'Socks'
        }
    }
})
````
Ahora solo debemos asegurarnos de que estamos importando nuestra aplicación Vue al archivo index.html.

index.html

````
<!-- Import App -->
<script src="./main.js"></script>
````

### Montar nuestra aplicación
Ahora que hemos creado nuestra aplicación, necesitamos montar la aplicación que acabamos de crear en nuestro DOM. Lo haremos dentro de una etiqueta de secuencia de comandos, en nuestro archivo index.html.

````
<!-- Mount App -->
<script>
  const mountedApp = app.mount('#app')
</script>
````
Diremos app, que se refiere a la aplicación que acabamos de crear, y luego .mount(), que es un método que requiere un selector DOM como argumento. Esto nos permite conectar la aplicación Vue a esa parte de nuestro DOM.

### Visualización de los datos

Ahora que hemos creado, importado y montado la aplicación Vue, ahora podemos comenzar a mostrar los datos que se encuentran dentro de ella.

Para representar los productdatos dentro de h1, escribiremos:

````
<div id="app">
  <h1>{{ product }}</h1>
</div>
````

### Comprender la instancia de Vue

Cuando creamos nuestra aplicación Vue, pasamos el objeto de opciones, lo que nos permitió agregar algunas propiedades opcionales para configurar la aplicación. Hacer esto crea nuestra instancia de Vue, el corazón de nuestra aplicación Vue, que impulsa todo.

````
const app = Vue.createApp({Options Object})
````
Al importar esta aplicación y montarla en el DOM, esencialmente conectamos la aplicación en nuestro DOM, lo que le da a nuestro HTML una línea directa a la aplicación. De esta forma, nuestro código de plantilla puede acceder a opciones de la aplicación, como sus datos.

 ![Curso vue img 1](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F3.opt.1596479498995.jpg?alt=media&token=bf6d771d-637c-4ef4-9e0a-77264201597d)

 Si se pregunta qué sucede con esta sintaxis de llaves dobles, puede imaginarla como un teléfono, que tiene acceso a un teléfono dentro de nuestra aplicación Vue. Desde nuestra plantilla, podemos preguntarle a la aplicación: "Oye, ¿cuál es el valor del producto?" Y la aplicación responde: "Calcetines". Cuando la página se procesa, vemos que se muestra "Calcetines" en la página.

Si esta sintaxis de llaves dobles, o sintaxis de bigote, es nueva para usted, nos permite escribir expresiones de JavaScript. En otras palabras, nos permite ejecutar JavaScript válido dentro de nuestro HTML.

### Reactividad de Vue
¿Qué pasaría si cambiamos el valor de product“Calcetines” a “Botas”?

Debido a cómo funciona Vue, la h1 expresión en la que se basa product recibiría automáticamente ese nuevo valor, y nuestro DOM se actualizaría para mostrar "Boots".

Esto se debe a que Vue es reactivo . Debajo del capó, Vue tiene un sistema de reactividad completo que maneja las actualizaciones. Cuando cambia el valor de un dato, cualquier lugar que dependa de esos datos se actualizará automáticamente para nosotros. No tenemos que hacer nada para que eso suceda.





