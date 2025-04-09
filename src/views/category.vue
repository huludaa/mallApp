<template>
  <div class="category">
    <!-- 页面标题 -->
    <h1>分类页面</h1>
  </div>
</template>
<script setup></script>
<style scoped lang="less">
.category {
  //使用mixin.less中定义的混入
  .wh(100%,100vh);
  .bg ( @bg-color);
  padding: 20px;
}
</style>
