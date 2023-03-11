import { setupRegisterGlobalComponent } from './common'
import {
  Icon,
  Tabs,
  Cell,
  Input,
  Popup,
  Button,
  Tabbar,
  Sticky,
  Swiper,
  Picker,
  OverLay,
  TabPane,
  TextArea,
  Checkbox,
  CellGroup,
  SwiperItem,
  TabbarItem,
  ActionSheet
} from '@nutui/nutui-taro'

import type { App } from 'vue'

/**
 * 注册 Nutui
 * @param app
 */
const setupRegisterGlobalNutui = (app: App) => {
  app.use(Icon)
  app.use(Cell)
  app.use(Tabs)
  app.use(Input)
  app.use(Popup)
  app.use(Sticky)
  app.use(Tabbar)
  app.use(Button)
  app.use(Picker)
  app.use(Swiper)
  app.use(OverLay)
  app.use(TabPane)
  app.use(TextArea)
  app.use(Checkbox)
  app.use(CellGroup)
  app.use(SwiperItem)
  app.use(TabbarItem)
  app.use(ActionSheet)
}

/**
 * 启动注册组件
 * @param app
 */
export const setupRegisterComponent = (app: App) => {
  setupRegisterGlobalNutui(app)
  setupRegisterGlobalComponent(app)
}
