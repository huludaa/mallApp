//导入路由相关配置
import { createRouter, createWebHistory } from "vue-router";
//定义路由配置
const routes = [
  {
    //路由重定向到首页
    path: "/",
    redirect: "/home",
  },
  {
    //首页路由
    path: "/home",
    name: "Home",
    //使用懒加载方式导入组件，提高首屏加载速度
    component: () => import("@/views/home.vue"),
  },
  {
    //登录路由
    path: "/login",
    name: "Login",
    component: () => import("@/views/login.vue"),
  },
  {
    //注册路由
    path: "/register",
    name: "Register",
    component: () => import("@/views/register.vue"),
  },
  {
    //分类路由
    path: "/category",
    name: "Category",
    component: () => import("@/views/category.vue"),
  },
  {
    //购物车路由
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/cart.vue"),
  },
  {
    //用户中心路由
    path: "/user",
    name: "User",
    component: () => import("@/views/user.vue"),
  },
];

//创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

//导出路由实例
export default router;
