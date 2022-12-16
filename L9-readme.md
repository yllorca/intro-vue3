# Componentes y accesorios

En esta lección, veremos el concepto de componentes y accesorios de Vue.js

## Bloques de construcción de una aplicación Vue

En los marcos de JavaScript front-end modernos, los componentes son los componentes básicos de una aplicación, y ese es ciertamente el caso con Vue. Puede imaginar componentes un poco como Legos que puede conectar entre sí en una jerarquía de árbol genealógico de componentes.

 ![Img 1 - L9](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1.opt.1596580225905.jpg?alt=media&token=61cfeafc-feda-418c-9096-a9ce57df0d28)

 Cualquier página web determinada puede estar compuesta por múltiples componentes, y es común que los componentes sean "principales" que tienen componentes secundarios anidados dentro de ellos.

 ![Img 2 - L9](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F2.opt.1596580225906.jpg?alt=media&token=d5e3ce68-c777-4180-bf3c-08bc8596f800)

## Creando nuestro primer componente

Vayamos a nuestra aplicación y creemos nuestro primer componente. Debido a que nuestra aplicación finalmente tendrá varios componentes, crearemos una carpeta de componentes , dentro de la cual crearemos nuestro primer componente, llamado ProductDisplay.js .

 ![Img 3 - L9](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F3.opt.1596580235185.jpg?alt=media&token=0e86c36c-941c-4198-b366-6b5cb8c3d4d2)

 La sintaxis para crear un componente se ve así:

````
app.component('product-display', {})
````

El primer argumento es el nombre del componente, 'product-display'en este caso, y el segundo argumento es un objeto para configurar nuestro componente (similar al objeto de opciones utilizado para configurar nuestra aplicación raíz Vue).

## Modelo

Debido a que necesitamos que nuestro componente tenga estructura, agregaremos la templatepropiedad y pegaremos todo el código HTML basado en el producto que reside actualmente en index.html aquí, dentro de un literal de plantilla.


````
app.component('product-display', {
  template: 
    /*html*/ 
    `<div class="product-display">
      <div class="product-container">
        <div class="product-image">
          <img v-bind:src="image">
        </div>
        <div class="product-info">
          <h1>{{ title }}</h1>
  
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
  
          <div 
            v-for="(variant, index) in variants" 
            :key="variant.id" 
            @mouseover="updateVariant(index)" 
            class="color-circle" 
            :style="{ backgroundColor: variant.color }">
          </div>
          
          <button 
            class="button" 
            :class="{ disabledButton: !inStock }" 
            :disabled="!inStock" 
            v-on:click="addToCart">
            Add to Cart
          </button>
        </div>
      </div>
    </div>`
})
````

Tenga en cuenta que no hemos cambiado nada de este código, simplemente lo estamos moviendo al product-display componente para que esté encapsulado allí. Si se pregunta qué /*html*/está haciendo allí, eso activa la extensión de VS Code es6-string-html , que nos brinda resaltado de sintaxis aunque estemos en este literal de plantilla.

## Datos y métodos

Ahora que le hemos dado a este componente su plantilla o su estructura, necesitamos darle sus datos y métodos, que aún viven en main.js. Así que los pegaremos ahora:

