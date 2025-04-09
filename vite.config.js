// 导入 Vite 配置函数
import { defineConfig } from "vite";
// 导入 Vue 插件
import vue from "@vitejs/plugin-vue";
// 导入组件:自动导入插件
import Components from "unplugin-vue-components/vite";
// 导入 Vant 组件解析器
import { VantResolver } from "unplugin-vue-components/resolvers";

// 导出 Vite 配置
export default defineConfig({
  // 配置插件
  plugins: [
    // 使用 Vue 插件
    vue(),
    // 配置组件自动导入
    Components({
      // 使用 Vant 组件解析器
      resolvers: [VantResolver()],
    }),
  ],
  // CSS 相关配置
  css: {
    // 预处理器配置
    preprocessorOptions: {
      // Less 配置
      less: {
        // 启用 JavaScript 支持
        javascriptEnabled: true,
        // 全局导入 mixin.less 文件
        additionalData: `@import "@/common/style/mixin.less";`,
      },
    },
  },
  // 路径解析配置
  resolve: {
    // 配置路径别名
    alias: {
      // 将 @ 指向 src 目录
      "@": "/src",
    },
  },
  // 代理配置
  server: {
    proxy: {
      // 当请求路径以/api开头时，将请求转发到后端服务器
      "/api": {
        target: "http://backend-api-01.newbee.ltd/api/v1", //后端服务器地址
        changeOrigin: true, //允许跨域
        rewrite: (path) => path.replace(/^\/api/, ""), // 重写路径，去掉 /api 前缀
      },
    },
  },
});
