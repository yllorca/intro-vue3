# Formularios y modelo v

En esta lección, vamos a ver el concepto de vinculación de atributos.

## Nuestro objetivo

Cree un formulario para que los usuarios agreguen reseñas de productos.

## Presentamos el modelo v

Al comienzo de este curso, aprendimos sobre v-bind, que crea un enlace unidireccional, desde los datos hasta la plantilla. Sin embargo, cuando se trabaja con formularios, este enlace unidireccional no es suficiente. También necesitamos ser vinculantes desde la plantilla a los datos.

Por ejemplo, cuando un usuario ingresa su nombre en un campo de entrada, queremos registrar y almacenar ese valor en nuestros datos. La v-model directiva nos ayuda a lograr esto, creando un enlace de datos bidireccional.

 ![M1 - L11](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1.opt.1596586106235.jpg?alt=media&token=c40d8c30-3a5a-47fa-ba92-6a0a847e036e)

 Para ver todo esto en acción, vamos a crear un nuevo review-formcomponente.

## El componente del formulario de revisión

Agregaremos un nuevo archivo ReviewForm.js en nuestra carpeta de componentes y desplegaremos el componente.

````
app.component('review-form', {
  template:
  /*html*/
  `<form class="review-form">
    <h3>Leave a review</h3>
    <label for="name">Name:</label>
    <input id="name">

    <label for="review">Review:</label>      
    <textarea id="review"></textarea>

    <label for="rating">Rating:</label>
    <select id="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>

    <input class="button" type="submit" value="Submit">
  </form>`,
  data() {
    return {
      name: '',
      review: '',
      rating: null
    }
  }
})
````

Dentro de nuestra plantilla, observe estos elementos:

- input
- textarea
- select

Queremos vincular estos campos de entrada a sus respectivas propiedades de datos para que cuando el usuario complete el formulario, almacenemos sus datos localmente.

````
 data() {
    return {
      name: '',
      review: '',
      rating: null
    }
  }
````

Lo lograremos agregando la v-model directiva a cada uno de esos elementos de entrada.

````
app.component('review-form', {
  template:
  /*html*/
  `<form class="review-form">
    <h3>Leave a review</h3>
    <label for="name">Name:</label>
    <input id="name" v-model="name">

    <label for="review">Review:</label>      
    <textarea id="review" v-model="review"></textarea>

    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>

    <input class="button" type="submit" value="Submit">  
  </form>`,
  data() {
    return {
      name: '',
      review: '',
      rating: null
  }
})
````

Observe cómo en el select elemento que usamos v-model.number, este es un modificador que encasilla el valor como un número.

## Envío del formulario de revisión

Para enviar este formulario, agregaremos un oyente en la parte superior:

````
app.component('review-form', {
  template:
  /*html*/
  `<form class="review-form" @submit.prevent="onSubmit">
    ...
    <input class="button" type="submit" value="Submit">  
  </form>`
  ...
})
````

Estamos usando otro modificador @submit.prevent="onSubmit"para evitar el comportamiento predeterminado (una actualización del navegador). Cuando se envía este formulario, activará el onSubmit() método, que escribiremos ahora:

````
...
data() {
  return {
    name: '',
    review: '',
    rating: null
   }
 },
 methods: {
   onSubmit() {
     let productReview = {
       name: this.name,
       review: this.review,
       rating: this.rating,
     }
     this.$emit('review-submitted', productReview)

     this.name = ''
     this.review = ''
     this.rating = null
   }
 }
...
````

Ese método creará un productReviewobjeto, que contendrá el name, reviewy ratingdesde nuestro data. Luego generará $emitun review-submittedevento y lo enviará productReviewcomo carga útil.

Finalmente, estamos limpiando los campos de datos.

## Uso del formulario de revisión

Ahora que se creó nuestro formulario de revisión, podemos importarlo dentro de index.html .

````
<!-- Import Components -->
...
<script src="./components/ReviewForm.js"></script>
...
````

Luego nos dirigiremos a product-display, y usaremos el componente dentro de su plantilla, debajo del "producto-contenedor".

````
template: 
  /*html*/
  `<div class="product-display">
    <div class="product-container">
     ...
    </div>
    <review-form></review-form>
  </div>`
})
````

