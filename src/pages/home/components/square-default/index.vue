<template>
  <div class="vneo-square-default">
    <vneo-articles-card v-for="(item, index) in list" :key="index" :data="item" />
  </div>
</template>

<script setup lang="ts">
import './index.scss'

import VneoArticlesCard from '@/components/service/vneo-articles-card/index.vue'

import { ref } from 'vue'

const list = ref([
  {
    _id: 'a31a2188640c791a000ece5a6cf7ace8',
    avatar:
      'cloud://vneo-test-4g35fcfw4fde9750.766e-vneo-test-4g35fcfw4fde9750-1258026426/tmp_abbf4de33bd67955a53a46f69a6f74c2dd4e359f9e9b7515.jpg',
    userName: '桉。',
    createDate: '2023-03-11T12:50:34.000Z',
    updateDate: '2023-03-11T12:50:34.000Z',
    createUserById: 'oSK4G0UvwFQ-w08vU2K2YEWeh4qs',
    updateUserById: 'oSK4G0UvwFQ-w08vU2K2YEWeh4qs',
    content: '你有多久没有超进化了！？',
    imageList: [
      'cloud://vneo-test-4g35fcfw4fde9750.766e-vneo-test-4g35fcfw4fde9750-1258026426/tmp_9e0dd2ae124f87271ca42c94059f3701d7cffa5ff18781d8.jpg',
      'cloud://vneo-test-4g35fcfw4fde9750.766e-vneo-test-4g35fcfw4fde9750-1258026426/tmp_055be3928622f9d1b41fde50efd9bf6c6cae3cb0405e8c36.jpg',
      'cloud://vneo-test-4g35fcfw4fde9750.766e-vneo-test-4g35fcfw4fde9750-1258026426/tmp_35541a287ee247eed1229fcaf0e5b99dc0737f53bef4efb0.jpg'
    ],
    isPrivate: false,
    title: '童年回忆～',
    type: 1,
    likeOrCollectList: []
  },
  {
    _id: 'fc8e6465640c78d003f74549491e83fe',
    avatar:
      'cloud://vneo-test-4g35fcfw4fde9750.766e-vneo-test-4g35fcfw4fde9750-1258026426/tmp_abbf4de33bd67955a53a46f69a6f74c2dd4e359f9e9b7515.jpg',
    userName: '桉。',
    createDate: '2023-03-11T12:49:20.234Z',
    updateDate: '2023-03-11T12:49:20.234Z',
    createUserById: 'oSK4G0UvwFQ-w08vU2K2YEWeh4qs',
    updateUserById: 'oSK4G0UvwFQ-w08vU2K2YEWeh4qs',
    content: '😃😃😃😃😃',
    imageList: [
      'cloud://vneo-test-4g35fcfw4fde9750.766e-vneo-test-4g35fcfw4fde9750-1258026426/tmp_0083279aa2471280b4c91afb42caf99258bc791d59abe995.jpg',
      'cloud://vneo-test-4g35fcfw4fde9750.766e-vneo-test-4g35fcfw4fde9750-1258026426/tmp_76b8a197012350449d545d079d311894adf46c6683a5ab77.jpg',
      'cloud://vneo-test-4g35fcfw4fde9750.766e-vneo-test-4g35fcfw4fde9750-1258026426/tmp_00d62a44f81ba3c154aa5e1e2ec498ce265bf4b469205e21.jpg'
    ],
    isPrivate: false,
    title: '来点梗图（第二弹）',
    type: 1,
    likeOrCollectList: []
  },
  {
    _id: '2cc84e26640c788d03ff423152094d91',
    avatar:
      'cloud://vneo-test-4g35fcfw4fde9750.766e-vneo-test-4g35fcfw4fde9750-1258026426/tmp_abbf4de33bd67955a53a46f69a6f74c2dd4e359f9e9b7515.jpg',
    userName: '桉。',
    createDate: '2023-03-11T12:48:13.571Z',
    updateDate: '2023-03-11T12:48:13.571Z',
    createUserById: 'oSK4G0UvwFQ-w08vU2K2YEWeh4qs',
    updateUserById: 'oSK4G0UvwFQ-w08vU2K2YEWeh4qs',
    content: '😏😏😏😏😏',
    imageList: [
      'cloud://vneo-test-4g35fcfw4fde9750.766e-vneo-test-4g35fcfw4fde9750-1258026426/tmp_9bc49058e6bdcbad5b11232fee07d3a5d738c3970d5a90af.gif',
      'cloud://vneo-test-4g35fcfw4fde9750.766e-vneo-test-4g35fcfw4fde9750-1258026426/tmp_a7a1f85984be3774b5a2b85e51678434e249c78739b4e692.jpg'
    ],
    isPrivate: false,
    title: '来点梗图（第一弹）',
    type: 1,
    likeOrCollectList: []
  },
  {
    _id: 'a31a2188640c5fbf000c48af491fe9d5',
    avatar:
      'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
    userName: '爱如火',
    createDate: '2023-03-11T11:02:23.083Z',
    updateDate: '2023-03-11T11:02:23.083Z',
    createUserById: 'oSK4G0SKRNwbSp0vp7fjClv5wTnM',
    updateUserById: 'oSK4G0SKRNwbSp0vp7fjClv5wTnM',
    content:
      '\n两年之后的一天晚上，你在玩路人局，无意中看见有个队友在用怜悯之刃，你越看越帅，游戏结束了你都久久不能忘怀，半夜睡觉翻来覆去满脑子都是它的画面，天亮了，你还是不能入睡，不停的抽自己耳光，痛哭流涕。这全都是因为两年前的今天，你没有购买怜悯之刃',
    imageList: [
      'cloud://vneo-test-4g35fcfw4fde9750.766e-vneo-test-4g35fcfw4fde9750-1258026426/tmp_8ed51715283c76aef62afe7b845888ac795c08910d25e42b.png'
    ],
    title: '你真的需要怜悯之刃吗？',
    type: 1,
    likeOrCollectList: []
  }
])
</script>
