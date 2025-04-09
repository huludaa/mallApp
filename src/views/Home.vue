<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <header class="home-header wrap" :class="{ active: state.headerScroll }">
      <!-- 左侧菜单栏按钮 -->
      <router-link tag="i" to="./category">
        <i class="iconfont icon-caidan"></i>
      </router-link>

      <!-- 中间搜索区域 -->
      <div class="header-search">
        <span class="app-name">
          碳迹商城
          <i class="iconfont icon-anjianfengexian"></i>
        </span>
        <router-link
          tag="span"
          class="search-title"
          to="./product-list?from=home"
        >
          山河无恙，人间皆安
        </router-link>
      </div>

      <!-- 右侧登录/我的按钮 -->
      <router-link class="login" tag="span" to="./login" v-if="!state.isLogin">
        登录
      </router-link>
      <router-link class="login" tag="span" to="./user" v-else>
        <i class="iconfont icon-denglu"></i>
      </router-link>
    </header>

    <!-- 轮播图 -->
    <swiper :list="state.swiperList"></swiper>

    <!-- 分类列表 -->
    <!-- <div class="category-list">
      <div v-for="item in state.categoryList">
        <img :src="item.imgUrl" />
        <span>{{ item.name }}</span>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { reactive, onMounted, nextTick } from "vue";
import swiper from "@/components/Swiper.vue";
import { getHome } from "@/service/home";
const state = reactive({
  isLogin: true, //是否登录
  headerScroll: false, //滚动透明判断
  swiperList: [], //轮播图列表
});

onMounted(async () => {
  const res = await getHome();
  state.swiperList = res.data.carousels;
  // 滚动监听
  nextTick(() => {
    document.body.addEventListener("scroll", () => {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      scrollTop > 100
        ? (state.headerScroll = true)
        : (state.headerScroll = false);
    });
  });
});
</script>

<style lang="less" scoped>
.home {
  //使用mixin.less中定义的混入
  .wh(100%,100vh);
  .bg(@bg-color);
  //顶部导航栏样式
  .home-header {
    position: fixed; //固定在顶部
    left: 0;
    top: 0;
    .wh(100%,50px); // 宽度100%，高度50px
    .fj(); // 使用flex布局
    padding: 0 15px; // 左右内边距
    font-size: 15px;
    color: #fff;
    .boxSizing(); //使用盒模型计算方式
    z-index: 10000; // 确保导航栏在最上层
    // 左侧菜单图标样式
    .icon-caidan {
      color: @primary;
      font-size: 20px;
    }
    // 中间搜索款样式
    .header-search {
      display: flex;
      height: 30px;
      width: 80%;
      padding: 5px;
      color: #232326;
      background: rgba(255, 255, 255, 0.7); // 半透明白色背景
      border-radius: 20px; // 圆角

      // 商城名称样式
      .app-name {
        padding: 0 10px;
        color: @primary;
        font-size: 15px;
        font-weight: bold;
      }

      // 搜索文字样式
      .search-title {
        font-size: 12px;
        color: #666;
        line-height: 25px;
      }
    }

    //右侧登录按钮样式
    .login {
      color: @primary;
      line-height: 50px;
      .icon-denglu {
        font-size: 20px;
      }
    }

    //滚动到一定距离时顶部导航栏样式
    &.active {
      background-color: @primary;
      .icon-caidan {
        color: #fff;
      }
      .login {
        color: #fff;
      }
    }
  }

  .category-list {
    width: 100%;
    background-color: red;
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    div {
      img {
        .wh(36px,36px);
      }
    }
  }
}
</style>
