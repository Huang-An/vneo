<template>
  <!-- 空数据清空省缺 -->
  <div class="vneo-empty">
    <image :src="empty" class="vneo-empty__img" />

    <div class="vneo-empty__tips">
      {{ emptyText }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'VneoEmpty'
}
</script>

<script setup lang="ts">
import './index.scss'
import empty from '@/assets/images/empty.png'

const props = defineProps({
  emptyText: {
    type: String,
    default: '暂无数据'
  }
})
</script>
