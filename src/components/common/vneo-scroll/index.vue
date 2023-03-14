<template>
  <div class="vneo-scroll" :style="{ height, backgroundColor }">
    <scroll-view
      :scroll-y="true"
      :refresher-enabled="true"
      :refresher-triggered="isRefreshing"
      refresher-background="#fafafa"
      class="vneo-scroll__content"
      @scrolltolower="onLoad"
      @refresherRefresh="onRefresh"
    >
      <slot name="pre" />

      <slot v-for="(item, index) in record" :key="item[unique] || index" :item="item" :index="index" />

      <slot v-if="!record.length" name="empty">
        <vneo-empty :empty-text="emptyText" />
      </slot>

      <!-- 非空数据省缺 -->
      <div v-else class="vneo-scroll__lower">
        <div v-if="!isFinished" class="vneo-scroll__lower--loading">
          <nut-icon name="loading" />

          <span>{{ loadingText }}</span>
        </div>

        <span v-else class="vneo-scroll__lower--finished" @click="request(false)">{{ finishedText }}</span>
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
    default: '暂无更多，点击刷新'
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

  backgroundColor: {
    type: String
  },

  isRefreshByShow: {
    type: Boolean,
    default: false
  },

  unique: {
    type: String,
    default: '_id'
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
const isFinished = ref(false)
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
  isFinished.value = false
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

    // 返回有数据 页数才加
    data.items.length >= pageConfig.value.pageSize && pageConfig.value.pageIndex++

    total.value = data.total

    updateRecord(isRefresh ? 'reset' : 'concat', data.items)

    isFinished.value = record.value.length >= total.value
  } finally {
    isRefresh ? closeRefreshLoading() : closeLoading()
  }
}

// 下拉刷新
const onRefresh = () => {
  if (isDisabledRefresh.value) {
    return
  }

  reset()
  request(true)
}

// 上拉加载
const onLoad = async () => {
  if (isDisabledLower.value) {
    return
  }

  request()
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
    data.forEach(item => {
      const index = record.value.findIndex(r => r[props.unique] === item[props.unique])

      index === -1 && record.value.push(item)
    })

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

// 首次请求
props.isRefreshByShow ? useDidShow(() => onRefresh()) : onRefresh()

defineExpose({ updateRecord, onRefresh })
</script>
