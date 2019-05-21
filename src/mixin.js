export default function install (Vue) {
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
    const { vuexModuleName } = this.$loader.options
    const _dispatch = store.dispatch

    store.dispatch = async function (type, payload) {
      _dispatch.call(this, `${vuexModuleName}/start`, payload)
      let returnVal = await _dispatch.call(this, type , payload)
      _dispatch.call(this, `${vuexModuleName}/end`, payload)
      return returnVal
    }
  }
}
