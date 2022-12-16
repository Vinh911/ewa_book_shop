<script>
export default {
  props: ['cartItem', 'index']
}
</script>

<template>
    <td>{{ index }}</td>
    <td>{{ cartItem[0] }}</td>
    <td>{{ cartItem[1] }}</td>
    <td>{{ cartItem[0] * cartItem[1] }}</td>
</template>

<style>

</style>