<script>
import {ref} from "vue";
import BookItem from '../components/BookItem.vue';
import CartItem from "../components/CartItem.vue";

const API_URL = `https://ivm108.informatik.htw-dresden.de/ewa/g02/resources/index.php`
const CHECKOUT_URL = `/ewa/g02/resources/create-checkout-session.php`

export default {
  components: {CartItem, BookItem},
  data: () => ({
    search: '',
    books: null,
    cart: ref({}),
    checkout: [],
  }),
  created() {
    // fetch on init
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.books = await (await fetch(`${API_URL}`)).json()
    },
    addToCart(title, quantity, price, priceId) {
      if(this.cart[title]) {
        this.cart[title] = [this.cart[title][0] + quantity, price, priceId]
      } else {
        this.cart[title] = [quantity, price, priceId]
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
    },
    handlePayment(cart){

      //check if cart is empty
      if(Object.keys(cart).length === 0){
        alert("Warenkorb ist leer!")
      }
      // display every cart item and quantity in console
      for (const [key, value] of Object.entries(cart)) {
        this.checkout.push([value[0], value[2]]);
      }
      // send checkout to backend
      fetch(`${CHECKOUT_URL}`, {
        method: 'POST',
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.checkout)
      })
    }
  },
  computed: {
    filteredBooks() {
      if(this.books){
        return this.books.filter(book => {
          return book.title.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    }
  }
}

</script>

<template>
  <div class="shop">
    <input id="search" type="text" v-model="search" placeholder="Search for a book" />
    <table class="items">
      <tr v-for="book in filteredBooks">
          <BookItem :book="book" @addToCart="(title, quantity, price, priceId) => addToCart(title, quantity, price, priceId)"/>
      </tr>
    </table>
    <table class="cart">
      <tr>
        <td>Artikelname</td>
        <td>Anzahl</td>
        <td>Preis</td>
        <td>Gesamtpreis</td>
      </tr>
      <tr v-if="Object.keys(cart).length > 0" v-for="(item, index) in cart">
        <CartItem :cartItem="item" :index="index"/>
      </tr>
      <tr class="cartSummary">
        <td>Total: {{ getCartTotal(cart) }}</td>
        <td></td>
        <td></td>
        <td>{{ getCartTotalPrice(cart) }}</td>
      </tr>
      <tr><td colspan="4"><button id="orderButton" @click="handlePayment(cart)">Bestellen</button></td></tr>
    </table>
  </div>
</template>

<style>
.shop {
  padding: 10px;
  width: 100%;
}
#search {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}
.items {
  width: 100%;
}
.cart {
  width: 100%;
}
.cartSummary td {
  border-top: 1px solid black;
  font-weight: bold;
}
#orderButton {
  width: 100%;
  height: 50px;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px;
}
</style>