<template>
  <div class="vneo-personal">
    <div class="vneo-personal__user">
      <image :src="userStore.getAvatar" mode="aspectFill" class="vneo-personal__user--avatar" />

      <div v-if="userStore.getUserId" class="vneo-personal__user--username">{{ userStore.getUserName }}</div>

      <div v-else class="vneo-personal__user--username" @click="goLogin">暂未登录，点击登录</div>
    </div>

    <nut-cell-group v-if="!appStore.isCheck" class="vneo-personal__menu">
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

    <nut-button v-if="userStore.getUserId" type="default" class="vneo-personal__loginout" @click="userStore.loginOut">
      退出登录
    </nut-button>
  </div>
</template>

<script setup lang="ts">
import './index.scss'

import { reactive } from 'vue'
import { go } from '@/common/route'
import { message } from '@/common/toast'
import { useAppStore } from '@/store/modules/app'
import { useUserStore } from '@/store/modules/user'

const appStore = useAppStore()
const userStore = useUserStore()

const menuList = reactive([
  { name: '我的文章', icon: 'category', to: 'personal-articles' },
  { name: '我的收藏', icon: 'star-n', to: 'personal-collect' },
  { name: '我的点赞', icon: 'heart1', to: 'personal-likes' },
  { name: '我的评论', icon: 'message', to: '' },
  { name: '编辑资料', icon: 'my', to: 'personal-update' },
  { name: '隐私协议', icon: 'marshalling', to: 'agreement-privacy' }
])

const goLogin = () => {
  if (!userStore.getUserId) {
    go('login')
  }
}

const openMenu = (name: string, to: string) => {
  if (!to) {
    message(`${name}正在开发中，尽情期待~`)
    return
  }

  go(to)
}
</script>
