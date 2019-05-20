'use strict'

import vuexStore from './store.js'

export default class Loader {
  constructor(options = {}) {
    const defaults = {
      accessorName: '$loader',
      vuexModuleName: 'loader'
    }

    this.options = {
      ...defaults,
      ...options
    }
  }

  init (Vue, store) {
    if (this.initialized) {
      return
    }

    if (!store) {
      throw new Error('[vuex-loader] Vuex not initialized.')
    }

    const { vuexModuleName } = this.options
    this.store = store

    if (!store._modules.get([vuexModuleName])) {
      store.registerModule(vuexModuleName, vuexStore)
    }

    this.stateHandler = new Vue({
      computed: {
        is: () => loader => store.getters[`${vuexModuleName}/is`](loader),
        any: () => store.getters[`${vuexModuleName}/any`],
        percent: () => loader => store.getters[`${vuexModuleName}/percent`](loader)
      }
    })
  }
}

function install (Vue) {
  Vue.mixin({
    beforeCreate () {
      const { loader, store, parent } = this.$options
      let instance = null
      if (loader) {
        instance = loader
        instance.init(Vue, store)
      } else if (parent && parent._$loader) {
        instance = parent._$loader
        instance.init(Vue, parent.$store)
      }

      if (instance) {
        this._$loader = instance
        this[instance.options.accessorName] = instance
      }
    }
  })

  install.installed = true
}

Loader.install = install
