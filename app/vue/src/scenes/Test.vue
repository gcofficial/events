<template>
  <div class="test">
    test
  </div>
</template>

<script>
import store from '../store'

export default {
  name: 'lf-events',
  store,
  async mounted() {
    console.log(this)
  }
}
</script>

<style scoped>
  .test{
    color: red;
  }
</style>
