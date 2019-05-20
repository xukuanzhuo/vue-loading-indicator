'use strict'

export function add (arr, loader) {
  let loaders = new Set(arr)
  if (!loaders.has(loader)) {
    loaders.add(loader)
  }

  return Array.from(loaders)
}

export function remove (arr, loader) {
  let loaders = new Set(arr)
  loaders.delete(loader)

  return Array.from(loaders)
}

export function has (arr, loader) {
  return new Set(arr).has(loader)
}
