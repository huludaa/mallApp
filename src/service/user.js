import axios from "@/utils/axios";

//登录
export function reqLogin(params) {
  return axios.post("/user/login", params);
}

// 注册
export function reqRegister(params) {
  return axios.post("/user/register", params);
}

//获取用户信息
export function reqUserInfo() {
  return axios.get("/user/info");
}

//退出登录
export function logout() {
  return axios.post("/user/logout");
}
