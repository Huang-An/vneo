import { store } from '@/store'
import { defineStore } from 'pinia'
import { useAppStoreWithOut } from './app'
import { navigateBack } from '@tarojs/taro'
import { login, addOrUpdate } from '@/api/user'
import { redirectToByName, switchTabByName, navigateToByName } from '@/common/route'
import { getMultiStorage, setMultiStorage, removeMultiStorage } from '@/common/helper'

import type { UserInfo, AddOrUpdateParams } from '@/api/user/type'

export const useUserStore = defineStore({
  id: 'user',

  state: (): UserInfo => getMultiStorage<UserInfo>(['userId', 'avatar', 'userName']),

  getters: {
    getUserId: state => state.userId,
    getAvatar: state => state.avatar,
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
        navigateToByName('personal-update')
        return
      }

      // 进入首页
      this.setUserInfo(data.items[0])
      switchTabByName('home')
    },

    // 添加或更新用户信息
    async addOrUpdate(params: AddOrUpdateParams) {
      const { data } = await addOrUpdate(params)

      // 设置用户信息
      this.setUserInfo(data)

      // 返回上一页
      navigateBack()
    },

    loginOut() {
      this.removeUserInfo()

      redirectToByName('login')

      // 重置 tab
      useAppStoreWithOut().resetTab()
    }
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
