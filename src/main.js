import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";

// 导入 Vant UI
import vant from "vant";
//导入样式文件
import "./assets/main.css";
// 导入移动端适配的库
import "lib-flexible/flexible";
// 导入 Vant UI 样式
import "vant/lib/index.css";
//导入vant相关组件

// 创建 Vue 应用实例
const app = createApp(App);

// 使用插件
app.use(createPinia()); // 使用 Pinia 状态管理
app.use(router); // 使用路由
app.use(vant); // 使用 Vant UI
// 挂载应用
app.mount("#app");
