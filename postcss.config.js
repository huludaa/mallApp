// 导出 PostCSS 配置
export default {
  // 配置插件
  plugins: {
    // 配置 px 转 rem 插件
    "postcss-pxtorem": {
      // 基准值，1rem = 37.5px（移动端常用值）
      rootValue: 37.5,
      // 需要转换的属性，这里表示全部都进行转换
      propList: ["*"],
      // 过滤掉.norem-开头的class，不进行rem转换
      selectorBlackList: [".norem"],
    },
  },
};
