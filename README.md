# Vuex action's loadidng Management

## Install
```bash
npm install vue-loading-indicator
# or
yarn add vue-loading-indicator
```

## Usage

### 1. require
> work with `vue` && `vuex`

```js
import store from './store'
import Loader from 'vue-loading-indicator'

Vue.use(Loader)
new Vue({
  store,
  loader: new Loader()
})
```

### 2. use in component
```html
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
  }
}
</script>
```

## Features

 ### `.is(loader: string)`
 > params `loader` is action name in vuex store, return `boolean` value whether action is pending.

 ```html
 <template>
  <div>
    <span v-if="$loader.is('getList')">getList laoding</span>
  </div>
</template>
 ```

 ### `.any`
 > return `boolean` value if any store action is pending

```html
<template>
  <div>
    <span v-if="$loader.any">any laoding</span>
  </div>
</template>
```