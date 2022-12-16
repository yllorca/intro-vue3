# Comunicación de eventos

En esta lección, veremos el concepto de comunicar eventos que suceden dentro de nuestros componentes.


## Nuestro objetivo

Dé a nuestro componente la capacidad de informar a su padre sobre un evento que ocurrió dentro de él.

## Emitiendo el evento

Cuando refactorizamos las cosas en nuestra última lección, moviendo el código relacionado con el producto al nuevo product-displaycomponente, rompimos la capacidad de hacer clic en el botón Agregar al carrito e incrementar el valor de cart. Esto se debe a que cartvive fuera del product-displaycomponente, dentro de la aplicación raíz Vue en main.js.

Necesitamos darle al product-displaycomponente una forma de anunciar que se hizo clic en su botón. ¿Cómo hacemos que esto suceda?

Ya sabemos que los accesorios son una forma de pasar datos a un componente, pero ¿qué pasa cuando algo sucede dentro de ese componente, como hacer clic en un botón? ¿Cómo informamos a otras partes de nuestra aplicación que ese evento sucedió?

 ![Img 1 - L10](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1.opt.1596581676271.jpg?alt=media&token=de6233b2-3eb2-4f2f-b338-d38528e6a00c)

 La respuesta es emitir ese evento, diciéndole al padre que sucedió. Agreguemos esta habilidad dentro de nuestro product-display componente, modificando el addToCart()método.

````
methods: {
  addToCart() {
    this.$emit('add-to-cart')
  }
  ...
 }
 ````

Escribiremos this.$emit()y emitiremos un evento llamado 'add-to-cart'. Entonces, cuando se hace clic en el botón, estamos emitiendo, o burbujeando, ese evento. Podemos escuchar ese evento desde el ámbito principal, donde estamos usando product-display, agregando un oyente:@add-to-cart

````
<product-display :premium="premium" @add-to-cart="updateCart"></product-display>
````

Cuando el padre "escucha" ese evento, activará un nuevo método con el nombre de updateCart, que agregaremos dentro de main.js .

 ![Img 2 - L10](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F2.opt.1596581676272.jpg?alt=media&token=782f1432-e1d1-4f92-b0af-a9926b38af0c)

 ````
const app = Vue.createApp({
  data() {
    return {
      cart: [],
      ...
    }
  },
  methods: {
    updateCart() {
      this.cart += 1
    }
  }
})
````

Si verificamos esto en el navegador, ahora deberíamos poder hacer clic en el botón Agregar al carrito, que le permite al padre saber add-to-cartque ocurrió el evento, activando el updateCart() método.

## Agregar ID de producto al carrito

Para que nuestra aplicación sea más realista, cartno debería ser solo un número. Debe ser una matriz que contenga los identificadores de los productos que se agregan. Así que vamos a hacer un poco de refactorización.

````
const app = Vue.createApp({
  data() {
    return {
      cart: [],
      ...
    }
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    }
  }
})
````

Ahora, cartes una matriz y updateCart(id)empuja el producto idhacia ella. Solo necesitamos agregar una carga útil a nuestra add-to-cart emisión de eventos, por lo que updateCarttiene acceso a eso id.

````
methods: {
  addToCart() {
    this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
  }
  ...
 }
 ````

Aquí, agregamos un segundo parámetro y tomamos el producto de la idmisma manera que tomamos el imagey quantityantes:

````
computed: {
  image() {
    return this.variants[this.selectedVariant].image
  },
  inStock() {
  return this.variants[this.selectedVariant].quantity
  }
}
````

Ahora, en el navegador, puede ver que estamos agregando los identificadores de productos al carrito, que ahora es una matriz.

![Img 3 - L10](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F3.opt.1596581709801.jpg?alt=media&token=d95212a0-c5a6-4e3f-8ff6-e6b279222eb7)


Pero no necesitamos mostrar estas identificaciones. Solo queremos mostrar cuántos artículos hay en el carrito. Afortunadamente, esa es una solución rápida.

````
<div id="app">
  ...
  <div class="cart">Cart({{ cart.length }})</div>
  ...
 </div>
 ````

Al agregar cart.length, ahora solo mostraremos la cantidad de artículos en el archivo cart.

