<script>
import BookItem from '../components/BookItem.vue'
import {ref} from "vue";

const API_URL = `https://ivm108.informatik.htw-dresden.de/ewa/g02/index.php`

export default {
  components: {BookItem},
  data: () => ({
    books: null,
    cart: ref({}),
  }),
  created() {
    // fetch on init
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.books = await (await fetch(`${API_URL}`)).json()
    },
    addToCart(title, quantity) {
      if(this.cart[title]) {
        this.cart[title] += quantity
      } else {
        this.cart[title] = quantity
      }
    },
    getCartTotal(cart) {
      return Object.values(cart).reduce((a, b) => a + b, 0)
    }
  }
}

</script>

<template>
  <div class="shop">
    <h1>This is the shop page</h1>
    <ul class="shop-items">
      <li v-for="book in books">
          <BookItem :book="book" @addToCart="(title, quantity) => addToCart(title, quantity)"/>
      </li>
    </ul>
    <ul v-if="Object.keys(cart).length > 0">
      <li v-for="(quantity, title) in cart">
        {{ title }}: {{ quantity }}
      </li>
      <li>Total: {{ getCartTotal(cart) }}</li>
      //calculate total price
      <li>Price: </li>
    </ul>
  </div>
</template>

<style>
ul li {
  list-style: none;
}
</style>