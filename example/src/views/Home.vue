<template>
  <div class="home">
    <div>
      <span v-if="$loader.is('getList')">getList loading</span>
      <span v-else>getList not loading</span>
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
    this.$store.dispatch('getList')

    setTimeout(()=> {
      this.$store.dispatch('getItem')
    }, 5000)
  }
}
</script>
