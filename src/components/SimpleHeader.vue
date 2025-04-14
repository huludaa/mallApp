<template>
  <!-- van-hairline--bottom 类,是 Vant UI 组件库提供的一个内置样式类。
   ,作用是给元素添加一个底部的细线边框，通常用于分隔不同的内容区域。 -->
  <header class="simple-header van-hairline--bottom">
    <!-- 左侧返回按钮：当showBack为true时显示 -->
    <van-icon v-if="showback" name="arrow-left" class="back" @click="goBack" />

    <!-- 标题文本，使用props传入的name值 -->
    <div class="title">{{ name }}</div>

    <!-- 右侧更多按钮 -->
    <van-icon class="iconfont icon-gengduo" @click="more"></van-icon>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { showDialog } from "vant"; //对话框
// defineProps用于定义组件的属性（props）并接受
// 在<script setup>中，defineProps是一个编译器宏，不需要导入
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  showback: {
    type: Boolean,
    default: true,
  },
});

const router = useRouter();

// 定义返回按钮点击事件处理函数
const goBack = () => {
  router.push("/home");
};

//更多按钮事件
const more = () => {
  showDialog({
    message: "登录/注册失败，请联系作者3450044704@qq.com",
  });
};
</script>
<style scoped lang="less">
.simple-header {
  width: 100%;
  .fj();
  padding: 15px;
  font-size: 15px;
  height: 44px;
  line-height: 44px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  color: @primary;
  .title {
    font-weight: bold;
  }
}
</style>
