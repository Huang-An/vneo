<template>
  <div class="vneo-personal">
    <div class="vneo-personal__user">
      <image :src="store.getAvatar" mode="aspectFill" class="vneo-personal__user--avatar" />

      <div class="vneo-personal__user--username">{{ store.getUserName }}</div>
    </div>

    <nut-cell-group class="vneo-personal__menu">
      <nut-cell
        v-for="(item, index) in menuList"
        center
        is-link
        :key="index"
        :icon="item.icon"
        :title="item.name"
        @click="openMenu(item.name, item.to)"
      />
    </nut-cell-group>

    <nut-button type="default" class="vneo-personal__loginout" @click="loginOut">退出登录</nut-button>
  </div>
</template>

<script setup lang="ts">
import './index.scss'

import { reactive } from 'vue'
import { showModal } from '@tarojs/taro'
import { message } from '@/common/toast'
import { navigateToByName } from '@/common/route'
import { useUserStore } from '@/store/modules/user'

const store = useUserStore()

const menuList = reactive([
  { name: '我的文章', icon: 'category', to: 'personal-articles' },
  { name: '我的收藏', icon: 'star-n', to: '' },
  { name: '我的点赞', icon: 'heart1', to: '' },
  { name: '我的评论', icon: 'message', to: '' },
  { name: '编辑资料', icon: 'my', to: '' },
  { name: '隐私协议', icon: 'marshalling', to: 'agreement-privacy' }
])

const loginOut = async () => {
  const { confirm } = await showModal({
    title: '提示',
    content: '是否退出登录？'
  })

  confirm && store.loginOut()
}

const openMenu = (name: string, to: string) => {
  if (!to) {
    message(`${name}正在开发中，尽情期待~`)
    return
  }

  navigateToByName(to)
}
</script>
