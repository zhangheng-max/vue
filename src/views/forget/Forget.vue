<template>
  <!-- 修改密码页面 -->
  <div class="Forget">
    <Header GoBack="true">
      <span slot="forget">重置密码</span>
    </Header>
    <section class="main">
      <div>
        <van-field class="input" v-model="phone" placeholder="账号" />
        <van-field class="input" v-model="oldPassWord" placeholder="旧密码" />
        <van-field class="input" v-model="newPassWord" placeholder="请输入新密码" />
        <van-field class="input" v-model="confirmPassWord" placeholder="请确认密码" />
        <div class="input_container">
          <van-field class="input" v-model="mobileCode" placeholder="请输入短信验证码"></van-field>
          <div class="input-change">
            <img v-if="captchas" :src="captchas" />
            <div class="change_img" @click="GoCaptchas">
              <p>看不清</p>
              <span>换一张</span>
            </div>
          </div>
        </div>
      </div>
      <div class="login_container">确认修改</div>
    </section>
  </div>
</template>

<script>
import Header from "../hfod/Header";
export default {
  data() {
    return {
      phone: "", //账号
      oldPassWord: "", //旧密码
      newPassWord: "", //请输入新密码
      confirmPassWord: "", //请确认密码
      mobileCode: "", //请输入短信验证码
      captchas: "" //验证码图片
    };
  },
  methods: {
    //   请求验证码
    Captchas() {
      this.$http.post(`http://elm.cangdu.org/v1/captchas`).then(res => {
        // console.log(res);
        if (res.data.status == 1) {
          this.captchas = res.data.code;
        }
      });
    },
    //更换验证码
    GoCaptchas() {
      this.Captchas();
    }
  },
  components: {
    Header
  },
  mounted() {
    this.Captchas();
  }
};
</script>

<style lang="scss" scoped>
.Forget {
  padding-top: 0.56rem;
  .main {
    margin-top: 0.16rem;

    background: #fff;
    .input {
      font-size: 0.2rem;
      padding: 0.16rem 0.22rem;
    }
    .input_container {
      display: flex;

      .input-change {
        img {
          display: block;
          height: 0.42rem;
          width: 0.98rem;
          margin-top: 0.07rem;
        }
        display: flex;
        .change_img {
          margin-right: 0.2rem;
          margin-left: 0.1rem;
          width: 0.55rem;
          font-size: 0.15rem;
          p {
            margin: 0.05rem 0;
            color: #666;
          }
          span {
            color: #3b95e9;
          }
          // display: flex;
        }
      }
    }
    .login_container {
      margin: 0.28rem 0.14rem;
      font-size: 0.2rem;
      color: #fff;
      background-color: #4cd964;
      padding: 0.14rem 0;
      border: 0.01rem;
      border-radius: 0.05rem;
      text-align: center;
    }
  }
}
</style>