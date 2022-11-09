import { createPageList, createTabbarList } from './common/route/routes'

export default defineAppConfig({
  pages: createPageList(),

  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'vneo',
    navigationBarTextStyle: 'black'
  },

  tabBar: {
    custom: true,
    list: createTabbarList()
  },

  usingComponents: {}
})
