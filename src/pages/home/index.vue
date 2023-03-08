<template>
  <div class="vneo-home">
    <div class="vneo-home__publish" @click="goPublish">
      <nut-icon name="photograph" />
    </div>

    <nut-tabs v-model="state" size="large" class="vneo-home__tabs">
      <nut-tabpane title="广 场">
        <square />
      </nut-tabpane>

      <nut-tabpane title="探 索"> 探 索 </nut-tabpane>
    </nut-tabs>
  </div>
</template>

<script setup lang="ts">
import './index.scss'

import Square from './components/square/index.vue'

import { ref } from 'vue'
import { navigateToByName } from '@/common/route'
import { Tabs as NutTabs, TabPane as NutTabpane } from '@nutui/nutui-taro'

const state = ref('0')

// 前往文章发布
const goPublish = () => {
  navigateToByName('articles-publish')
}
</script>
