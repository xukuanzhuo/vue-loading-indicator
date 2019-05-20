'use strict'

import { add, remove, has } from './util.js'

export default {
  namespaced: true,
  state: {
    loadingFor: []
  },
  getters: {
    is: state => loader => has(state.loadingFor, loader),
    any: state => state.loadingFor.length > 0,
  },
  actions: {
    start: ({ commit }, loader) => commit('START', loader),
    end: ({ commit }, loader) => commit('END', loader)
  },
  mutations: {
    ['START'](state, loader) {
      state.loadingFor = add(state.loadingFor, loader)
    },
    ['END'](state, loader) {
      state.loadingFor = remove(state.loadingFor, loader)
    }
  }
}
