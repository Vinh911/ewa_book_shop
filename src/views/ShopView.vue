<script>
    const API_URL = `https://ivm108.informatik.htw-dresden.de/ewa/g02/index.php`

    export default {
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
            <li v-for="{ProduktID, Produkttitel} in books">
                <p>{{ ProduktID }}</p>
                <p>{{ Produkttitel }}</p>
            </li>
        </ul>

    </div>
</template>
  
<style>
</style>