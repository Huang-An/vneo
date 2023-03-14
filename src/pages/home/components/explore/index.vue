<template>
  <div class="vneo-explore">
    <div v-for="(item, index) in appList" :key="index" class="vneo-explore__item" @click="openNewApp(item.name)">
      <image :src="item.icon" mode="aspectFit" class="vneo-explore__item--image" />

      <span class="vneo-explore__item--text">{{ item.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import './index.scss'

import todoList from '@/assets/images/todo-list.png'
import timeCapsule from '@/assets/images/time-capsule.png'

import { reactive } from 'vue'
import { message } from '@/common/toast'

const appList = reactive([
  { name: '代办事项', icon: todoList },
  { name: '时间胶囊', icon: timeCapsule }
])

const openNewApp = (name: string) => {
  message(`${name}正在开发中，尽情期待~`)
}
</script>
