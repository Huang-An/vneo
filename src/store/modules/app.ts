import { store } from '@/store'
import { config } from '@/api/app'
import { defineStore } from 'pinia'
import { go } from '@/common/route'
import { getCurrentInstance, eventCenter } from '@tarojs/taro'

import type { AppConfig } from '@/api/app/type'

export const useAppStore = defineStore({
  id: 'app',

  state: (): AppConfig => {
    return {
      version: '1.0.6',
      tabActiveName: 'home',
      privatePathList: ['articles-publish', 'articles-detail']
    }
  },

  getters: {
    getVersion: state => state.version,
    getTabActiveName: state => state.tabActiveName,
    getPrivatePathList: state => state.privatePathList
  },

  actions: {
    // 设置 app 配置
    setAppConfig(config: AppConfig) {
      this.version = config.version
      this.tabActiveName = config.tabActiveName
      this.privatePathList = config.privatePathList
    },

    // 加载 app 配置
    async loadAppConfig() {
      const { data } = await config()

      this.setAppConfig(data || {})

      // 触发 onLoadAppConfig
      const currentRoute = getCurrentInstance().router
      currentRoute && eventCenter.trigger(`${currentRoute.path}.onLoadAppConfig`)
    },

    async switchTab(tabActiveName: string) {
      await go(tabActiveName, 'switchTab')

      this.tabActiveName = tabActiveName
    },

    // 前往首页
    goHome() {
      this.switchTab('home')
    }
  }
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
