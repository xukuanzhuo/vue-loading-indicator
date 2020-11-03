import { isPromise } from './util'

export default function install(Vue) {
  Vue.mixin({
    beforeCreate: [
      function initLoader () {
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
      },
      initDispatch
    ]
  })

  install.installed = true
}

function initDispatch () {
  const { store } = this.$options

  if (store) {
    const vuexModuleName = 'loader'
    const _dispatch = store.dispatch

    store.dispatch = function (type, payload) {
      const cxt = this

      _dispatch.call(this, `${vuexModuleName}/start`, type)

      const ret = _dispatch.call(cxt, type, payload)

      if (isPromise(ret)) {
        return new Promise((resolve, reject) => {
          ret.then((response) => {
            _dispatch.call(cxt, `${vuexModuleName}/end`, type)
            resolve(response)
          }).catch((error) => {
            _dispatch.call(cxt, `${vuexModuleName}/end`, type)
            reject(error)
          })
        })
      } else {
        return ret
      }
    }
  }
}