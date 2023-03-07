import Taro from '@tarojs/taro'

let loadingCount: number = 0

export const success = (message = '成功') => {
  Taro.showToast({
    title: message,
    icon: 'success'
  })
}

export const fail = (message = '错误') => {
  Taro.showToast({
    title: message,
    icon: 'error'
  })
}

export const message = (message: string) => {
  Taro.showToast({
    title: message,
    icon: 'none'
  })
}

export function showLoading(isLoading: boolean, message = '') {
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
