import { createPinia } from 'pinia'

import type { App } from 'vue'

export const store = createPinia()

/**
 * 启动注册 store
 * @param app
 */
export const setupRegisterStore = (app: App) => {
  app.use(store)
}
