import axios from "axios";
import { showToast, showFailToast } from "vant";
import { setLocal } from "@/common/js/utils";
import router from "@/router/index";

//配置axios的默认设置
axios.defaults.baseURL = "/api"; //设置基础url，所有请求都会加上
axios.defaults.withCredentials = true; //允许跨域请求时携带cookie
axios.defaults.headers["X-Requested-With"] = ["XMLHttpRequest"]; //标识这是一个ajax请求
axios.defaults.headers["token"] = localStorage.getItem("token") || ""; //设置请求头
axios.defaults.headers.post["Content-Type"] = "application/json"; // 设置post请求的Content-Type

//添加响应拦截器
axios.interceptors.response.use(
  //成功时的处理
  (res) => {
    //如果返回的数据不是对象，说明服务器异常
    if (typeof res.data !== "object") {
      showFailToast("服务器异常!");
      return Promise.reject(res);
    } //如果返回的状态码不是200，说明请求失败

    if (res.data.resultCode != 200) {
      //如果有错误提示信息，显示错误提示
      if (res.data.message) showFailToast(res.data.message); //如果是未登录状态码，跳转到登录页

      if (res.data.resultCode == 416) {
        router.push({ path: "/login" });
      } //如果是登录请求，保存token

      if ((res, data.data && window.location.hash == "#/login")) {
        setLocal("token", res.data.data);
        axios.defaults.headers["token"] = res.data.data;
      }

      return Promise.reject(res.data);
    } //返回处理后的数据

    return res.data;
  }, //失败时的处理
  (error) => {
    showFailToast("网络错误，请稍后重试");
    return Promise.reject(error);
  }
);

export default axios;
