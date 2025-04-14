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

    <!-- 底部导航栏 -->
    <navBar />

    <!-- 轮播图 -->
    <swiper :list="state.swiperList"></swiper>

    <!-- 分类列表 -->
    <div class="category-list">
      <div v-for="item in state.categoryList">
        <img :src="item.imgUrl" />
        <span>{{ item.name }}</span>
      </div>
    </div>

    <!-- 商品展示区 -->
    <div class="goods">
      <header class="goods-title">新品上线</header>
      <!-- 使用van-skeleton实现加载效果 -->
      <van-skeleton title :row="3" :loading="state.loading">
        <div class="goods-box">
          <!-- 使用v-for循环渲染列表 -->
          <div
            class="good-item"
            v-for="item in state.newGoodses"
            :key="item.goodsId"
            @click="goToDetail(item.goodsId)"
          >
            <img :src="item.goodsCoverImg" />
            <div class="goods-desc">
              <!-- 商品名称 -->
              <div class="title">{{ item.goodsName }}</div>
              <!-- 商品价格 -->
              <div class="price">¥ {{ item.sellingPrice }}</div>
            </div>
          </div>
        </div>
      </van-skeleton>

      <header class="goods-title">热门商品</header>
      <van-skeleton title :row="3" :loading="state.loading">
        <div class="goods-box">
          <!-- 使用v-for循环渲染列表 -->
          <div
            class="good-item"
            v-for="item in state.hotGoodses"
            :key="item.goodsId"
            @click="goToDetail(item.goodsId)"
          >
            <img :src="item.goodsCoverImg" />
            <div class="goods-desc">
              <!-- 商品名称 -->
              <div class="title">{{ item.goodsName }}</div>
              <!-- 商品价格 -->
              <div class="price">¥ {{ item.sellingPrice }}</div>
            </div>
          </div>
        </div>
      </van-skeleton>

      <header class="goods-title">最新推荐</header>
      <van-skeleton title :row="3" :loading="state.loading">
        <div class="goods-box">
          <!-- 使用v-for循环渲染列表 -->
          <div
            class="good-item"
            v-for="item in state.recommendGoodses"
            :key="item.goodsId"
            @click="goToDetail(item.goodsId)"
          >
            <img :src="item.goodsCoverImg" />
            <div class="goods-desc">
              <!-- 商品名称 -->
              <div class="title">{{ item.goodsName }}</div>
              <!-- 商品价格 -->
              <div class="price">¥ {{ item.sellingPrice }}</div>
            </div>
          </div>
        </div>
      </van-skeleton>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, nextTick } from "vue";
import swiper from "@/components/Swiper.vue";
import { getHome } from "@/service/home";
import { getLocal } from "@/common/js/utils";
import navBar from "@/components/NavBar.vue";
import { showLoadingToast, closeToast, showToast } from "vant";
import { useRouter } from "vue-router";

const state = reactive({
  isLogin: false, //是否登录
  headerScroll: false, //滚动透明判断
  swiperList: [], //轮播图列表
  loading: true, // 加载状态，true为显示骨架屏，flase为显示真实内容
  newGoodses: [], //新品列表
  hotGoodses: [], //热门商品列表
  recommendGoodses: [], //推荐商品
  categoryList: [
    {
      name: "新蜂超市",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E8%B6%85%E5%B8%82%402x.png",
      categoryId: 100001,
    },
    {
      name: "新蜂服饰",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E6%9C%8D%E9%A5%B0%402x.png",
      categoryId: 100003,
    },
    {
      name: "全球购",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E5%85%A8%E7%90%83%E8%B4%AD%402x.png",
      categoryId: 100002,
    },
    {
      name: "新蜂生鲜",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E7%94%9F%E9%B2%9C%402x.png",
      categoryId: 100004,
    },
    {
      name: "新蜂到家",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E5%88%B0%E5%AE%B6%402x.png",
      categoryId: 100005,
    },
    {
      name: "充值缴费",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E5%85%85%E5%80%BC%402x.png",
      categoryId: 100006,
    },
    {
      name: "9.9元拼",
      imgUrl: "https://s.yezgea02.com/1604041127880/9.9%402x.png",
      categoryId: 100007,
    },
    {
      name: "领劵",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E9%A2%86%E5%88%B8%402x.png",
      categoryId: 100008,
    },
    {
      name: "省钱",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E7%9C%81%E9%92%B1%402x.png",
      categoryId: 100009,
    },
    {
      name: "全部",
      imgUrl:
        "https://s.yezgea02.com/1604041127880/%E5%85%A8%E9%83%A8%402x.png",
      categoryId: 100010,
    },
  ],
});

onMounted(async () => {
  const token = getLocal("token");
  if (token) {
    state.isLogin = true;
  }
  // 显示加载提示
  showLoadingToast({
    message: "加载中...",
    forbidClick: true,
  });

  // 调用API获取数据
  const res = await getHome();
  state.swiperList = res.data.carousels;
  state.newGoodses = res.data.newGoodses;
  state.hotGoodses = res.data.hotGoodses;
  state.recommendGoodses = res.data.recommendGoodses;
  state.loading = false; // 显示真实内容
  closeToast(); // 关闭加载提示

  // 滚动监听
  nextTick(() => {
    window.addEventListener("scroll", () => {
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

//路由实例化
const router = useRouter();
//TODO：商品详情
const goToDetail = (goodsId) => {
  router.push({ path: `/product/${goodsId}` });
};
</script>

<style lang="less" scoped>
.home {
  //使用mixin.less中定义的混入
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

  //分类列表
  .category-list {
    width: 100%;
    background-color: #fff;
    display: flex; //flex布局
    flex-wrap: wrap; //允许换行

    div {
      width: 20%; //每行显示5个
      display: flex; //使用flex布局
      flex-direction: column; //垂直方向排列
      align-items: center; //居中对齐
      padding: 10px 0; //设置内边距
      img {
        width: 30px;
        height: 30px;
      }
    }
  }

  //商品展示区
  .goods {
    width: 100%;
    padding: 10px 0;
    // 标题样式
    .goods-title {
      font-size: 15px;
      font-weight: 600;
      color: @primary;
      text-align: center;
      align-items: center;
      margin: 5px;
    }

    // 商品列表容器样式
    .goods-box {
      flex-wrap: wrap; //允许换行
      display: flex;
      background-color: #fff;

      //每一个商品
      .good-item {
        padding: 10px;
        width: 50%;
        border-bottom: 1px solid #e9e9e9;
        img {
          width: 50%; //每行2个
          /* 图片居中 */
          display: block;
          margin: 0 auto;
        }
        .goods-desc {
          text-align: center;
          font-size: 14px;
          .title {
            color: #222333;
          }
          .price {
            color: @primary;
          }
        }
        //第奇数个添加右边框
        &:nth-child(2n + 1) {
          border-right: 1px solid #e9e9e9;
        }
      }
    }
  }
}
</style>
