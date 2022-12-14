<script>
import BookItem from '../components/BookItem.vue'
import {ref} from "vue";

const API_URL = `https://ivm108.informatik.htw-dresden.de/ewa/g02/index.php`
const cart = ref({})

export default {
  components: {BookItem},
  data: () => ({
    books: null
  }),
  created() {
    // fetch on init
    this.fetchData()
  },
  watch: {
    cart() {
      console.log(cart)
    }
  },
  methods: {
    async fetchData() {
      this.books = await (await fetch(`${API_URL}`)).json()
    },
    addToBasket(title, quantity) {
      if (cart.value[title]) {
        cart.value[title] += quantity
      } else {
        cart.value[title] = quantity
      }
      console.log(cart.value)
    }
  }
}
</script>

<template>
  <div class="shop">
    <h1>This is the shop page</h1>
    <ul>
      <li v-for="book in books">
          <BookItem :book="book" @addToBasket="(b, c) => addToBasket(b, c)"/>
      </li>
    </ul>
  </div>
</template>

<style>
ul li {
  list-style: none;
}
</style>