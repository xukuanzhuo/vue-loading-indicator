import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Loader } from 'vuex-loader'

Vue.config.productionTip = false
Vue.use(Loader)

new Vue({
  router,
  store,
  loader: new Loader(),
  render: h => h(App)
}).$mount('#app')
