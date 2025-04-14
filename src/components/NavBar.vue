<template>
  <div class="nav-bar van-hairline--top">
    <ul class="navList">
      <router-link class="navListItem active" to="home">
        <i class="iconfont icon-shouyechangguishouye"></i>
        <span>首页</span>
      </router-link>
      <router-link class="navListItem" to="category">
        <i class="iconfont icon-fenlei"></i>
        <span>分类</span>
      </router-link>
      <router-link class="navListItem" to="cart">
        <i class="iconfont icon-gouwuche"></i>
        <span>购物车</span>
      </router-link>
      <router-link class="navListItem" to="user">
        <i class="iconfont icon-yonghuzhongxin_yonghuliebiao"></i>
        <span>我的</span>
      </router-link>
    </ul>
  </div>
</template>

<script setup></script>
<style scoped lang="less">
.nav-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  padding: 5px 0;
  background-color: #fff;
  .navList {
    width: 100%;
    .fj();
    padding: 0;
    .navListItem {
      display: flex;
      flex: 1;
      flex-direction: column;
      text-align: center;
      color: #666;
      &.router-link-active {
        color: @primary;
      }
      i {
        text-align: center;
        font-size: 12px;
      }
      span {
        font-size: 12px;
      }
    }
  }
}
</style>
