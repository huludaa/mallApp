<template>
  <div class="register">
    <!-- 顶部导航栏 -->
    <SimpleHeader name="注册" />

    <!-- 商城logo -->
    <img
      class="logo"
      style="width: 140px; height: 140px"
      src="https://s.yezgea02.com/1604045825972/newbee-mall-vue3-app-logo.png"
    />

    <!-- 注册表单 -->
    <div class="Form">
      <van-form @submit="onSubmit">
        <!-- 用户名输入框 -->
        <van-field
          v-model="state.username"
          name="username"
          placeholder="请输入用户名"
          label="用户名"
          :rules="[
            { required: true, message: '请填写用户名', trigger: 'onBlur' },
          ]"
        />
        <!-- 密码输入框 -->
        <van-field
          name="password"
          v-model="state.password"
          placeholder="请输入密码"
          label="密码"
          :rules="[
            { required: true, message: '请填写密码', trigger: 'onBlur' },
          ]"
          :right-icon="!passwordStatus ? 'closed-eye' : 'eye-o'"
          :type="!passwordStatus ? 'password' : 'text'"
          @click-right-icon="passwordStatus = !passwordStatus"
        />

        <!-- 确认密码框 -->
        <van-field
          name="password1"
          v-model="state.password1"
          placeholder="请再次输入密码"
          label="确认密码"
          :rules="[
            { required: true, message: '请填写密码', trigger: 'onBlur' },
          ]"
          :right-icon="!passwordStatus1 ? 'closed-eye' : 'eye-o'"
          :type="!passwordStatus1 ? 'password' : 'text'"
          @click-right-icon="passwordStatus1 = !passwordStatus1"
        />

        <!-- 验证码输入框 -->
        <!--   clearable:当设置为 true 时，输入框右侧会显示一个 × 图标，点击可一键清空当前输入内容。 -->
        <van-field
          name="verify"
          center
          clearable
          label="验证码"
          placeholder="请输入验证码"
          v-model="state.verify"
          :rules="[
            { required: true, message: '请填写验证码', trigger: 'onBlur' },
          ]"
        >
          <template #button>
            <VueImgVerify ref="verifyRef" />
          </template>
        </van-field>

        <!-- 底部按钮区域 -->
        <div class="form-footer">
          <!-- 切换登录/注册的连接 -->
          <div class="link" @click="toggleType">已有登录账号</div>

          <!-- 提交按钮 -->
          <van-button
            type="info"
            round
            block
            native-type="submit"
            color="#1baeae"
          >
            注册
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import SimpleHeader from "@/components/SimpleHeader.vue";
import VueImgVerify from "@/components/VueImageVerify.vue";
import { reqRegister } from "@/service/user.js";
import md5 from "js-md5";
import { reactive, ref } from "vue";
import { showSuccessToast, showFailToast } from "vant";
import { useRouter } from "vue-router";

const state = reactive({
  username: "", //用户名
  password: "", //密码
  password1: "", //确认密码
  type: "register", //当前模式：register-注册
  verify: "", //用户输入的验证码
  imgCode: "", //图形验证码
});

//控制密码的显示与隐藏
const passwordStatus = ref(false);
const passwordStatus1 = ref(false);

// 验证码组件引用
const verifyRef = ref(null);

//路由实例化
const router = useRouter();

//清空内容,刷新验证码
const resetForm = () => {
  state.username = "";
  state.password = "";
  state.password1 = "";
  state.verify = "";
  verifyRef.value.refreshCode();
};

// 提交表单
const onSubmit = async (values) => {
  // 验证码校验
  state.imgCode = verifyRef.value.state.imgCode || ""; //获取正确的验证码
  if (state.verify.toLowerCase() != state.imgCode.toLowerCase()) {
    showFailToast("验证码有误");
    //清空内容,刷新验证码
    resetForm();
    return;
  }

  if (state.type === "register") {
    // 注册模式下需要验证两次密码是否一致
    if (values.password !== values.password1) {
      showFailToast("两次输入的密码不一致！");
      //清空内容,刷新验证码
      resetForm();
      return;
    }

    // 注册请求
    try {
      const registerData = await reqRegister({
        loginName: values.username,
        password: values.password,
      });
      showSuccessToast("注册成功!请登录！");
      // 切换到登录模式
      router.push("/login");
      //验证码清空
      state.verify = "";
    } catch (error) {
      showFailToast("注册失败");
      resetForm();
    }
  }
};

// 切换登录和注册模式
const toggleType = () => {
  router.push("/login");
};
</script>

<style scoped lang="less">
.register {
  //使用mixin.less中定义的混入
  .wh(100%,100vh);

  .logo {
    /* 图片居中 */
    display: block;
    margin: 120px auto;
  }

  //   表单label文字宽度一致，左右对齐
  :deep(.van-field__label) {
    width: 60px;
    text-align: justify; /* 两端对齐 */
    text-align-last: justify; /* 最后一行也两端对齐 */
  }

  .form-footer {
    margin: 20px;
    .link {
      margin-bottom: 20px;
      color: @primary;
    }
  }
}
</style>
