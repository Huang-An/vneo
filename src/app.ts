import { createApp } from 'vue'
import { setupApp } from './setup'
import { cloud } from '@tarojs/taro'

import './assets/styles/index.scss'

const App = createApp({
  onLaunch() {
    cloud.init({ traceUser: true })
  }
})

setupApp(App)

export default App
