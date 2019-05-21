'use strict'

import vuexStore from './store.js'
import install from './mixin.js'

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
        is: {
          cache: false,
          get: () => loader => store.getters[`${vuexModuleName}/is`](loader)
        },
        any: () => store.getters[`${vuexModuleName}/any`]
      }
    })
  }

  get any () {
    return this.stateHandler.any
  }

  dispatchAction (action, loader) {
    const { vuexModuleName } = this.options
    this.store.dispatch(`${vuexModuleName}/${action}`, loader)
  }

  start (loader) {
    this.dispatchAction('start', loader)
  }

  end (loader) {
    this.dispatchAction('end', loader)
  }

  is (loader) {
    return this.stateHandler.is(loader)
  }
}

Loader.install = install
