import { routes } from '@/common/route'
import { setupPermissionGuard } from './permission'
import { eventCenter, getCurrentInstance } from '@tarojs/taro'

export const setupGuard = () => {
  const guards = () => {
    const currentRouter = getCurrentInstance().router

    const path = currentRouter?.path || ''

    setupPermissionGuard(path)
  }

  routes.forEach(route => {
    // 页面显示时触发
    const onShowEvent = `${route.path}.onShow`

    // 加载app配置后触发
    const onLoadAppConfigEvent = `/${route.path}.onLoadAppConfig`

    eventCenter.on(onShowEvent, () => guards())
    eventCenter.on(onLoadAppConfigEvent, () => guards())
  })
}
