<template>
  <div class="swiper-container">
    <van-swipe class="my-swipe" :autoplay="3000" lazy-render :height="200">
      <van-swipe-item v-for="(item, index) in list" :key="index">
        <img
          :src="item.carouselUrl"
          style="width: 100%; height: 100%"
          @click="goTo(item.redirectUrl)"
        />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup>
// 导入defineProps函数，用于定义组件的prop
import { defineProps } from "vue";
//定义props接受轮播图数据
const props = defineProps({
  list: {
    type: Array,
    default: () => [], //设置默认值，如果父组件没有传递该 prop，则使用默认值
  },
});
// 定义goTo方法，用于打开新窗口
const goTo = (url) => {
  //使用window.open方法在新窗口打开指定的url
  window.open(url);
};
</script>
<style scoped lang="less">
.swiper-container {
  padding-top: 50px; //为导航栏留出空间
  overflow: hidden; /* 防止内容溢出 */
}
</style>
