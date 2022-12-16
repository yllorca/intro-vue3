const app = Vue.createApp({
    data() {
        return {
            cart: [],
            premium: true
        }
    },
    methods: {
      UpdateCart(id) {
        this.cart.push(id)
      }
    }
})
