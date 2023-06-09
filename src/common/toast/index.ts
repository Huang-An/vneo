import Taro from '@tarojs/taro'

let loadingCount: number = 0

export const success = (message = '成功', duration: number = 1500) => {
  Taro.showToast({
    title: message,
    icon: 'success',
    duration
  })
}

export const fail = (message = '错误', duration: number = 1500) => {
  Taro.showToast({
    title: message,
    icon: 'error',
    duration
  })
}

export const message = (message: string, duration: number = 1500) => {
  Taro.showToast({
    title: message,
    icon: 'none',
    duration
  })
}

export function showLoading(isLoading: boolean = true, message = '正在加载...') {
  if (isLoading) {
    Taro.showLoading({
      mask: true,
      title: message
    })
  }

  // 记录 调用 loading 次数 避免多次请求时，提前取消 loading
  loadingCount++
}

export const hideLoading = () => {
  if (loadingCount > 0) loadingCount--

  loadingCount === 0 && Taro.hideLoading()
}
