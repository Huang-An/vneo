<template>
  <div class="index">
    <nut-button block type="primary" @click="store.login">进入</nut-button>
  </div>
</template>

<script setup lang="ts">
import './index.scss'

import { Button as NutButton } from '@nutui/nutui-taro'
import { useUserStore } from '@/store/modules/user'

const store = useUserStore()
</script>
