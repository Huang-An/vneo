import { setupRegisterGlobalComponent } from './common'
import { Icon, Popup, OverLay, Swiper, SwiperItem, Sticky } from '@nutui/nutui-taro'

import type { App } from 'vue'

/**
 * 注册 Icon
 * @param app
 */
const setupRegisterGlobalNutui = (app: App) => {
  app.use(Icon)
  app.use(Popup)
  app.use(OverLay)
  app.use(Swiper)
  app.use(SwiperItem)
  app.use(Sticky)
}

/**
 * 启动注册组件
 * @param app
 */
export const setupRegisterComponent = (app: App) => {
  setupRegisterGlobalNutui(app)
  setupRegisterGlobalComponent(app)
}
