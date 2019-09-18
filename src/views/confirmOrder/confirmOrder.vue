<template>
  <div class="confirmOrder">
    <Header GoBack="true" :Head="true">
      <span slot="confirm">确认订单</span>
    </Header>
    <section class="main">
      <!-- 地址 -->
      <section class="address_container">
        <div class="address_empty_left">
          <section>
            <van-icon name="location-o" class="location" />
            <div class="address_detail_container">
              <header>
                <p>32132342</p>
                <span>先生</span>
                <span>4314242</span>
              </header>
              <div class="address_detail">
                <span style="background-color: rgb(76, 217, 100);color:#fff;">公司</span>
                <p>北京站</p>
              </div>
            </div>
          </section>
          <van-icon name="arrow" class="arrow" />
        </div>
      </section>
      <!-- 送达时间 -->
      <section class="delivery_model">
        <p class="deliver_text">送达时间</p>
        <section class="deliver_time">
          <p>尽快送达 | 预计 07:33</p>
          <span class="deliver_time_order">蜂鸟专送</span>
        </section>
      </section>
      <!-- 支付方式 -->
      <section class="pay_way">
        <header class="header_style">
          <span class="header_top">支付方式</span>
          <div class="more_type">
            <span>在线支付</span>
            <van-icon name="arrow" class="arrow" />
          </div>
        </header>
        <section class="hongbo">
          <span>红包</span>
          <span>暂时只在饿了么 APP 中支持</span>
        </section>
      </section>
      <!-- 商品演示 -->
      <section class="food_list">
        <header>
          <img v-if="userData.image_path" :src="`//elm.cangdu.org/img/${userData.image_path}`" />
          <img v-else src />
          <span>{{userData.name}}</span>
        </header>
        <ul class="food_list_ul">
          <li class="food_item_style" v-for="(v,i) in data" :key="i">
            <p class="food_name">{{v.name}}</p>
            <div class="num_price">
              <span class="num">x {{v.num}}</span>
              <span class="price">¥{{v.price}}</span>
            </div>
          </li>
        </ul>
        <!-- 餐盒费 -->
        <div class="food_item_style">
          <p class="food_name">餐盒</p>
          <div class="num_price">
            <span class="num"></span>
            <span class="price">¥20</span>
          </div>
        </div>
        <!-- 餐盒费 -->
        <div class="food_item_style">
          <p class="food_name">配送费</p>
          <div class="num_price">
            <span class="num"></span>
            <span class="price">¥20</span>
          </div>
        </div>
        <!-- 订单费 -->
        <div class="food_item_style total_price">
          <p class="food_name">订单 ¥68</p>
          <div class="num_price">
            <span class="num">待支付 ¥68</span>
          </div>
        </div>
      </section>
      <!-- 订单备注 -->
      <section class="pay_way">
        <header class="header_style">
          <span class="header_top">订单备注</span>
          <div class="more_type">
            <span>口味、偏好等</span>
            <van-icon name="arrow" class="arrow" />
          </div>
        </header>
        <header class="header_style">
          <span class="header_top">发票抬头</span>
          <div class="more_type">
            <span>不需要开发票</span>
            <van-icon name="arrow" class="arrow" />
          </div>
        </header>
      </section>
    </section>
    <footer class="footer">
      <p class="price">待支付 ¥960</p>
      <p class="order" @click="DataOber()">确认下单</p>
    </footer>
  </div>
</template>

<script>
import { Dialog } from "vant";
import Header from "../hfod/Header";
export default {
  data() {
    return {
      userData: []
    };
  },
  components: {
    Header
  },
  computed: {
    data() {
      return this.$store.state.user.data;
    }
  },
  methods: {
    //   获取商品id信息
    GoData() {
      this.$http
        .post(`http://elm.cangdu.org/v1/carts/checkout`, {
          come_from: "web",
          entities: this.data,
          geohash: this.$route.query.geohash,
          restaurant_id: this.$route.query.shopId
        })
        .then(res => {
          console.log(res);
          //   this.userData = res.data;
        });
    },
    //请求user数据
    Gouser() {
      this.$http
        .get(
          `http://elm.cangdu.org/v1/user?user_id=${this.$route.query.shopId}`
        )
        .then(res => {
          console.log(res);
          //   this.userData = res.data;
        });
    },

    //请求收货地址
    Address() {
      this.$http
        .get(
          `http://elm.cangdu.org/v1/users/${this.$route.query.shopId}/addresses`
        )
        .then(res => {
          console.log(res);
          //   this.userData = res.data;
        });
    },

    // 下单
    DataOber() {
      if (this.$store.state.user.user_check == false) {
        Dialog.confirm({
          message: "请先登录!!!"
        })
          .then(() => {
            // on confirm
            this.$router.push({ path: "/login" });
          })
          .catch(() => {
            // on cancel
          });
      } else {
        //跳转到支付页面
      }
    }
  },
  mounted() {
    // this.GoData();
  }
};
</script>

