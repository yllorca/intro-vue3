# Bucle a través de matrices de datos

En el código inicial, ahora tenemos una matriz de details.


````
const app = Vue.createApp({
    data() {
        return {
            ...
            details: ['50% cotton', '30% wool', '20% polyester']
        }
    }
})
````

La pregunta ahora es: ¿cómo mostramos estos datos como una lista?

Comenzaremos creando una lista desordenada en nuestro index.html . En su li interior, agregaremos otra directiva Vue: v-for

````
<ul>
  <li v-for="detail in details">{{ detail }}</li>
</ul>
````

Dentro de la v-forexpresión, escribimos: detail in details. Aquí, detailsse refiere a la detailsmatriz en nuestros datos y detailes el alias para el elemento actual de esa matriz, ya que estamos recorriéndolo para imprimir un nuevo li.

Cada uno li mostrará ese elemento de matriz porque en el HTML interno hemos escrito una expresión: {{ detail }}para imprimir cada detalle.

Si revisamos el navegador, veremos una lista de los details que se muestran.

![Img 1 L5](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1.opt.1596497529474.jpg?alt=media&token=89e137ba-bf98-407c-affe-5927b48dae31)

Hasta ahora todo bien, pero ¿cómo v-forfunciona realmente?

## Variante de producto Colores

Para familiarizarse más con la representación de listas con v-for, trabajaremos en otro ejemplo dentro de nuestra aplicación. Agreguemos una nueva variants matriz a nuestros datos:

````
data() {
  return {
    ...
    variants: [
      { id: 2234, color: 'green' },
      { id: 2235, color: 'blue' }
    ]
  }
}
````

Ahora tenemos una matriz que contiene un objeto para cada variante de nuestro producto. Cada variante de producto tiene un id y un color. Entonces, para nuestra próxima tarea, imprimiremos cada variante de color y usaremos id para ayudar a Vue a realizar un seguimiento de los elementos de nuestra lista.

````
<div v-for="variant in variants" :key="variant.id">{{ variant.color }}</div>
````

Observe cómo estamos usando la notación de puntos para imprimir cada variant a medida que recorremos la variants matriz. Pero, ¿qué hace ese :key atributo allí?


## Atributo clave: esencial para los elementos de la lista

Al decir :key="variant.id", estamos usando la abreviatura para v-bindvincular la variante idal keyatributo. Esto le da a cada elemento DOM una clave única para que Vue pueda captar el elemento y no perderlo de vista a medida que las cosas se actualizan dentro de la aplicación.

Esto proporciona algunas mejoras de rendimiento y, más adelante, si está haciendo algo como animar sus elementos, encontrará que el key atributo realmente ayuda a Vue a administrar sus elementos de manera efectiva a medida que se mueven por el DOM.






