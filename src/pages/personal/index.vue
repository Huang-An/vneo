<template>
  <div class="vneo-personal">
    <div class="vneo-personal__user">
      <image :src="store.getAvatar" mode="aspectFill" class="vneo-personal__user--avatar" />

      <div class="vneo-personal__user--username">{{ store.getUserName }}</div>
    </div>

    <nut-cell-group class="vneo-personal__menu">
      <nut-cell center is-link title="我的收藏" icon="star-n" />
      <nut-cell center is-link title="我的点赞" icon="heart1" />
      <nut-cell center is-link title="我的评论" icon="message" />
      <nut-cell center is-link title="隐私协议" icon="marshalling" />
    </nut-cell-group>

    <nut-button type="default" class="vneo-personal__loginout" @click="loginOut">退出登录</nut-button>
  </div>
</template>

<script setup lang="ts">
import './index.scss'

import { showModal } from '@tarojs/taro'
import { useUserStore } from '@/store/modules/user'
import { CellGroup as NutCellGroup, Cell as NutCell, Button as NutButton } from '@nutui/nutui-taro'

const store = useUserStore()

const loginOut = async () => {
  const { confirm } = await showModal({
    title: '提示',
    content: '是否退出登录？'
  })

  confirm && store.loginOut()
}
</script>
