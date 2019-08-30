<template>
  <div class="Profile_info">
    <Header GoBack="true">
      <span slot="profile_info">用户信息</span>
    </Header>
    <section class="profile-info">
      <section class="headportrait">
        <input type="file" class="profileinfopanel-upload" @input="File()" />
        <h2>头像</h2>
        <div class="headportrait-div">
          <img :src="`https://elm.cangdu.org/img/${info.avatar}`" class="headportrait-div-top" />
          <span class="headportrait-div-bottom">
            <van-icon name="arrow" class="headportrait-div-bottom-inco" />
          </span>
        </div>
      </section>
      <router-link to="/profile/info/setusername" tag="section" class="headportrait headportraitwo">
        <h2>用户名</h2>
        <div class="headportrait-div">
          <p>{{info.username}}</p>
          <span class="headportrait-div-bottom">
            <van-icon name="arrow" class="headportrait-div-bottom-inco" />
          </span>
        </div>
      </router-link>
      <router-link
        to="/profile/info/address"
        tag="section"
        class="headportrait headportraitwo headportraithree"
      >
        <h2>收货地址</h2>
        <div class="headportrait-div">
          <span class="headportrait-div-bottom">
            <van-icon name="arrow" class="headportrait-div-bottom-inco" />
          </span>
        </div>
      </router-link>
      <section class="bind-phone">账号绑定</section>
      <section class="headportrait headportraitwo">
        <h2>
          <img
            src="data:image/png;base64,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"
            alt
            style="margin-right: 0.1rem; "
          />手机
        </h2>
        <div class="headportrait-div">
          <span class="headportrait-div-bottom">
            <van-icon name="arrow" class="headportrait-div-bottom-inco" />
          </span>
        </div>
      </section>
      <section class="bind-phone">安全设置</section>
      <section class="headportrait headportraitwo">
        <h2>登录密码</h2>
        <div class="headportrait-div">
          <p>修改</p>
          <span class="headportrait-div-bottom">
            <van-icon name="arrow" class="headportrait-div-bottom-inco" />
          </span>
        </div>
      </section>
      <section class="danger">
        <van-button type="danger" class="button" @click="Danger()">退出登录</van-button>
      </section>
    </section>
    <router-view></router-view>
  </div>
</template>

<script>
import { Dialog } from "vant";

// Dialog({ message: "提示" });
import Header from "../hfod/Header";
export default {
  data() {
    return {
      value: "",
      info: [] //页面数据
    };
  },
  components: {
    Header
  },
  methods: {
    Danger() {
      Dialog.confirm({
        title: "退出登录",
        message: "您确定要退出登录吗?"
      })
        .then(() => {
          // on confirm
          this.$store.commit("Danger");
          this.$router.push({ path: "/profile" });
        })
        .catch(() => {
          // on cancel
        });
      this.$router;
    },
    File() {
      console.log(this.value);
    }
  },
  mounted() {
    let user_id = this.$store.state.user.user_id;
    if (user_id) {
      this.$http
        .get(`http://elm.cangdu.org/v1/user?user_id=${user_id}`)
        .then(res => {
          if (res.status == 200) {
            this.info = res.data;
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.Profile_info {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f5f5f5;
  z-index: 200;
  display: flex;
  flex-direction: column;

  .profile-info {
    margin-top: 0.65rem;

    .headportrait {
      background: #fff;
      border-top: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      padding: 0.11rem 0.12rem;
      padding-right: 0.1rem;
      position: relative;
      .profileinfopanel-upload {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        left: 0;
        bottom: 0;
        opacity: 0;
      }
      p {
        display: block;
        margin-top: 0.15rem;
        color: #999;
        font-weight: 500;
      }
      h2 {
        display: flex;
        font-weight: normal;
        font-size: 0.18rem;
        color: #333;
        margin: auto 0;
      }
      .headportrait-div {
        display: flex;
        .headportrait-div-top {
          width: 0.56rem;
          height: 0.56rem;
          margin-right: 0.05rem;
          border-radius: 50%;
        }
        .headportrait-div-bottom {
          .headportrait-div-bottom-inco {
            line-height: 0.56rem;
            font-size: 0.25rem;
            color: rgb(216, 216, 216);
          }
        }
      }
    }
    .headportraitwo {
      margin: 0;
      padding: 0 0.14rem 0 0.1rem;
    }
    .headportraithree {
      border-bottom: 1px solid #ddd;
    }
    .danger {
      margin-top: 0.3rem;
      padding: 0 0.1rem;
      .button {
        width: 100%;
        border-radius: 0.05rem;
        font-size: 0.18rem;
      }
    }
  }
  .bind-phone {
    padding: 0.11rem;
    font-size: 0.14rem;
    color: #666;
  }
}
</style>