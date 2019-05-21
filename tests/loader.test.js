'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import Loader from '../src/loader'

describe('loader in vue instacnce', () => {
  Vue.use(Vuex)
  const store = new Vuex.Store({
    actions: {
      getList: async function ({ commit }) {
        await new Promise(function (resolve, reject) {
          setTimeout(() => {
            resolve()
          }, 3000)
        })
      }
    }
  })

  Vue.config.productionTip = false
  Vue.use(Loader)

  const vm = new Vue({
    store,
    loader: new Loader()
  })
  
  test('$loader.is(actionName) return default false', () => {
    expect(vm.$loader.is('getList')).toBe(false)
  })

  test('invoke store.dispatch $loader.is(actionName) return true', () => {
    vm.$store.dispatch('getList')
    expect(vm.$loader.is('getList')).toBe(true)
  })

  test('store.dispatch resolved $loader.is(actionName) return false', async () => {
    await vm.$store.dispatch('getList')
    expect(vm.$loader.is('getList')).toBe(false)
  })
})
