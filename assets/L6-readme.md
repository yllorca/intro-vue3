# Manejo de eventos

En el código inicial, verá que ahora tenemos un Agregar al carrito button, junto con un carrito div, que incluye una expresión para imprimir el valor de nuestros nuevos cartdatos.

````
<div class="cart">Cart({{ cart }})</div>
...
<button class="button">Add to Cart</button>
````

````
data() {
  return {
    cart: 0,
    ...
  }
}
````

Queremos poder hacer clic en buttone incrementar el valor de cart.

## Escuchar eventos

Para saber cuándo se hace clic en el botón, debemos escuchar los eventos en ese elemento, específicamente los eventos de clic . Podemos lograr esto usando otra directiva de Vue: v-on.

````
<button class="button" v-on:click="logic to run">Add to Cart</button>
````

Aquí, decimos v-onqué tipo de evento escuchar: a click. Dentro de las comillas, colocamos la lógica (o el nombre del método) que queremos ejecutar cuando ocurra ese evento.

Si escribimos v-on:click="cart += 1", incrementaremos el valor del carrito en 1, cuando ocurra un evento de clic.

## Activación de un método

Debido a que la lógica cart += 1es muy simple, podríamos mantenerla en línea en el buttonelemento, como lo tenemos. Pero a menudo, necesitamos desencadenar una lógica más compleja. En esas situaciones, podemos agregar un nombre de método para que se active cuando ocurra el evento. Así que hagámoslo ahora.

````
<button class="button" v-on:click="addToCart">Add to Cart</button>
````

Ahora, cuando se haga clic en el botón, addToCartse ejecutará el método. Agreguemos ese método al objeto de opciones de nuestra aplicación Vue, así:

````
const app = Vue.createApp({
  data() {
    return {
      cart: 0,
      ...
    }
  },
  methods: {
    addToCart() {
      this.cart += 1
    }
  }
})
````

Observe cómo agregamos la methodsopción, y dentro de eso agregamos el nuevo addToCart método, que contiene la misma lógica que acabamos de tener en línea. La diferencia aquí es que ahora decimos que nos this.cartreferimos a esto cart en los datos de esta instancia de Vue.

En el navegador, ahora deberíamos poder hacer clic en Agregar al carrito button y ver el valor del carrito subir en 1.

## Entendiendo v-on

Echemos un vistazo más profundo a cómo funciona este manejo de eventos.

![Img 1 L6](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1.opt.1596505779472.jpg?alt=media&token=1b735148-5bd2-4136-a21c-9a093a0d9b56)

Al agregar v-ona un elemento, esencialmente le estamos dando un oído que puede escuchar eventos. En este caso, hemos especificado que estamos escuchando eventos de clic. Cuando ocurre un clic, addToCartse ejecuta el método que, como acabamos de ver, toma el valor del carrito y lo incrementa en uno.

## Una abreviatura de v-on

Como puede imaginar, escuchar eventos en sus elementos es muy común. Así como v-bindtenía una taquigrafía ( :), v-ontiene una taquigrafía:@

Así que nuestro código podría simplificarse a:

```
<button class="button" @click="addToCart">Add to Cart</button>
```

## Otro ejemplo: eventos de mouseover

Ahora que comprendemos los conceptos básicos del manejo de eventos, escuchemos otro tipo de evento dentro de nuestra aplicación Vue.

Actualmente, mostramos las variantes de colores, "verde" y "azul", justo debajo de los detalles del producto:


![Img 1 L6](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F2.opt.1596505779473.jpg?alt=media&token=78940cc4-f686-447c-91f9-4b9ad14304b9)

¿No sería bueno si, cuando pasamos el mouse sobre "verde" y "azul", activamos una actualización de la imagen a la imagen verde y azul, respectivamente? Agreguemos la capacidad de escuchar mouseovereventos (el término de Vue para "pasar el mouse") en estos nombres de colores.

Debido a que queremos actualizar la imagen que mostramos cuando pasamos el mouse sobre los colores variantes, agregué una nueva propiedad a cada objeto variante.

````
data() {
  return {
    ...
    variants: [
      { id: 2234, color: 'green', image: './assets/images/socks_green.jpg' },
      { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg' },
    ]
  }
}
````

Ahora cada variante tiene una ruta de imagen para los calcetines verdes y azules, respectivamente. Estamos listos para agregar un oyente para mouseovereventos en la variante de color div.

```
<div v-for="variant in variants" :key="variant.id" @mouseover="updateImage(variant.image)">{{ variant.color }}</div>
```





