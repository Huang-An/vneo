import { store } from '@/store'
import { config } from '@/api/app'
import { defineStore } from 'pinia'
import { go } from '@/common/route'
import { getCurrentInstance, eventCenter } from '@tarojs/taro'

import type { AppConfigResponse } from '@/api/app/type'

export const useAppStore = defineStore({
  id: 'app',

  state: (): AppConfigResponse => {
    return {
      isCheck: true,
      version: '1.0.7',
      tabActiveName: 'home'
    }
  },

  getters: {
    getIsCheck: state => state.isCheck,
    getVersion: state => state.version,
    getTabActiveName: state => state.tabActiveName
  },

  actions: {
    // 设置 app 配置
    setAppConfig(config: AppConfigResponse) {
      this.isCheck = config.isCheck
      this.version = config.version
      this.tabActiveName = config.tabActiveName
    },

    // 加载 app 配置
    async loadAppConfig() {
      const { data } = await config({ version: this.version })

      this.setAppConfig(data || {})

      // 重新触发 onShow
      const currentRoute = getCurrentInstance().router
      currentRoute && eventCenter.trigger(currentRoute.onShow)
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
