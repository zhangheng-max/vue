<template>
  <div class="Pronfile_info_address_add">
    <Header GoBack="true">
      <span slot="addressadd">新增地址</span>
    </Header>
    <section class="main">
      <section class="username">
        <div>
          <van-field
            class="input"
            :class="{[nameCheck]:'setname'}"
            v-model="name"
            placeholder="请填写你的名字"
            @input="InputChange(1)"
          />
          <p v-if="nameCheck">请填写您的名字</p>
        </div>
        <router-link to="/profile/info/address/add/addDetail" tag="div">
          <van-field class="input" disabled placeholder="小区/写字楼/学校等" />
        </router-link>
        <div>
          <van-field
            class="input"
            v-model="address"
            :class="{[addressCheck]:'setname'}"
            placeholder="请填写详细送餐地址"
            @input="InputChange(2)"
          />
          <p v-if="addressCheck">送餐地址太短了，不能辨识</p>
        </div>
        <div>
          <van-field
            class="input"
            v-model="phone"
            :class="{[phoneCheck]:'setname'}"
            placeholder="请填写能够联系到您的手机号"
            @input="InputChange(3)"
          />
          <p v-if="phoneCheck">请输入正确的手机号</p>
        </div>
        <div>
          <van-field
            class="input"
            :class="{[phone_bkCheck]:'setname'}"
            v-model="phone_bk"
            placeholder="备用联系电话（选填）"
            @input="InputChange(4)"
          />
          <p v-if="phone_bkCheck">请输入正确的手机号</p>
        </div>
      </section>
      <van-button type="info" :disabled="button" class="button" @click="addRess()">信息按钮</van-button>
    </section>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "../hfod/Header";
import { Toast } from "vant";
export default {
  data() {
    return {
      name: "",
      nameCheck: false,
      title: "",
      address: "",
      addressCheck: false,
      phone: "",
      phoneCheck: false,
      phone_bk: "",
      phone_bkCheck: false,
      button: true,
      a: true,
      b: true,
      c: true
    };
  },
  methods: {
    addRess() {
      this.Tast(0);
      this.$http
        .post(
          `http://elm.cangdu.org/v1/users/${this.$store.state.user.user_id}/addresses`,
          {
            address: this.address, //请填写详细送餐地址
            address_detail: "北京站",
            geohash: this.$store.state.geohash, //经纬度
            name: this.name, //名字
            phone: this.phone, //手机号
            phone_bk: this.phone_bk,
            poi_type: 0,
            sex: 1,
            tag: "公司",
            tag_type: 4
          }
        )
        .then(res => {
          if (res.data.status == 1) {
            this.Tast(100);
            this.$router.go(-1);
          } else {
            this.Tast(100);
            this.$dialog.alert({
              message: res.data.message
            });
          }
        });
    },
    InputChange(val) {
      if (val == 1) {
        if (this.name.length < 6 || this.name.length > 24) {
          this.nameCheck = "setname";
          this.a = true;
        } else {
          this.nameCheck = false;
          this.a = false;
        }
      }
      if (val == 2) {
        if (this.address.length < 6 || this.address.length > 24) {
          this.addressCheck = "setname";
          this.b = true;
        } else {
          this.addressCheck = false;
          this.b = false;
        }
      }
      if (val == 3) {
        let str = /^(185|175|173|152)\d{8}$/;
        if (str.test(this.phone)) {
          this.phoneCheck = false;
          this.c = false;
        } else {
          this.phoneCheck = "setname";
          this.c = true;
        }
      }
      if (val == 4) {
        let str = /^(185|175|173|152)\d{8}$/;
        if (str.test(this.phone_bk)) {
          this.phone_bkCheck = false;
        } else {
          this.phone_bkCheck = "setname";
        }
      }

      if (this.a == false && this.b == false && this.c == false) {
        this.button = false;
      } else {
        this.button = true;
      }
    },
    // 加载
    Tast(val) {
      Toast.loading({
        mask: true,
        message: "加载中...",
        duration: val
      });
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
        .setname {
          border: 0.01rem red solid;
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