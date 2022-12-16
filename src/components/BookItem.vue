<script>
  export default {
    props: ['book'],
    data: () => ({
      quantity: 0,
      price: 0
    }),
    created() {
      this.price = this.getPrice(this.book.priceBeforeTax, this.book.taxRate)
    },
    methods: {
      getPrice(price, taxRate){
        price = parseFloat(price)
        taxRate = parseFloat(taxRate)
        let priceWithTax = (price  / 100) * (taxRate + 100)
        return  priceWithTax.toFixed(2)
      }
    }
  }
</script>

<template>
  <div class="bookItem">
    <span>Titel: {{ book.title }}</span><br>
    <span>Autor: {{ book.author }}</span><br>
    <span>Verlag: {{ book.publisher }}</span><br>
    <span>Beschreibung: {{ book.description }}</span><br>
    <span>Bestand: {{ book.stock }}</span><br>
    <span>Preis: {{ price }}</span>
    <div>
      <button @click="quantity++">+</button>
      <span>{{ quantity }}</span>
      <button  @click="quantity <= 0 ? null : quantity--">-</button>
      <button @click="$emit('addToCart', book.title, quantity, price)">add to cart</button>
    </div>
  </div>
</template>

<style>
.bookItem {
  padding: 10px;
  border-bottom: 1px solid black;
}
button {
  min-width: 75px;
  margin: 5px;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px;
}
</style>