import { computed } from 'vue'
import { PRIVATE_USER_NAME, DEFAULT_AVATAR } from '@/constant'

import type { Ref } from 'vue'
import type { Data } from './type'

export default (currentData: Ref<Data>) => {
  // 用户名称
  const userName = computed(() => (currentData.value.isPrivate ? PRIVATE_USER_NAME : currentData.value.userName))

  // 头像
  const avatar = computed(() => (currentData.value.isPrivate ? DEFAULT_AVATAR : currentData.value.avatar))

  return { userName, avatar }
}
