'use strict'

import { add, remove, has } from '../src/util'

test('array add function', () => {
  const arr = []
  expect(add(arr, 1)).toStrictEqual([1])
})

test('array remove function', () => {
  const arr = [1]
  expect(remove(arr, 1)).toStrictEqual([])
})

test('array has function', () => {
  const arr = [1]
  expect(has(arr, 1)).toBe(true)
  expect(has(arr, 2)).toBe(false)
})