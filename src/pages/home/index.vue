<template>
  <div class="vneo-home">
    <div class="vneo-home__publish" @click="goPublish">
      <nut-icon name="photograph" />
    </div>

    <nut-tabs v-model="state" size="large" class="vneo-home__tabs">
      <nut-tabpane title="广 场">
        <square />
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
import { navigateToByName } from '@/common/route'
import { useShareAppMessage } from '@tarojs/taro'

const state = ref('0')

// 前往文章发布
const goPublish = () => {
  navigateToByName('articles-publish')
}

useShareAppMessage(() => ({
  title: 'VNeo的广场上都有什么呢？',
  imageUrl: FleaMarket
}))
</script>
