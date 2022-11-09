import { routes } from '@/common/route'
import { setupPermissionGuard } from './permission'
import { eventCenter, getCurrentInstance } from '@tarojs/taro'

export const setupGuard = () => {
  routes.forEach(route => {
    const eventName = `${route.path}.onShow`

    eventCenter.on(eventName, () => {
      const instance = getCurrentInstance()
      const path = instance.router?.path || ''

      setupPermissionGuard(path)
    })
  })
}
