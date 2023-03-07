import { createApp } from 'vue'
import { setupApp } from './setup'
import { cloud } from '@tarojs/taro'

import './assets/styles/index.scss'

const App = createApp({
  onLaunch() {
    cloud.init({
      env: process.env.CLOUD_ENV,
      traceUser: true
    })
  }
})

setupApp(App)

export default App
