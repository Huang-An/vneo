<template>
  <div class="vneo-home">
    <div class="vneo-home__create" @click="goCreate">
      <nut-icon name="photograph" />
    </div>

    <nut-tabs v-model="state" size="large" class="vneo-home__tabs">
      <nut-tabpane title="广 场">
        <square v-if="!store.getIsCheck" />

        <!-- 审核时显示该版本 -->
        <explore v-else />
      </nut-tabpane>

      <nut-tabpane title="探 索">
        <explore />
      </nut-tabpane>
    </nut-tabs>
  </div>
</template>

<script setup lang="ts">
import './index.scss'

import FleaMarket from '@/assets/images/flea-market.png'

import Square from './components/square/index.vue'
import Explore from './components/explore/index.vue'

import { ref } from 'vue'
import { go } from '@/common/route'
import { useAppStore } from '@/store/modules/app'
import { eventCenter, useShareAppMessage } from '@tarojs/taro'

const state = ref('0')
const store = useAppStore()

// 前往文章发布
const goCreate = () => {
  go('articles-create')
}

// 监听 广场文章发布成功 事件
eventCenter.on('articles-create-by-square', () => {
  state.value = '0'
})

useShareAppMessage(() => ({
  title: 'VNeo的广场上都有什么呢？',
  imageUrl: FleaMarket
}))
</script>
