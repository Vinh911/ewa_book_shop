<script>
import BookItem from '../components/BookItem.vue'

const API_URL = `https://ivm108.informatik.htw-dresden.de/ewa/g02/index.php`

export default {
  components: {BookItem},
  data: () => ({
    books: null
  }),
  created() {
    // fetch on init
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.books = await (await fetch(`${API_URL}`)).json()
    }
  }
}
</script>

<template>
  <div class="shop">
    <h1>This is the shop page</h1>
    <ul>
      <li v-for="book in books">
          <BookItem :book="book"/>
      </li>
    </ul>

  </div>
</template>

<style>
ul li {
  list-style: none;
}
</style>