<style lang="scss" scoped>
.confirmOrder {
  width: 100%;
  display: flex;
  height: 100%;
  font-family: Helvetica Neue, Tahoma, Arial;
  text-decoration: none;
  flex-direction: column;
  .main {
    padding-top: 0.56rem;
    flex-grow: 1;
    padding-bottom: 0.84rem;
    .address_container {
      padding: 0 0.16rem;
      display: flex;
      //   background: #fff;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAGCAYAAACMyr1NAAAAAXNSR0IArs4c6QAAANxJREFUOBFjZICCpoUPWhn+M7rD+OTQjP8ZztQmymfg0/tr95JlDAz/I/GpISTHyMiwj9Ul1hmbOiaQYNfSx6qUegZkDisD01QQjQv837NMD+iYCFzyxIr/Z2asxqWWBSTx49e/LAZGXEqIFP/PcLgiUfYyPtV/GP62/P9PmU3AANnM6hhzApc9TB3zH+sCrbDFpYBYcQ42pmn41P7av8QC6BlffGoIyTEyMv5nYWCuwaeO6TfDv2x8CoiSY/y/syxa9jY+tYx//7fikydGDhggKxhdoi4Ro3bYqAEAknE5DXYMR0IAAAAASUVORK5CYII=)
        0 100% repeat-x #fff;
      background-size: auto 0.04rem;
      .address_empty_left {
        width: 100%;
        display: flex;
        justify-content: space-between;
        section {
          display: flex;
          .location {
            font-size: 0.25rem;
            color: #3190e8;
            line-height: 1rem;
            margin-right: 0.06rem;
          }
          .address_detail_container {
            margin: auto 0;
            header {
              display: flex;
              p {
                font-size: 0.25rem;
                font-weight: 700;
              }
              span {
                line-height: 0.36rem;
                margin-left: 0.1rem;
              }
            }
            .address_detail {
              display: flex;
              span {
                border-radius: 0.05rem;
                font-size: 0.14rem;
                padding: 0 0.05rem;
                height: 0.2rem;
              }
              p {
                height: 0.2rem;
                font-size: 0.16rem;
                color: #777;
                margin-left: 0.07rem;
                line-height: 0.2rem;
              }
            }
          }
        }
        .arrow {
          margin: auto 0;
          font-size: 0.25rem;
          color: #999;
        }
      }
    }
    .delivery_model {
      margin-top: 0.11rem;
      padding: 0 0.19rem;
      display: flex;
      justify-content: space-between;
      background: #fff;
      height: 1.12rem;
      border-left: 0.06rem solid #3190e8;
      .deliver_text {
        display: block;
        margin: auto 0;
        padding-left: 0.08rem;
        font-size: 0.25rem;
        font-weight: 700;
      }
      .deliver_time {
        margin: auto 0;
        p {
          color: #3190e8;
          font-size: 0.19rem;
        }
        .deliver_time_order {
          float: right;
          font-size: 0.14rem;
          color: #fff;
          background-color: #3190e8;
          // width: 2.4rem;
          margin-top: 0.14rem;
          text-align: center;
          border-radius: 0.03rem;
          padding: 0.02rem 0.04rem;
        }
      }
    }
    .pay_way {
      padding: 0 0.19rem;
      margin-top: 0.11rem;
      background: #fff;
      .header_style {
        display: flex;
        height: 0.56rem;
        justify-content: space-between;

        .header_top {
          font-size: 0.2rem;
          color: #666;
          line-height: 0.56rem;
        }
        .more_type {
          display: flex;
          span {
            line-height: 0.56rem;
            font-size: 0.16rem;
            color: #aaa;
          }
          .arrow {
            font-size: 0.16rem;
            color: #aaa;
            line-height: 0.56rem;
            margin-left: 0.1rem;
          }
        }
      }
      .hongbo {
        border-top: 0.01rem solid #f5f5f5;
        display: flex;
        height: 0.56rem;
        justify-content: space-between;
        span {
          line-height: 0.56rem;
          color: #aaa;
        }
      }
    }
    .food_list {
      margin-top: 0.11rem;
      background: #fff;
      header {
        border-bottom: 0.01rem solid #f5f5f5;
        display: flex;
        padding: 0.19rem;
        img {
          width: 0.33rem;
          height: 0.33rem;
          background: #f5f5f5;
        }
        span {
          display: block;
          margin: auto 0;
          font-size: 0.24rem;
          margin-left: 0.1rem;
          color: #333;
        }
      }
      .food_item_style {
        padding: 0 0.19rem;
        display: flex;
        height: 0.5rem;
        .food_name {
          flex-grow: 1;
          padding: 0;
          line-height: 0.5rem;
          font-style: normal;
          text-decoration: none;
          color: #666;
          font-weight: 400;
        }
        .num_price {
          span {
            margin-left: 0.4rem;
            line-height: 0.5rem;
            color: #666;
          }
          .num {
            color: #f60;
          }
        }
      }
      .food_list_ul {
        padding-top: 0.14rem;
      }
      .total_price {
        border-top: 0.01rem solid #f5f5f5;
        .num {
          font-size: 0.2rem;
        }
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 0.56rem;
    display: flex;
    background: #3c3c3c;
    .price {
      flex: 5;
      padding-left: 0.25rem;
      font-size: 0.21rem;
      line-height: 0.56rem;
      color: #fff;
    }
    .order {
      flex: 2;
      background-color: #56d176;
      text-align: center;
      line-height: 0.56rem;
      color: #fff;
      font-size: 0.21rem;
    }
  }
}
</style>