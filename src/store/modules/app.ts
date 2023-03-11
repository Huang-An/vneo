import { store } from '@/store'
import { config } from '@/api/app'
import { defineStore } from 'pinia'
import { go } from '@/common/route'

import type { AppConfig } from '@/api/app/type'

export const useAppStore = defineStore({
  id: 'app',

  state: (): AppConfig => {
    return {
      version: '',
      tabActiveName: 'home',
      isCanArticlesPublish: false,
      isCanArticlesComment: false,
      isCanArticlesDetails: false
    }
  },

  getters: {
    getVersion: state => state.version,
    getTabActiveName: state => state.tabActiveName,
    getIsCanArticlesPublish: state => state.isCanArticlesPublish,
    getIsCanArticlesComment: state => state.isCanArticlesComment,
    getIsCanArticlesDetails: state => state.isCanArticlesDetails
  },

  actions: {
    // 设置 app 配置
    setAppConfig(config: AppConfig) {
      this.version = config.version
      this.tabActiveName = config.tabActiveName
      this.isCanArticlesPublish = config.isCanArticlesPublish
      this.isCanArticlesComment = config.isCanArticlesComment
      this.isCanArticlesDetails = config.isCanArticlesDetails
    },

    // 加载 app 配置
    async loadAppConfig() {
      const { data } = await config()

      this.setAppConfig(data || {})
    },

    setTabActiveName(tabActiveName: string) {
      this.tabActiveName = tabActiveName
    },

    async switchTab(tabActiveName: string) {
      await go(tabActiveName, 'switchTab')

      this.setTabActiveName(tabActiveName)
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
