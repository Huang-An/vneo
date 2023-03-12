<template>
  <div class="vneo-scroll" :style="{ height }">
    <scroll-view
      :scroll-y="true"
      :refresher-enabled="true"
      :refresher-triggered="isRefreshing"
      refresher-background="#fafafa"
      class="vneo-scroll__content"
      @scrolltolower="onLoad"
      @refresherRefresh="onRefresh"
    >
      <slot v-for="(item, index) in record" :key="index" :item="item" />

      <!-- 空数据清空省缺 -->
      <div v-if="!record.length" class="vneo-scroll__empty">
        <image :src="empty" class="vneo-scroll__empty--img" />

        <div class="vneo-scroll__empty--tips">
          {{ emptyText }}
        </div>
      </div>

      <!-- 非空数据省缺 -->
      <div v-else class="vneo-scroll__lower">
        <div v-if="!isFinished" class="vneo-scroll__lower--loading">
          <nut-icon name="loading" />

          <span>{{ loadingText }}</span>
        </div>

        <span v-else class="vneo-scroll__lower--finished">{{ finishedText }}</span>
      </div>
    </scroll-view>
  </div>
</template>

<script lang="ts">
export default {
  name: 'VneoScroll'
}
</script>

<script setup lang="ts">
import './index.scss'
import empty from '@/assets/images/empty.png'

import { cloneDeep } from 'lodash'
import { ref, computed } from 'vue'
import { useDidShow } from '@tarojs/taro'
import { showLoading, hideLoading } from '@/common/toast'

import type { PropType } from 'vue'
import type { Item, PageConfig, Load } from './type'

const props = defineProps({
  pageConfig: {
    type: Object as PropType<PageConfig>,
    default: () => ({
      pageIndex: 1,
      pageSize: 10
    })
  },

  loadingText: {
    type: String,
    default: '加载中'
  },

  finishedText: {
    type: String,
    default: '—— 亲，没有更多啦 ——'
  },

  emptyText: {
    type: String,
    default: '暂无数据'
  },

  load: {
    required: true,
    type: Function as PropType<Load>
  },

  height: {
    type: String,
    default: 'calc(100vh - 100rpx)'
  },

  isRefreshByShow: {
    type: Boolean,
    default: false
  }
})

const total = ref(0)
const record = ref<Item[]>([])

// 分页配置
const pageConfig = ref(cloneDeep(props.pageConfig))

// 是否加载中
const isLoading = ref(false)
// 是否下拉刷新中
const isRefreshing = ref(false)
// 是否已完成
const isFinished = computed(() => record.value.length >= total.value)
// 是否禁止上拉加载
const isDisabledLower = computed(() => isLoading.value || isFinished.value)
// 是否禁止下拉刷新
const isDisabledRefresh = computed(() => isLoading.value || isRefreshing.value)

// 重置
const reset = () => {
  pageConfig.value = cloneDeep(props.pageConfig)
}

// 开启 refresh loading
const startRefreshLoading = () => {
  isRefreshing.value = true
  showLoading()
}

// 关闭 refresh loading
const closeRefreshLoading = () => {
  isRefreshing.value = false
  hideLoading()
}

// 开启 上拉 loading
const startLoading = () => {
  isLoading.value = true
}

// 关闭 上拉 loading
const closeLoading = () => {
  isLoading.value = false
}

// 请求
const request = async (isRefresh: boolean = false) => {
  try {
    isRefresh ? startRefreshLoading() : startLoading()

    const { data } = await props.load(pageConfig.value)

    pageConfig.value.pageIndex++

    total.value = data.total

    updateRecord(isRefresh ? 'reset' : 'concat', data.items)
  } finally {
    setTimeout(() => (isRefresh ? closeRefreshLoading() : closeLoading()), 200)
  }
}

const onLoad = async () => {
  if (isDisabledLower.value) {
    return
  }

  request()
}

// 下拉刷新触发
const onRefresh = () => {
  if (isDisabledRefresh.value) {
    return
  }

  reset()
  request(true)
}

// update record
const updateRecord = (type: 'concat' | 'reset' | 'remove', data: Item[]) => {
  // 重置
  if (type === 'reset') {
    record.value = data as Item[]
    return
  }

  // concat
  if (type === 'concat') {
    record.value = record.value.concat(data as Item[])
    return
  }

  // 移除
  if (type === 'remove') {
    const index = record.value.indexOf(data)

    if (index !== -1) {
      record.value.splice(index, 1)
      total.value--
    }
  }
}

const start = () => {
  if (props.isRefreshByShow) {
    useDidShow(() => onRefresh())
    return
  }

  onRefresh()
}

start()

defineExpose({ updateRecord, onRefresh })
</script>
