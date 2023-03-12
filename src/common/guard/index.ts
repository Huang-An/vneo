import { routes } from '@/common/route'
import { setupPermissionGuard } from './permission'
import { eventCenter, getCurrentInstance } from '@tarojs/taro'

export const setupGuard = () => {
  routes.forEach(route => {
    // 页面显示时触发
    const onShowEvent = `${route.path}.onShow`

    eventCenter.on(onShowEvent, () => {
      const currentRouter = getCurrentInstance().router

      const path = currentRouter?.path || ''

      setupPermissionGuard(path)
    })
  })
}
