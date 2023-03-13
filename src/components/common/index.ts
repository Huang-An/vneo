import VneoEmpty from './vneo-empty/index.vue'
import VneoScroll from './vneo-scroll/index.vue'
import VneoSelect from './vneo-select/index.vue'
import VneoUploader from './vneo-uploader/index.vue'

import type { App } from 'vue'

/**
 * 启动注册全局组件
 * @param app
 */
export const setupRegisterGlobalComponent = (app: App) => {
  app.component(VneoEmpty.name, VneoEmpty)
  app.component(VneoScroll.name, VneoScroll)
  app.component(VneoSelect.name, VneoSelect)
  app.component(VneoUploader.name, VneoUploader)
}
