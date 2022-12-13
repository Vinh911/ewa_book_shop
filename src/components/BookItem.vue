<script>
  export default {
    props: ['book'],
    data: () => ({
      quantity: 0
    }),
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
    <span>Preis: {{ getPrice(book.priceBeforeTax, book.taxRate) }}</span>
    <div>
      <button @click="quantity++">+</button>
      <span>{{ quantity }}</span>
      <button  @click="quantity <= 0 ? null : quantity--">-</button>
      <button>add to basket</button>
    </div>
  </div>
</template>

<style>
.bookItem {
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
}
button {
  min-width: 50px;
  margin: 5px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px;
}
</style>