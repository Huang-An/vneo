import { createApp } from 'vue'
import { setupApp } from './setup'
import { cloud } from '@tarojs/taro'
import { useAppStore } from '@/store/modules/app'

import './assets/styles/index.scss'

const App = createApp({
  onLaunch() {
    cloud.init({
      env: process.env.CLOUD_ENV,
      traceUser: true
    })

    // 加载 app 配置
    useAppStore().loadAppConfig()
  }
})

setupApp(App)

export default App
