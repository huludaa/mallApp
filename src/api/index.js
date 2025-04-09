import request from "@/utils/request";

// 获取轮播图
export const getCarousels = () => {
  return request.get("/carousels");
};
