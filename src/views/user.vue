<template>
  <div class="user">
    <!-- 页面标题 -->
    <h1>用户中心</h1>
  </div>
</template>
<script setup></script>
<style scoped lang="less">
.user {
  //使用mixin.less中定义的混入
  .wh(100%,100vh);
  .bg ( @bg-color);
  padding: 20px;
}
</style>
