<template>
  <div class="img-verify">
    <!-- 
      Canvas 画布元素，用于绘制验证码图形
      ref="verify" - 获取DOM引用
      :width/:height - 动态绑定宽度高度
      @click - 点击事件，点击可刷新验证码 
    -->
    <canvas
      ref="verify"
      :width="state.width"
      :height="state.height"
      @click="refreshCode"
    ></canvas>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

//创建引用容器，用于获取canvas元素
const verify = ref(null);

// 使用 reactive 创建一个响应式对象 state，包含了验证码相关的属性
/*
 * pool 是一个包含所有可能字符的字符串，用于生成验证码字符
 * width 和 height 分别表示 canvas 的宽度和高度
 * imgCode 用于存储生成的验证码字符串
 */
const state = reactive({
  pool: "ABCDEFGHJKLMNPQRSTUVWXYZ23456789",
  width: 120,
  height: 40,
  imgCode: "",
});

// 暴露方法和状态给父组件, refreshCode重新绘制图片,refrshCode使用完全暴露方式
defineExpose({
  state,
  refreshCode: () => {
    state.imgCode = draw();
  },
});

// 点击图片重新绘制
const refreshCode = () => {
  state.imgCode = draw();
};

onMounted(() => {
  // 初始化绘制图片验证码，并将生成的验证码字符串赋值给 state.imgCode
  state.imgCode = draw();
});

//生成随机整数(min <= 随机整数 < max)
const randomNum = (min, max) => {
  // Math.random() 返回一个大于等于 0 且小于 1 的随机小数
  // 乘以 (max - min) 得到一个在 0 到 (max - min) 之间的小数
  // 加上 min 得到一个在 min 到 max 之间的小数
  // parseInt 用于将小数转换为整数并返回
  return parseInt(Math.random() * (max - min) + min);
};

//生成随机颜色
const randomColor = (min, max) => {
  const r = randomNum(min, max); //红色的分量
  const g = randomNum(min, max); //绿色的分量
  const b = randomNum(min, max); //蓝色的分量
  return `rgb(${r},${g},${b})`; //合成一个RGB格式的字符串返回
};

//绘制图片
const draw = () => {
  const ctx = verify.value.getContext("2d"); //获取canvas的2D绘图上下文，用于绘制图形和文本
  ctx.fillStyle = randomColor(180, 230); //设置矩形填充色：较浅的随机色
  //绘制一个矩形，填充整个canvas作为背景
  //0，0表示矩形的左上角坐标，state.width 和 state.height 表示矩形的宽度和高度
  ctx.fillRect(0, 0, state.width, state.height);
  let imgCode = ""; //存储生成的验证码

  //生成 4 个随机字符并绘制到 canvas 上
  for (let i = 0; i < 4; i++) {
    const text = state.pool[randomNum(0, state.pool.length)]; //从pool中随机选取一个字符
    imgCode += text; //选取的字符添加到imgCode

    //生成一个随机的字体大小
    const fontSize = randomNum(18, 40);

    //生成一股随机的旋转角度
    const deg = randomNum(-30, 30);

    // 设置字体样式，包括大小和字体名称？？？？？
    ctx.font = fontSize + "px Simhei";

    // 设置文本基线为顶部对齐
    ctx.textBaseline = "top";

    // 设置填充文本的颜色为一个较深的随机颜色
    ctx.fillStyle = randomColor(80, 150);

    // 保存当前的绘图上下文状态，以便后续恢复
    ctx.save();

    // 平移绘图上下文，使每个字符在不同的水平位置？？？/
    ctx.translate(30 * i + 15, 15);

    // 旋转绘图上下文，使字符有随机的旋转角度???
    ctx.rotate((deg * Math.PI) / 180);

    // 在指定位置绘制文本，-15+5 和 -15 是文本的相对位置??
    ctx.fillText(text, 0, -10);

    //恢复之前保存的绘图上下文状态
    ctx.restore();
  }

  //绘制5条随机的干扰线
  for (let i = 0; i < 5; i++) {
    ctx.beginPath(); //开始一个新的路径
    ctx.moveTo(randomNum(0, state.width), randomNum(0, state.height)); //设置路径的起始点
    ctx.lineTo(randomNum(0, state.width), randomNum(0, state.height)); //设置路径的结束点
    ctx.strokeStyle = randomColor(180, 230); //设置线条颜色
    ctx.closePath(); //关闭路径
    ctx.stroke(); //绘制线条
  }

  //绘制40个干扰点
  for (let i = 0; i < 40; i++) {
    ctx.beginPath(); //开始一个新的路径
    ctx.arc(
      randomNum(0, state.width),
      randomNum(0, state.height),
      1,
      0,
      2 * Math.PI
    ); //绘制一个圆形，圆心随机，半径为1
    ctx.closePath(); //关闭路径
    ctx.fillStyle = randomColor(150, 200); //设置填充色为一个较浅的随机色
    ctx.fill(); //填充圆形
  }

  return imgCode;
};
</script>
<style scoped lang="less">
//移动到画布显示手型
.img-verify canvas {
  cursor: pointer;
}
</style>
