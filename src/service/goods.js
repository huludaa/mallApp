import axios from "@/utils/axios";

//获取商品详情
export function getDetails(goodsId) {
  return axios.get(`/goods/detail/${goodsId}`);
}
