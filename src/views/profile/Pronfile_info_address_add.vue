<template>
  <div class="Pronfile_info_address_add">
    <Header GoBack="true">
      <span slot="addressadd">新增地址</span>
    </Header>
    <section class="main">
      <section class="username">
        <div>
          <van-field class="input" v-model="name" placeholder="请填写你的名字" />
          <p>请填写您的名字</p>
        </div>
        <div>
          <van-field class="input" disabled placeholder="小区/写字楼/学校等" />
          <p></p>
        </div>
        <div>
          <van-field class="input" v-model="address" placeholder="请填写详细送餐地址" />
          <p>送餐地址太短了，不能辨识</p>
        </div>
        <div>
          <van-field class="input" v-model="phone" placeholder="请填写能够联系到您的手机号" />
          <p>请输入正确的手机号</p>
        </div>
        <div>
          <van-field class="input" v-model="phone_bk" placeholder="备用联系电话（选填）" />
          <p>请输入正确的手机号</p>
        </div>
      </section>
      <van-button type="info" :disabled="button" class="button" @click="addRess()">信息按钮</van-button>
    </section>
  </div>
</template>

<script>
import Header from "../hfod/Header";
import { Toast } from "vant";
export default {
  data() {
    return {
      title: "",
      button: false,
      name: "",
      address: "",
      phone: "",
      phone_bk: "",
      duration: 0
    };
  },
  methods: {
    addRess() {
      this.$http
        .post(
          `http://elm.cangdu.org/v1/users/${this.$store.state.user.user_id}/addresses`,
          {
            address: this.address,
            address_detail: "北京站",
            geohash: this.$store.state.geohash,
            name: this.name,
            phone: this.phone,
            phone_bk: this.phone_bk,
            poi_type: 0,
            sex: 1,
            tag: "公司",
            tag_type: 4
          }
        )
        .then(res => {
          if (res.data.status == 1) {
          } else {
            this.$dialog.alert({
              message: res.data.message
            });
          }
        });

      // this.$dialog.alert({
      //   message: "请填写完容"
      // });
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="scss" scoped>
.Pronfile_info_address_add {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 99;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  .main {
    flex-grow: 1;
    padding-top: 0.65rem;
    .username {
      background: #fff;
      padding: 0.1rem 0.15rem;
      border-top: 0.01rem solid #ccc;
      div {
        .input {
          width: 100%;
          background: #f5f5f5;
          border: 0.01rem #ccc solid;
          font-size: 0.18rem;
          border-radius: 0.05rem;
          margin-top: 0.1rem;
        }
        .setname-input {
          border: 0.01rem red solid;
        }
        .setname {
          color: red;
        }
        p {
          font-size: 0.14rem;
          margin-top: 0.05rem;
          color: red;
        }
      }
    }
    .button {
      width: 94%;
      border-radius: 0.05rem;
      margin: 0 auto;
      margin-top: 0.2rem;
      display: block;
    }
  }
}
</style>