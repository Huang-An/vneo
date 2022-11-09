import { setupGuard } from '@/common/guard'
import { setupRegisterStore } from '@/store'
import { setupRegisterComponent } from '@/components'

import type { App } from 'vue'

/**
 * 启动 APP 全局注册
 * @param app
 */
export const setupApp = async (app: App) => {
  setupGuard()
  setupRegisterStore(app)
  setupRegisterComponent(app)
}
