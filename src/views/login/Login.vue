<template>
  <div class="Login">
    <Header GoBack="true">
      <span slot="login">密码登录</span>
    </Header>
    <main class="main">
      <div class="logininpit">
        <section class="input_container">
          <!-- 账号 -->
          <mt-field v-model="user" placeholder="账号"></mt-field>
        </section>
        <section class="input_container">
          <!-- 密码 -->
          <mt-field v-model="pass" :type="type" placeholder="密码">
            <mt-switch v-model="check" @change="changeCheck()"></mt-switch>
          </mt-field>
        </section>
        <section class="input_container">
          <!-- 验证码 -->
          <mt-field v-model="code" type placeholder="验证码">
            <div class="input-change">
              <img
                v-if="codeimg"
                style="background: #fff"
                :src="codeimg"
                height="0.42rem"
                width="0.98rem"
              />
              <div class="change_img" @click="begImg()">
                <p>看不清</p>
                <span>换一张</span>
              </div>
            </div>
          </mt-field>
        </section>
      </div>
      <p class="login_tips">温馨提示：未注册过的账号，登录时将自动注册</p>
      <p class="login_tips">注册过的用户可凭账号密码登录</p>
      <div class="login_container">
        <mt-button type="default" class="button" @click="Submit()">登录</mt-button>
      </div>
      <div class="to_forget">
        <a href="#">重置密码？</a>
      </div>
    </main>
  </div>
</template>

<script>
import Header from "../hfod/Header";
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
  data() {
    return {
      user: "", //账号
      pass: "", //密码
      code: "", //验证码
      codeimg: "", //验证码图片路径
      check: true, //显示或隐藏密码按钮的状态
      type: "password" //密码的状态
    };
  },
  components: {
    Header
  },
  mounted() {
    //请求验证码
    this.begImg();
  },
  methods: {
    //显示或隐藏密码
    changeCheck() {
      // console.log(this.check);
      if (this.check == true) {
        this.type = "password";
      } else {
        this.type = "text";
      }
    },

    //请求验证码
    begImg() {
      axios.post(`http://elm.cangdu.org/v1/captchas`).then(res => {
        // console.log(res.data.code);
        this.codeimg = res.data.code;
      });
    },
    //提价
    Submit() {
      axios
        .post(`http://elm.cangdu.org/v2/login`, {
          captcha_code: this.code,
          password: this.pass,
          username: this.user
        })
        .then(res => {
          // console.log(res);
          if (res.data.status == 0) {
            this.$dialog.alert({
              message: res.data.message
            });
          } else {
            let obj = {
              user_id: res.data.id,
              user_check: true,
              user_name: res.data.username
            };
            console.log(obj);

            this.$store.commit("userSetId", obj);
            this.$router.go(-1);
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.Login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .main {
    margin-top: 0.7rem;
    flex-grow: 1;
    .input_container {
      padding: 0 0.22rem;
      border-bottom: 0.01rem solid #f1f1f1;
      background: #fff;
      img {
        width: 0.98rem;
        height: 0.42rem;
        background: #000;
      }
      .input-change {
        display: flex;
        .change_img {
          margin-left: 0.1rem;
          p {
            margin: 0.05rem 0;
            color: #666;
            font-size: 0.14rem;
          }
          span {
            color: #3b95e9;
            font-size: 0.14rem;
          }
        }
      }
    }
    .login_tips {
      font-size: 0.14rem;
      color: red;
      padding: 0.11rem 0.16rem;
      line-height: 0.14rem;
    }
    .login_container {
      padding: 0.14rem 0;
      margin: 0 0.14rem 0.1rem 0.14rem;
      button {
        width: 100%;
        color: #fff;
        background-color: #4cd964;
        border: 1px;
        font-size: 0.2rem;
        height: 0.5rem;
        border-radius: 0.05rem;
      }
    }
    .to_forget {
      float: right;
      margin-right: 0.1rem;
      font-size: 0.16rem;
      a {
        color: #3b95e9;
      }
    }
  }
}
</style>