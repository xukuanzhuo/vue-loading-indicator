<template>
  <div class="home">
    <div>
      <span v-if="$loader.is('get')">loader loading</span>
      <span v-else>loader not loading</span>
    </div>

    <div>
      <span v-if="$loader.any">any laoding</span>
      <span v-else>without any laoding</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  created () {
    this.$loader.start('get')
    setTimeout(() => {
      this.$loader.end('get')
    }, 3000)
  }
}
</script>