````
app.component('product-display', {
  template: 
    /*html*/ 
    `<div class="product-display">
      ...
    </div>`,
  data() {
    return {
        product: 'Socks',
        brand: 'Vue Mastery',
        selectedVariant: 0,
        details: ['50% cotton', '30% wool', '20% polyester'],
        variants: [
          { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
          { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
        ]
    }
  },
  methods: {
      addToCart() {
          this.cart += 1
      },
      updateVariant(index) {
          this.selectedVariant = index
      }
  },
  computed: {
      title() {
          return this.brand + ' ' + this.product
      },
      image() {
          return this.variants[this.selectedVariant].image
      },
      inStock() {
          return this.variants[this.selectedVariant].quantity
      }
  }
})
````

Nos aseguraremos de eliminar cartde dataaquí porque no necesitamos que cada producto tenga su propio carrito.

## Limpiando main.js

Ahora que hemos encapsulado todo este código específico del producto dentro de nuestro product-displaycomponente, podemos limpiar nuestro archivo main.js.

````
const app = Vue.createApp({
  data() {
    return {
      cart: 0,
    }
  },
  methods: {}
})
````

Hemos dejado cart la methods opción y porque tendrá un nuevo método más adelante.


## Importación del componente

Para hacer uso de product-display, necesitamos importarlo en we'll index.html .

````
<!-- Import Components -->
<script src="./components/ProductDisplay.js"></script>
````

Ahora que está importado, podemos usarlo dentro de nuestra plantilla.

````
<div id="app">
  <div class="nav-bar"></div>

  <div class="cart">Cart({{ cart }})</div>
  <product-display></product-display>
</div>
````

Si revisamos esto en un navegador, veremos que todo sigue apareciendo como antes, pero ahora que hemos reorganizado las cosas, el botón Agregar al carrito ya no incrementa el carrito. Arreglaremos eso en la próxima lección.

Por ahora, para mostrarles lo útiles que pueden ser estos bloques de código reutilizables, agregaré dos product-displaycomponentes más.

````
<div id="app">
  <div class="nav-bar"></div>

  <div class="cart">Cart({{ cart }})</div>
  <product-display></product-display>
  <product-display></product-display>
  <product-display></product-display>
</div>
````

Cuando actualicemos el navegador, los veremos aparecer todos. Cada uno de ellos es independiente funcional.

 ![Img 4 - L9](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F4.opt.1596580239932.jpg?alt=media&token=e41cb9ad-9e97-4bb8-aea1-76c64e993962)


## Accesorios

Ahora que estamos empezando a aprender cómo encapsular código reutilizable en estos componentes, ¿qué sucede cuando nuestro componente necesita algo que está fuera de sí mismo? Por ejemplo, ¿qué pasaría si el padre, por así decirlo, tuviera algunos messagedatos y el niño los necesitara? Debido a que un componente tiene su propio alcance aislado, no puede extenderse fuera de sí mismo para agarrar algo que está fuera de su alcance.

 ![Img 5 - L9](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F5.opt.1596580244043.jpg?alt=media&token=db716f30-d846-4e80-a85c-139787a7f260)


La respuesta aquí es accesorios . Estos son atributos personalizados para pasar datos a un componente. Funcionan como una especie de embudo, en el que puede pasar los datos que necesita el componente.

 ![Img 6 - L9](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F6.opt.1596580249511.jpg?alt=media&token=0b507de3-98d9-4de4-9844-4804915d1d9e)


Agreguemos la capacidad de que nuestro product-displaycomponente admita un accesorio.

## Dando a nuestro componente un apoyo

Démosle a nuestra aplicación Vue raíz, ubicada en main.js , una nueva propiedad de datos, que indica si el usuario era un premiumusuario o no.

````
const app = Vue.createApp({
  data() {
    return {
      cart: 0,
      premium: true
    }
  }
})
````

Si un usuario es premium, su envío será gratuito. Entonces nuestro product-displaycomponente necesita acceso a estos datos. En otras palabras, necesita un atributo personalizado (un embudo) en el que podamos introducir estos datos. Agreguemos eso ahora, lo que haremos al darle una propsopción al componente y agregarle un premiumaccesorio.


```
app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  ...
}
````

Observe cómo la función de accesorios de Vue tiene una validación incorporada, por lo que podemos especificar cosas como los accesorios typey si es required, etc.

Ahora que hemos configurado esto, podemos agregar ese atributo personalizado al product-displaycomponente donde lo estamos usando.

````
<div id="app">
  <div class="nav-bar"></div>

  <div class="cart">Cart({{ cart }})</div>
  <product-display :premium="premium"></product-display>
</div>
````

 ![Img 7 - L9](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F7.opt.jpg?alt=media&token=510d567e-1aea-4fc6-8beb-3dc63a1b2c0c)]

Observe cómo estamos usando la forma abreviada para v-bindque podamos recibir de forma reactiva el nuevo valor de premiumsi se actualiza (de truea false).

## Usando el accesorio

Ahora que nuestro product-displaycomponente tiene el premiumaccesorio, podemos usarlo dentro del componente. Recuerde, queremos usar el hecho de que un usuario es premiumo no para determinar cuánto debe pagar por el envío.

En la plantilla del componente, agregaremos:

````
template: 
  /*html*/
  `<div class="product-display">
    ...
      <p>Shipping: {{ shipping }}</p>
    ...
  </div>`,
````

Aquí shippingestá el nombre de una nueva propiedad calculada en el product-displaycomponente, que se ve así:

````
computed: {
  ...
  shipping() {
    if (this.premium) {
      return 'Free'
    }
      return 2.99
    }
}
````

La propiedad calculada comprueba si la premiumpropiedad es true, y si es así, devuelve 'Free'. De lo contrario, vuelve2.99



