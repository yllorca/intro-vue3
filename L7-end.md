# Style Binding

En la última lección, agregamos la función en la que, si pasa el mouse sobre "verde" o "azul", actualiza la imagen que se muestra; los calcetines verdes o azules, respectivamente. Pero, ¿no sería mejor la experiencia del usuario si en lugar de pasar el cursor sobre la *palabra "*verde" o "azul", nos moviéramos sobre los colores reales verde y azul?

Vamos a crear círculos verdes y azules sobre los que podamos desplazarnos. Podemos lograr esto mediante el uso de enlaces de estilo.

Primero, para diseñar nuestros divs como círculos, necesitaremos agregar una nueva clase .color-circlea la variante div.

````
<div 
  v-for="variant in variants" 
  :key="variant.id" 
  @mouseover="updateImage(variant.image)" 
  class="color-circle" 
</div>
````

Esta clase ya vive en nuestro archivo css. Como puede ver, simplemente transforma nuestros divs en un círculo con un diámetro de 50px:

````
.color-circle {
  width: 50px;
  height: 50px;
  margin-top: 8px;
  border: 2px solid #d8d8d8;
  border-radius: 50%;
} 
````

Ahora que lo hemos solucionado, podemos pasar al enlace de estilo real. Tal como suena, queremos vincular estilos a los divs variantes. Lo hacemos usando v-bind(o su forma abreviada: :) en el styleatributo y vinculando un objeto de estilo a él.

````
<div 
  v-for="variant in variants" 
  :key="variant.id" 
  @mouseover="updateImage(variant.image)" 
  class="color-circle" 
  :style="{ backgroundColor: variant.color }">
</div>
````

Aquí, estamos configurando los divs' backgroundColorigual a variant.color. Entonces, en lugar de imprimir esas cadenas, "verde" y "azul", las estamos usando para establecer el color de fondo de nuestros círculos.

Al comprobar esto en el navegador, ahora deberíamos ver dos círculos de color rellenos con un fondo verde y azul.

![Img 1: L7](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1.opt.1596508327829.jpg?alt=media&token=4bd3d263-5206-41b1-ab84-423898344ce7)

## Descripción del enlace de estilo

En nuestra variante div, agregamos el styleatributo y le vinculamos un objeto de estilo.

````
<div 
  ...
  :style="{ backgroundColor: variant.color }">
</div>
````

Ese objeto de estilo tiene la propiedad CSS de backgroundColor, y lo estamos configurando igual a cualquiera que sea el color de la variante en el momento de esa v-foriteración.

En la primera iteración, variant.colores"green"

Vue toma esa información y la convierte en el código :style="{ backgroundColor: green }"

Luego imprime un círculo de fondo verde.

![Img 2: L7](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F2.opt.1596508327830.jpg?alt=media&token=a2911bd5-816e-4c4f-9345-90b127f9e87b)

Repite este proceso para la segunda variante de color para crear el círculo azul.

## Camel vs Kebab

Hay algunas cosas importantes que se deben tener en cuenta al usar un enlace de estilo como este.

````
<div :style="{ backgroundColor: variant.color }></div>
````

Dentro de esta expresión, recuerda que este objeto de estilo es todo JavaScript. Es por eso que usé camelCase en el nombre de la propiedad. Si hubiera dicho background-color, eso -se habría interpretado como un signo menos. Pero no estamos haciendo ningún cálculo aquí. Estamos configurando un nombre de propiedad CSS.

Entonces, dado que estamos en este objeto de JavaScript, tenemos que usar camelCased a menos que queramos usar 'kebab-cased' entre comillas para evitar la mala interpretación matemática, así:

````
<div :style="{ 'background-color': variant.color }></div>
````

Ambas opciones funcionarán, siempre que recuerde las comillas.

## Style Binding: Objects

A veces, es posible que desee agregar un montón de estilos a un elemento, pero agregarlos todos en línea podría complicarse. En estas situaciones, podemos vincularnos a un objeto de estilo completo que vive dentro de nuestros datos.

![Img 3: L7](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F3.opt.1596553374683.jpg?alt=media&token=23c433ad-cef5-4201-ad9b-0bec14c625c2)

Ahora que hemos analizado el tema del enlace de estilo, veamos un tema similar: el enlace de clase o Class Binding.

## Class Binding

De vuelta en nuestra aplicación, notará que cuando nuestro inStockvalor de datos es falso, aún podemos hacer clic en el botón Agregar al carrito e incrementar el valor del carrito. Pero si el producto está agotado, tal vez no queramos que el usuario pueda agregar el producto al carrito. Entonces, cambiemos este comportamiento, deshabilitando el botón siempre que inStockesté falseY haciendo que el botón parezca deshabilitado, usando el enlace de clase.

Para comenzar, usaremos la forma abreviada de v-binden el disabledatributo para agregar ese atributo siempre que nuestro producto no esté en stock.

````
<button 
  class="button" 
  :disabled="!inStock" 
  @click="addToCart">
  Add to Cart
</button>
````

Ahora, siempre que inStocksea falsey hagamos clic en el botón Agregar al carrito, no pasará nada ya que está deshabilitado. Pero el botón aún aparece activo, lo que es engañoso para nuestros usuarios. Entonces, usemos el enlace de clase para agregar una disabledButtonclase también, siempre que inStocksea false.

Verá en nuestro archivo CSS que ya tenemos esta disabledButton clase, lo que establece background-coloren gris y hace que cursorno esté permitido.


````
.disabledButton {
  background-color: #d8d8d8;
  cursor: not-allowed;
}
````

Para aplicar esta clase de forma condicional, según el valor de inStock, usaremos la forma abreviada de v-binden el classatributo y usaremos una expresión que agrega la disabledButton clase (o no) siempre que !inStock.


````
<button 
  class="button" 
  :class="{ disabledButton: !inStock }" 
  :disabled="!inStock" 
  @click="addToCart">
  Add to Cart
</button>
````

Ahora, siempre que inStock sea false, no solo se deshabilitará el botón, sino que también aparecerá deshabilitado.


![Img 4: L7](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F4.opt.1596553374684.jpg?alt=media&token=0980e0fd-af27-4a8a-8fe6-0efbdbe484d3)

## Múltiples nombres de clase


Al comenzar con el enlace de clase, hay algunas cosas a tener en cuenta. Por ejemplo, ¿qué sucede cuando ya tenemos una clase existente y queremos agregar condicionalmente otra clase en función de un valor de datos?

Por ejemplo, si ya tenemos la color-circle clase en this divy la agregamos condicionalmente active, ¿cómo se verá esto?


![Img 5: L7](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F5.opt.1596553385537.jpg?alt=media&token=313ea26d-a88c-4c7a-ae31-7a97d369f5d5)


Esas clases se van a combinar así:

````
<div class="color-circle active"></div>
````

## Ternary Operators

Una herramienta útil que nos brinda el enlace de clase es la capacidad de usar operadores ternarios en línea para agregar diferentes clases según una condición.


![Img 6: L7](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F6.opt.jpg?alt=media&token=d6bd4ce3-1ea6-4bf1-aeaa-f169e60c2cb0)


En este caso, debido a que isActivees true, de hecho estamos agregando el activeClass. Si lo fuera false, no agregaríamos ninguna clase ( ''); alternativamente, podríamos haber agregado una clase completamente diferente.

Las variaciones en la sintaxis y los casos de uso que acabo de mostrarles con el enlace de clase y estilo son solo el comienzo. Por lo tanto, recomiendo consultar los documentos de Vue para obtener más casos de uso y ejemplos.









