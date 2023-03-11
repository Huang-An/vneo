import { store } from '@/store'
import { config } from '@/api/app'
import { defineStore } from 'pinia'
import { switchTabByName } from '@/common/route'

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

    switchTab(tabActiveName: string) {
      this.setTabActiveName(tabActiveName)

      switchTabByName(tabActiveName)
    },

    resetTab() {
      this.setTabActiveName('home')
    }
  }
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