Ahora en el navegador, podemos ver el formulario de revisión.

![Img 2, L11](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F2.opt.1596586106236.jpg?alt=media&token=67a7cbf3-f5f5-44e8-a8a8-34f0222a2755)

Parece que está funcionando... excepto cuando hacemos clic en el botón Enviar, estamos emitiendo el evento, pero no lo hemos escuchado en ninguna parte. Como aprendimos en la lección anterior, necesitamos escuchar el review-submittedevento en el ámbito principal (en product-display).

Cuando se "escucha" el evento, agregaremos la productReviewcarga útil a los product-displaydatos del componente.

## Agregar reseñas de productos

Agregaremos el detector de eventos aquí en el review-form, donde se está utilizando:

````
template: 
  /*html*/
  `<div class="product-display">
    <div class="product-container">
     ...
    </div>
    <review-form @review-submitted="addReview"></review-form>
  </div>`
})
````

Cuando ocurra el evento, activaremos un nuevo addReview()método. Esto agregará revisiones de productos a nuestro product-displaycomponente, lo que significa que ese componente necesita una nueva reviewsmatriz en sus datos.

````
...
data() {
  return {
    ...
    reviews: []
  }
}
...
````

Ahora vamos a desarrollar el addReview()método:

````
...
data() {
  return {
    ...
    reviews: []
   }
 },
methods: {
  ...
  addReview(review) {
    this.reviews.push(review)
  }
},
...
````


Como puede ver, toma lo reviewque obtuvimos de la review-submittedcarga útil del evento y lo empuja a la reviewsmatriz.

## Mostrando las reseñas

Ahora que hemos implementado la capacidad de agregar reseñas, debemos mostrar esas reseñas. Vamos a crear un nuevo componente para hacer eso. Ese componente se llamará review-list, que desplegaremos así:

````
app.component('review-list', {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  template:
  /*html*/
  `
  <div class="review-container">
  <h3>Reviews:</h3>
    <ul>
      <li v-for="(review, index) in reviews" :key="index">
        {{ review.name }} gave this {{ review.rating }} stars
        <br/>
        "{{ review.review }}"
        <br/>
      </li>
    </ul>
  </div>
`
})
````

Tendrá un accesorio para que pueda recibir reviewse imprimirlos en la plantilla usando v-for, incluido el index, para que podamos vincularle el :keyatributo.

Ahora podemos importar este componente dentro de index.html:

```
<!-- Import Components -->
...
<script src="./components/ReviewList.js"></script>
...
````

Luego agréguelo dentro de product-display, justo encima de review-form:

```
template: 
  /*html*/
  `<div class="product-display">
    <div class="product-container">
     ...
    </div>
    <review-list :reviews="reviews"></review-list>
    <review-form @review submitted="addReview"></review-form>
  </div>`
})
````

Observe cómo hemos agregado :reviews="reviews"para que podamos pasar el reviewsque está vivo product-displayal review-list.

Verificando esto en el navegador, agregaremos una nueva revisión, haremos clic en Enviar y veremos que se muestra la revisión.

 ![Img3, L11](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F3.opt.1596586115724.jpg?alt=media&token=d4335601-374c-4736-ba78-551911c3641d)

Hasta ahora todo bien, pero cuando actualizamos (y no hay revisiones) todavía vemos un cuadro vacío porque el review-listcomponente aún se está renderizando sin revisiones para imprimir. Arreglemos eso, y solo representemos ese componente cuando tengamos reviewsque mostrarlo.

```
template: 
  /*html*/
  `<div class="product-display">
    ...
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    ...
  </div>`
})
```

En otras palabras, si la reviewsmatriz está vacía, no mostraremos el review-listcomponente.

Con una actualización, parece que funciona y el componente solo aparece después de que agregamos una revisión.

## Validación de formulario básico

Para finalizar esta lección, agregaremos una validación muy básica a nuestro review-form.

````
methods: {
  onSubmit() {
    if (this.name === '' || this.review === '' || this.rating === null) {
      alert('Review is incomplete. Please fill out every field.')
      return
    }
  ...
  }
}
````




