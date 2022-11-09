import { store } from '@/store'
import { login } from '@/api/user'
import { defineStore } from 'pinia'
import { getUserProfile } from '@tarojs/taro'
import { redirectToByName, switchTabByName } from '@/common/route'
import { getMultiStorage, setMultiStorage, removeMultiStorage } from '@/common/helper'

import type { LoginResponse as UserInfo } from '@/api/user/type'

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
      const { userInfo } = await getUserProfile({ desc: '登录' })

      const { data } = await login({
        avatar: userInfo.avatarUrl,
        userName: userInfo.nickName
      })

      this.setUserInfo(data)

      switchTabByName('home')
    },

    loginOut() {
      this.removeUserInfo()

      redirectToByName('login')
    }
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
