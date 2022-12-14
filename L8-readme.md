# Computed Properties

````
data() {
  return {
    product: 'Socks',
    brand: 'Vue Mastery'
}
````

¿Y si quisiéramos combinar el brandy el product, en nuestra plantilla? Podríamos hacer eso dentro de una expresión como esta:

````
<h1>{{ brand + ' ' + product }}</h1>
````

Si verificamos esto en el navegador, veríamos "Calcetines Vue mastery" en la pantalla. Pero, ¿no sería genial si, en lugar de manejar esta lógica en el HTML interno, nuestra aplicación tuviera la capacidad de calcular ese valor por nosotros? Por ejemplo, tomar el brandy el product, sumarlos y devolver ese nuevo valor.

Las propiedades calculadas son exactamente como suenan: propiedades que podemos agregar a una aplicación Vue que calcula valores para nosotros. Nos ayudan a mantener la lógica computacional fuera de la plantilla y nos brindan mejoras de rendimiento que cubriremos pronto. Por ahora, convirtamos este ejemplo simple en una propiedad calculada. Modificaremos la h1 expresión de así:

```
<h1>{{ title }}</h1>
```

Ahora, title es el nombre de una propiedad calculada que crearemos ahora. Primero, agregaremos la computed opción a la aplicación, justo debajo de nuestro methods, luego crearemos la title propiedad.

````
computed: {
  title() {
    return this.brand + ' ' + this.product
  }
}
````

Si revisamos el navegador, aún veremos "Vue Mastery Socks", excepto que ahora hemos abstraído esa lógica computacional de la plantilla y la hemos contenido claramente en el objeto de opciones.


Pero, ¿cómo funcionan exactamente las propiedades calculadas? Echemos un vistazo más profundo.


## Piense en ellos como una calculadora

Me gusta pensar en las propiedades calculadas como una especie de calculadora, porque calculan o computan valores por nosotros. Esta calculadora computacional toma nuestros valores, los suma brandy productnos da el resultado.

 ![Img 1: L8](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1.opt.1596575978668.jpg?alt=media&token=bff9b420-c05e-4c5c-807c-762022264757)

 Como mencioné anteriormente, las propiedades computadas nos brindan una mejora en el rendimiento. Esto se debe a que almacenan en caché el valor calculado. El valor ( 'Vue Mastery Socks') se almacena y solo se actualiza cuando es necesario, cuando cambia una de sus dependencias. Por ejemplo, si brandcambiara de 'Vue Mastery'a 'Node Mastery', nuestra propiedad calculada recibiría esa nueva branddependencia, luego recalcularía y devolvería el nuevo valor:'Node Mastery Socks'

Ahora que comenzamos a comprender las propiedades calculadas, implementemos un ejemplo más práctico en nuestra aplicación Vue.

## Computación de imagen y cantidad

Volviendo a nuestro código, agreguemos una nueva quantitypropiedad a nuestros objetos variantes.

````
data() {
  return {
    ...
    variants: [
      { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
      { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
    ]
  }
}
````

Observe cómo los calcetines verdes tienen un quantitymientras 50que los calcetines azules tienen 0. En otras palabras, los calcetines verdes están en stock y los calcetines azules están agotados. Sin embargo, actualmente mostramos "En stock" o "Agotado" según el inStockvalor de los datos, que ya no refleja la verdad sobre nuestro producto y sus cantidades variantes. Así que querremos crear una propiedad calculada que podamos usar para mostrar "En stock" o "Fuera de stock" en función de estas nuevas cantidades.

Para comenzar, ¿recuerda cómo actualizamos la imagen de la variante, según el color de la variante sobre el que se pasa el mouse? En lugar de que ese evento de mouseover active el updateImage()método, vamos a hacer que active un nuevo método llamado updateVariant().

````
<div 
  v-for="(variant, index) in variants" 
  :key="variant.id" 
  @mouseover="updateVariant(index)" <! -- new method -->
  class="color-circle" 
  :style="{ backgroundColor: variant.color }">
</div>
````

Observe cómo estamos pasando en el indexde la variante actual: updateVariant(index). Obtuvimos acceso a eso indexal agregarlo como un segundo parámetro en nuestra v-fordirectiva:


v-for="(variant, index) in variants"


¿Por qué estamos pasando en el index? Vamos a usarlo para decirle a nuestra aplicación qué variante se encuentra actualmente, de modo que pueda usar esa información para activar la actualización de la imagen Y si esa variante está en stock o no.

Agregaremos una nueva propiedad de datos a nuestra aplicación, que se actualizará para igualar eso index


````
data() {
  return {
    ...
    selectedVariant: 0,
    ...
  }
}
````

Nuestro updateVariant() método establecerá el selectedVariantvalor de igual al indexde la variante actual.

````
updateVariant(index) {
  this.selectedVariant = index
}
````

Ahora, hemos implementado una forma para que nuestra aplicación sepa con qué variante de producto se está interactuando, y podemos usar esa información para activar el cálculo de qué imagen mostrar y si mostrar "En stock" o "Agotado". de stock”, en función de la variante sobre la que el usuario pasa el ratón.

Ahora estamos listos para eliminar imagey inStockde nuestros datos, y reemplazarlos con propiedades calculadas con los mismos nombres.

````
computed: {
  image() {
    return ??
  },
  inStock() {
    return ??
  }
}
````

Entonces, ¿cómo obtenemos la imagen variante y la cantidad? Eso se verá así:

````
image() {
  return this.variants[this.selectedVariant].image
}
````

Estamos apuntando al primer o segundo elemento de nuestra variantsmatriz en función de selectedVariant, que es 0o 1, según la variante del círculo de color sobre el que se desplace el cursor. Luego solo usamos la notación de puntos para obtener la imagevariante.

La lógica para la computación inStockes casi idéntica:

````
inStock() {
  return this.variants[this.selectedVariant].quantity
}
````

Al verificar esto en el navegador, cuando pasamos el mouse sobre los círculos de color, no solo actualizamos la imagen de la variante, sino que también mostramos si esa variante está en stock o agotada, usando su cantidad.

![Img 2: L8](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F2.opt.1596575978669.jpg?alt=media&token=9bfce63e-db58-47bb-834d-4439b07ba53c)


Observe cómo el botón todavía se actualiza automáticamente para nosotros, habilitando y deshabilitando. Eso es porque, en nuestra plantilla, todavía usamos inStock.

````
<button 
  class="button" 
  :class="{ disabledButton: !inStock }" 
  :disabled="!inStock" 
  v-on:click="addToCart">
  Add to Cart
</button>
````

Ahora inStock ya no es una propiedad de datos; es la nueva propiedad calculada.





















