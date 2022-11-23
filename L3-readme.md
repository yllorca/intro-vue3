## Agregar una imagen a nuestros datos
¿Recuerdas que en nuestro directorio de assents tenemos una carpeta de imágenes , con imágenes para calcetines verdes y azules? Apuntemos a una de esas imágenes desde una nueva propiedad de datos en nuestra aplicación Vue. Lo haremos estableciendo imageigual a una ruta para que pueda tomar esa imagen.

main.js
````
const app = Vue.createApp({
    data() {
        return {
            product: 'Socks',
            image: './assets/images/socks_green.jpg'
        }
    }
})
````

## Introducción a la vinculación de atributos

Para crear un vínculo entre el atributo de un elemento HTML y un valor de los datos de su aplicación Vue, usaremos una directiva Vue llamada v-bind.

index.html

````
<img v-bind:src="image">
````

Ahora, hemos creado un vínculo reactivo entre lo que vive en este atributo ( "image") y los imagedatos mismos.

Mirando en el navegador, ahora veremos la imagen de nuestros calcetines verdes.

![Img 1 L3](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1.opt.1596481142403.jpg?alt=media&token=6fee2b60-3d30-45fa-aa1e-a25f00f7180f)

## Entendiendo v-bind

¿Cómo funciona exactamente la v-binddirectiva? Usamos esta directiva para vincular dinámicamente un atributo a una expresión. En este caso, el atributo es srcy la expresión es lo que esté entre comillas de ese atributo:"image"

````
<img v-bind:src="image"> <! -- src attribute bound to the image data -->
````

Si está pensando que esto no se ve como una expresión típica de JavaScript, puede imaginarlo así: v-bind:src="{{ image }}". Debajo del capó, Vue lo evaluará de la misma manera.


![Img 2 L3](https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F2.opt.1596481142404.jpg?alt=media&token=69b84372-5c8d-4b17-b468-f8500d5f8617)

## Un enlace reactivo

Debido al sistema de reactividad de Vue, si actualizamos nuestros imagedatos a una ruta que apunta a la imagen de nuestros calcetines azules ( image: './assets/images/socks_blue.jpg'), la expresión a la que srcestá vinculado nuestro atributo se actualizaría y nuestro navegador mostraría la imagen de los calcetines azules.

## Una abreviatura de v-bind

El uso v-bindes súper común, tan común que hay una forma abreviada para eso, y es solo los dos puntos, así:

````
<img :src="image"> 
````

Como puede imaginar, dado que hay tantos atributos HTML diferentes, hay muchos casos de uso para v-bind. Por ejemplo, puede vincular una descripción a un altatributo, vincular una URL a un href, vincular algunos estilos dinámicos a un atributo classo style, habilitar y deshabilitar un botón, etc.

![Img 3 L3](https://github.com/yllorca/intro-vue3/blob/L3-start/assets/images/v-bind.png?raw=true)


