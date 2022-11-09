import { store } from '@/store'
import { defineStore } from 'pinia'
import { switchTabByName } from '@/common/route'

export const useAppStore = defineStore({
  id: 'app',

  state: () => {
    return {
      tabActiveName: 'home'
    }
  },

  getters: {
    getTabActiveName: state => state.tabActiveName
  },

  actions: {
    setTabActiveName(tabActiveName: string) {
      this.tabActiveName = tabActiveName
    },

    switchTab(tabActiveName: string) {
      this.setTabActiveName(tabActiveName)

      switchTabByName(tabActiveName)
    }
  }
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
