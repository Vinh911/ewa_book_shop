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
      },
      getImg(bookImage){
        return "https://ivm108.informatik.htw-dresden.de/ewa/g02/resources/"+bookImage
      }
    }
  }
</script>

<template>
  <div class="bookItem">
    <div class="imgContainer">
      <img :alt=book.img :src=getImg(book.img)>
    </div>
    <div class="info">
      <span>Titel: {{ book.title }}</span><br>
      <span>Autor: {{ book.author }}</span><br>
      <span>Verlag: {{ book.publisher }}</span><br>
      <span>Beschreibung: {{ book.description }}</span><br>
      <span>Bestand: {{ book.stock }}</span><br>
      <span>Preis: {{ price }}</span>
    </div>
    <div class="buttonRow">
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

@media (max-width: 768px) {
  .bookItem {
    display: flex;
    flex-direction: column;
  }
  .info {
    display: flex;
    width: 100% !important;
  }
  .info span {
    width: 100%;
    text-align: justify;
  }
  .imgContainer {
    width: 100% !important;
  }
  .buttonRow {
    display: flex;
    text-align: center !important;
  }
}

.info {
  display: inline-block;
  width: 50%;
}

.imgContainer {
  display: inline-block;
  width: 50%;
}

.imgContainer img {
  max-height: 200px;
  margin-left: 75px;
}

.buttonRow {
  display: inline-block;
  width: 100%;
  text-align: right;
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