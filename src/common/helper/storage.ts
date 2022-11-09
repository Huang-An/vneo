import { APP_GLOBAL_NAME } from '@/constant'
import { isArray, isObject } from '@const-an/helper-core'
import { setStorageSync, getStorageSync, removeStorageSync } from '@tarojs/taro'

/**
 * 设置单个 localStorage
 */
export const setStorage = (key: string, value: any) => {
  if (isArray(value) || isObject(value)) {
    setStorageSync(`${APP_GLOBAL_NAME}-${key}`, JSON.stringify(value))
  } else {
    setStorageSync(`${APP_GLOBAL_NAME}-${key}`, <string>value)
  }
}

/**
 * 获取单个 localStorage
 */
export const getStorage = <R = any>(key: string) => {
  const value = getStorageSync(`${APP_GLOBAL_NAME}-${key}`)

  let result = null

  if (value) {
    try {
      result = JSON.parse(value)
    } catch {
      result = value
    }
  } else {
    result = value
  }

  return result as R
}

/**
 * 清除单个 localStorage
 */
export const removeStorage = (key: string) => {
  removeStorageSync(`${APP_GLOBAL_NAME}-${key}`)
}

/**
 * 设置多个 localStorage
 */
export const setMultiStorage = (map: { [k: string]: any }) => {
  Object.keys(map).forEach((key: string) => setStorage(key, map[key]))
}

/**
 * 获取多个 localStorage
 */
export const getMultiStorage = <R = { [k: string]: any }>(array: (keyof R)[]) => {
  const map: R = {} as R

  array.forEach(key => (map[key] = getStorage(key as string)))

  return map
}

/**
 * 清除多个 localStorage
 */
export const removeMultiStorage = (array: string[]) => {
  array.forEach((key: string) => removeStorage(key))
}
