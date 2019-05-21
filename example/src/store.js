import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    getList: async function ({ commit }) {
      await new Promise(function (resolve, reject) {
        setTimeout(() => {
          resolve()
        }, 3000)
      })
    },
    getItem: function ({ commit }) {
      console.log('invoke getItem')
    }
  }
})
