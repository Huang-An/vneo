import { store } from '@/store'
import { go } from '@/common/route'
import { defineStore } from 'pinia'
import { success } from '@/common/toast'
import { useAppStoreWithOut } from './app'
import { DEFAULT_AVATAR } from '@/constant'
import { login, register, update } from '@/api/user'
import { showModal, navigateBack } from '@tarojs/taro'
import { getMultiStorage, setMultiStorage, removeMultiStorage } from '@/common/helper'

import type { UserInfo, RegisterParams, UpdateParams } from '@/api/user/type'

export const useUserStore = defineStore({
  id: 'user',

  state: (): UserInfo => getMultiStorage<UserInfo>(['userId', 'avatar', 'userName']),

  getters: {
    getUserId: state => state.userId,
    getAvatar: state => state.avatar || DEFAULT_AVATAR,
    getUserName: state => state.userName
  },

  actions: {
    setUserInfo(userInfo: UserInfo) {
      this.userId = userInfo.userId
      this.avatar = userInfo.avatar
      this.userName = userInfo.userName

      setMultiStorage(userInfo)
    },

    removeUserInfo() {
      this.userId = ''
      this.avatar = ''
      this.userName = ''

      removeMultiStorage(['userId', 'avatar', 'userName'])
    },

    async login() {
      const { data } = await login()

      // 查不到用户信息，前去注册
      if (data.total === 0) {
        go('register')
        return
      }

      this.setUserInfo(data.items[0])

      // 进入首页
      useAppStoreWithOut().goHome()
    },

    // 注册
    async register(params: RegisterParams) {
      const { data } = await register(params)

      // 设置用户信息
      this.setUserInfo(data)

      // 进入首页
      useAppStoreWithOut().goHome()
    },

    // 更新
    async update(params: UpdateParams) {
      const { data } = await update(params)

      // 设置用户信息
      this.setUserInfo(data)

      // 返回上一页
      navigateBack()
    },

    async loginOut() {
      const { confirm } = await showModal({
        title: '提示',
        content: '是否退出登录？'
      })

      if (!confirm) return

      this.removeUserInfo()

      success('退出登录成功~')
    }
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
