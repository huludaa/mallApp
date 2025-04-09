import axios from "../utils/axios";

//获取首页数据
export function getHome() {
  return axios.get("/index-infos");
}
