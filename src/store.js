'use strict'

export default {
  namespaced: true,
  state: {
    loadingFor: [],
    progresses: {}
  },
  getters: {
    is: state => loader => true,
    any: state => true,
    percent: state => loader => true
  },
  actions: {
    start: ({ commit }, loader) => commit('START', loader),
    end: ({ commit }, loader) => commit('END', loader),
    progress: ({ commit }, progress) => commit('PROGRESS', progress)
  },
  mutations: {
    ['START'](state, loader) {
    },
    ['END'](state, loader) {
    },
    ['PROGRESS'](state, { waiter, current, total }) {
    }
  }
}
