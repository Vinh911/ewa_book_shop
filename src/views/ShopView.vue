<script>
import {ref} from "vue";
import BookItem from '../components/BookItem.vue';
import CartItem from "../components/CartItem.vue";

const API_URL = `https://ivm108.informatik.htw-dresden.de/ewa/g02/index.php`

export default {
  components: {CartItem, BookItem},
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
    addToCart(title, quantity, price) {

      if(this.cart[title]) {
        this.cart[title] = [this.cart[title][0] + quantity, price]
      } else {
        this.cart[title] = [quantity, price]
      }
    },
    getCartTotal(cart) {
      // get total amount of items in cart
      let total = 0
      for (const [key, value] of Object.entries(cart)) {
        total += value[0]
      }
      return total
    },
    getCartTotalPrice(cart) {
      let total = 0
      for (const [key, value] of Object.entries(cart)) {
        total += value[0] * value[1]
      }
      // round to 2 decimal places
      return total.toFixed(2)
    }
  }
}

</script>

<template>
  <div class="shop">
    <h1>This is the shop page</h1>
    <table class="shop-items">
      <tr v-for="book in books">
          <BookItem :book="book" @addToCart="(title, quantity, price) => addToCart(title, quantity, price)"/>
      </tr>
    </table>
    <table>
      <tr>
        <td>Artikelname</td>
        <td>Anzahl</td>
        <td>Preis</td>
        <td>Gesamtpreis</td>
      </tr>
      <tr v-if="Object.keys(cart).length > 0" v-for="(item, index) in cart">
        <CartItem :cartItem="item" :index="index"/>
      </tr>
      <tr>
        <td>Total: {{ getCartTotal(cart) }}</td>
        <td></td>
        <td></td>
        <td>{{ getCartTotalPrice(cart) }}</td>
      </tr>
    </table>
  </div>
</template>

<style>
.shop {
  padding: 10px;
}
</style>