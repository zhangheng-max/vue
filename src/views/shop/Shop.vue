<template>
  <!-- 商品添加页面 -->
  <div class="Shop">
    <header class="header">
      <span class="header-inco">
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </span>
      <img src="//elm.cangdu.org/img/16c0ec7e94749531.png" class="img" alt />
      <section class="description_header">
        <section class="description_top">
          <section class="description_left">
            <img src="//elm.cangdu.org/img/16c0ec7e94749531.png" alt />
          </section>
          <section class="description_right">
            <h4>工大5餐厅不是fhfghfghfghf</h4>
            <p class="description_text">商家配送／分钟送达／配送费¥9</p>
            <p class="description_promotion">公告：2</p>
          </section>
          <div class="icon">
            <van-icon class="inco" name="arrow" />
          </div>
        </section>
        <div class="description_footer">
          <p class="ellipsis">
            <span
              data-v-c8684834
              class="tip_icon"
              style="background-color: rgb(240, 115, 115); border-color: rgb(240, 115, 115);"
            >减</span>
            <span>满30减5，满60减8（APP专享）</span>
          </p>
          <p>1个活动</p>
          <van-icon name="arrow" class="tip_p_icon" />
        </div>
      </section>
    </header>
    <section class="change_show_type">
      <ul>
        <li>
          <span class="span">商品</span>
        </li>
        <li>
          <span>评价</span>
        </li>
      </ul>
    </section>
    <main class="main">
      <div class="main-left">
        <van-sidebar v-model="activeKey" @change="active()" class="sidebar-item" ref="item">
          <van-sidebar-item v-for="(v,i) in info" :key="i" :title="v.name" @click="selectNenu(i)" />
        </van-sidebar>
      </div>

      <div class="main-right" ref="foodwrapper">
        <div v-for="(y,k) in info" :key="k" class="mainbouutn">
          <header class="menu_detail_header li">
            <section class="menu_detail_header_left">
              <span class="menu_item_title">{{y.name}}</span>
              <span class="menu_item_description">{{y.description}}</span>
            </section>
            <span class="menu_detail_header_right">
              <van-icon name="ellipsis" />
            </span>
          </header>
          <section class="menu_detail_list" v-for="(v,i) in y.foods" :key="i">
            <section class="menu_detail_link">
              <!-- 图片 -->
              <section class="menu_food_img">
                <img src="//elm.cangdu.org/img/166ccefb30b20519.jpg" />
              </section>
              <!-- 内容 -->
              <section class="menu_food_description">
                <p class="food_description_head">
                  <span class="food_description_head_span">{{v.name}}</span>
                  <span class="food_description_head_span2">招聘</span>
                </p>
                <p class="food_description_content">{{v.description}}</p>
                <p class="food_description_sale_rating">
                  <span>月售{{v.month_sales}}份</span>
                  <span>好评率{{v.satisfy_rate}}%</span>
                </p>
                <p class="food_activity" v-if="v.activity">
                  <span>{{v.activity.image_text}}</span>
                </p>
              </section>
            </section>
            <!-- 添加 -->
            <footer class="menu_detail_footer">
              <section class="food_price">
                <span class="food_price_1">¥</span>
                <span class="food_price_2">{{v.specfoods[0].price}}</span>
                <span class="food_price_3">起</span>
              </section>
              <section class="cart_module">
                <section class="cart_button" v-if="v.specfoods.length==1">
                  <span v-if="show(v.item_id)">
                    <van-icon name="clear" class="clear" @click="minusData(v.specfoods[0])" />
                  </span>
                  <span class="cart_num" v-if="show(v.item_id)">
                    <span>{{num(v.specfoods[0])}}</span>
                  </span>
                  <span>
                    <van-icon name="add" class="clear" @click="addData(v.specfoods[0],$event)" />
                  </span>
                </section>
                <section class="choose_icon_container" v-else>
                  <van-button type="info" class="button">选取规格</van-button>
                </section>
              </section>
            </footer>
          </section>
        </div>
      </div>
    </main>

    <!-- 底部 -->
    <footer class="footer">
      <section class="buy_cart_container">
        <section class="cart_icon_num" @click="hide()">
          <span v-if="data.length>0">
            <van-icon name="shopping-cart" :info="number" class="shopping-cart" />
          </span>
          <span class="span1" v-else>
            <van-icon name="shopping-cart" class="shopping-cart" />
          </span>
        </section>
        <section class="cart_num">
          <div class="cart_num_1">¥ {{price.toFixed(2)}}</div>
          <div class="cart_num_2">配送费¥5</div>
        </section>
      </section>
      <section class="gotopay">
        <van-button type="primary" v-if="price>=20" class="button" @click="GoOrder()">去结算</van-button>
        <span v-else>还差¥{{20-price}}起送</span>
      </section>
    </footer>

    <!-- 购物车 -->
    <section class="cart_food_list" v-if="check&&data.length>0">
      <div class="cart_food_list-top">
        <h4>购物车</h4>
        <div @click="del()">
          <van-icon name="delete" class="delete" />
          <span>清空</span>
        </div>
      </div>
      <section class="cart_food_details">
        <ul>
          <li v-for="(v,i) in this.data" :key="i">
            <div class="cart_list_num">
              <p class="cart_list_num_ellipsis">{{v.name}}</p>
              <p class="cart_list_num_toellipsis">{{v.specs_name}}</p>
            </div>
            <div class="cart_list_price">
              <span class="cart_list_price_min">¥</span>
              <span class="cart_list_price_max">{{v.price*v.num}}</span>
            </div>
            <div class="cart_list_control">
              <span>
                <van-icon name="clear" class="clear" @click="minusData(v)" />
              </span>
              <span class="cart_num">{{v.num}}</span>
              <span>
                <van-icon name="add" class="clear" @click="addData(v,$event)" />
              </span>
            </div>
          </li>
        </ul>
      </section>
    </section>
    <!-- 全屏阴影 -->
    <div class="screen_cover" v-if="check&&data.length>0"></div>
    <Gif :shouGit="shouGit"></Gif>
  </div>
</template>

<script>
import jq from "jquery";
import Header from "../hfod/Header";
import Gif from "../Gif/Gif";
import { mapState } from "vuex";
import thBall from "./thBall.js";
export default {
  data() {
    return {
      info: [], //页面数据
      activeKey: 0, //第几个显示
      shouGit: true,
      scroll: [], //计算的所有高度
      arr: [], //添加的数据
      check: false
    };
  },
  components: {
    Header,
    Gif
  },
  computed: {
    data() {
      if (this.$store.state.user.data.length == 0) {
        this.check = false;
      }
      return this.$store.state.user.data;
    },
    number() {
      return this.$store.getters.num;
    },
    price() {
      return this.$store.getters.price;
    }
  },
  methods: {
    active() {
      //   console.log(this.activeKey);
    },
    // 获取全部商品信息
    GoShop() {
      this.shouGit = true;
      this.$http
        .get(
          `http://elm.cangdu.org/shopping/v2/menu?restaurant_id=${this.$route.query.id}`
        )
        .then(res => {
          // console.log(res.data);
          this.info = res.data;
          this.shouGit = false;
          this.$nextTick(() => {
            this._countHeight();
          });
        });
      this.$refs.foodwrapper.addEventListener("scroll", this._initScroll);
    },
    _countHeight() {
      let scroll = this.$refs.foodwrapper.getElementsByClassName("mainbouutn");
      let height = 0;
      this.scroll.push(height);
      for (let i = 0; i < scroll.length; i++) {
        height += scroll[i].clientHeight;
        this.scroll.push(height);
      }
      // console.log(this.scroll);
    },
    selectNenu(i) {
      this.activeKey = i;
      this.$refs.foodwrapper.removeEventListener("scroll", this._initScroll);
      jq(this.$refs.foodwrapper).animate(
        { scrollTop: this.scroll[i] },
        500,
        () => {
          this.$refs.foodwrapper.addEventListener("scroll", this._initScroll);
        }
      );
    },
    _initScroll() {
      let scrollY = this.$refs.foodwrapper.scrollTop;
      for (let i = 0; i < this.scroll.length; i++) {
        let height1 = this.scroll[i];
        let height2 = this.scroll[i + 1];
        if (scrollY >= height1 && scrollY < height2) {
          this.activeKey = i;
        }
      }
    },
    addData(obj, e) {
      // console.log(v);
      thBall(e);
      this.$store.commit("addData", obj);
    },
    minusData(obj) {
      this.$store.commit("minusData", obj);
    },
    del() {
      this.$store.commit("del");
      this.check = false;
    },
    show(id) {
      let arr = [...this.data];
      let check = arr.some(v => {
        return v.item_id == id;
      });
      return check;
    },
    hide() {
      if (this.data.length > 0) {
        this.check = !this.check;
      } else {
        this.check = false;
      }
    },
    num(obj) {
      let arr = [...this.data];
      let num = 0;
      for (let i in arr) {
        if (arr[i].item_id == obj.item_id) {
          num = arr[i].num;
        } else {
          num = 0;
        }
      }
      return num;
    },
    GoOrder() {
      this.$router.push({
        path: "/confirmOrder",
        query: {
          geohash: this.$route.query.geohash,
          shopId: this.$route.query.id
        }
      });
    }
  },
  mounted() {
    // console.log(this.data);

    this.GoShop();
  }
};
</script>

<style lang="scss" scoped>
@import "./thBall.css";
.Shop {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    overflow: hidden;
    position: relative;
    .header-inco {
      position: absolute;
      top: 0.1rem;
      left: 0.1rem;
      font-size: 0.25rem;
      z-index: 99;
      color: #fff;
    }
    .img {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      height: 4.5rem;
      z-index: 9;
      filter: blur(0.1rem);
    }
    .description_header {
      position: relative;
      z-index: 10;
      background-color: rgba(119, 103, 137, 0.43);
      padding: 0.5rem 0 0.11rem 0.11rem;
      .description_top {
        width: 100%;
        overflow: hidden;
        display: flex;
        .description_left {
          margin-right: 0.1rem;
          img {
            width: 0.81rem;
            height: 0.81rem;
            display: block;
          }
        }
        .description_right {
          flex-grow: 1;
          h4 {
            width: 2.7rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 0.23rem;
            color: #fff;
            font-weight: 700;
            margin-bottom: 0.08rem;
          }
          .description_text {
            font-size: 0.145rem;
            color: #fff;
            margin-bottom: 0.06rem;
          }
          .description_promotion {
            font-size: 0.145rem;
            color: #fff;
          }
        }
        .icon {
          .inco {
            margin-right: 0.1rem;
            font-size: 0.2rem;
            color: #fff;
            line-height: 0.81rem;
          }
        }
      }
      .description_footer {
        margin-top: 0.15rem;
        display: flex;
        justify-content: space-between;
        font-size: 0.14rem;
        color: #fff;
        .ellipsis {
          flex-grow: 1;
          font-size: 0.14rem;
          color: #fff;
          .tip_icon {
            margin-right: 0.1rem;
          }
        }
        .tip_p_icon {
          margin-right: 0.1rem;
          font-size: 0.2rem;
          color: #fff;
        }
      }
    }
  }
  .change_show_type {
    width: 100%;
    ul {
      display: flex;
      justify-content: space-around;
      background: #fff;
      li {
        span {
          line-height: 0.56rem;
          padding: 0.05rem;
        }
        .span {
          color: #3190e8;
          border-bottom: 0.03rem solid #3190e8;
        }
      }
    }
  }
  .main {
    flex: 1;
    overflow: hidden;
    display: flex;
    .main-left {
      width: 25%;
      // flex: 4;
      overflow-y: auto;

      .sidebar-item {
        width: 100%;
        .van-sidebar-item {
          padding: 0.245rem 0.1rem;
          font-size: 0.16rem;
        }
      }
    }
    .main-right {
      // flex: 4;
      overflow-y: auto;
      width: 75%;
      margin-bottom: 0.7rem;
      .mainbouutn {
        .menu_detail_header {
          display: flex;
          justify-content: space-between;
          .menu_detail_header_left {
            padding: 0.11rem;
            .menu_item_title {
              font-weight: 700;
              font-size: 0.2rem;
              margin-right: 0.1rem;
              color: #666;
            }
          }
          .menu_item_description {
            font-size: 0.14rem;
            color: #999;
          }
          .menu_detail_header_right {
            line-height: 0.48rem;
            margin-right: 0.1rem;
            color: #999;
          }
        }
        .menu_detail_list {
          border-bottom: 0.01rem solid #f8f8f8;
          background: #fff;
          padding: 0.16rem 0.11rem;
          .menu_detail_link {
            display: flex;
            .menu_food_img {
              margin-right: 0.1rem;
              img {
                width: 0.56rem;
                height: 0.56rem;
                display: block;
              }
            }
            .menu_food_description {
              flex-grow: 1;
              .food_description_head {
                display: flex;
                justify-content: space-between;
                .food_description_head_span {
                  display: block;
                  font-size: 0.19rem;
                  width: 1.5rem;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
                .food_description_head_span2 {
                  display: block;
                  padding: 0.01rem 0.05rem;
                  border: 1px solid rgb(240, 115, 115);
                  border-radius: 0.3rem;
                  color: rgb(240, 115, 115);
                  transform: scale(0.55);
                }
              }
              .food_description_content {
                font-size: 0.14rem;
                color: #999;
                margin-top: 0.05rem;
              }
              .food_description_sale_rating {
                span {
                  margin-right: 0.2rem;
                  font-size: 0.14rem;
                  color: #333;
                }
              }
              .food_activity {
                span {
                  color: rgb(241, 136, 79);
                  font-size: 0.1rem;
                  margin-top: 0.05rem;
                  border: 0.01rem solid rgb(240, 115, 115);
                  border-radius: 0.3rem;
                  padding: 0 0.04rem;
                }
              }
            }
          }
        }
        .menu_detail_footer {
          margin: 0.08rem 0 0 0.67rem;
          display: flex;
          justify-content: space-between;
          .food_price {
            .food_price_1 {
              font-size: 0.14rem;
              color: #f60;
            }
            .food_price_2 {
              font-size: 0.19rem;
              font-weight: 600;
              color: #f60;
            }
            .food_price_3 {
              font-size: 0.16rem;
              margin-left: 0.1rem;
              color: #666;
            }
          }
          .cart_module {
            display: flex;
            .cart_button {
              display: flex;
              .clear {
                font-size: 0.22rem;
                color: #3190e8;
                line-height: 0.33rem;
              }
              .cart_num {
                line-height: 0.33rem;
                margin: 0 0.1rem;
              }
            }
            .choose_icon_container {
              .button {
                width: 0.56rem;
                padding: 0;
                line-height: 0.27rem;
                border-radius: 0.05rem;
                height: 0.27rem;
              }
            }
          }
        }
      }
    }
  }
  .footer {
    display: none;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 0.56rem;
    background: #333;
    display: flex;
    z-index: 100;
    justify-content: space-between;
    .buy_cart_container {
      display: flex;
      .cart_icon_num {
        text-align: center;
        margin-left: 0.12rem;
        margin-top: -0.25rem;
        border-radius: 50%;
        width: 0.56rem;
        height: 0.56rem;
        background: rgb(32, 115, 193);
        border: 0.05rem solid #444;
        .span1 {
          display: block;
          width: 0.58rem;
          height: 0.58rem;
          border-radius: 50%;
          background: #333;
          margin-left: -0.01rem;
          margin-top: -0.01rem;
        }
        .shopping-cart {
          font-size: 0.4rem;
          color: #fff;
          margin-top: 0.08rem;
          .van-info {
            top: -0.1rem;
            right: -0.1rem;
            width: 0.2rem;
            height: 0.2rem;
            line-height: 0.2rem;
          }
        }
      }
      .cart_num {
        margin-left: 0.2rem;
        .cart_num_1 {
          font-size: 0.25rem;
          font-weight: 700;
          color: #fff;
        }
        .cart_num_2 {
          font-size: 0.12rem;
          color: #fff;
        }
      }
    }
    .gotopay {
      width: 1.4rem;
      background-color: #535356;
      text-align: center;
      span {
        width: 1.4rem;
        height: 100%;
        font-size: 0.2rem;
        font-weight: 700;
        line-height: 0.56rem;
        color: #fff;
      }
      .button {
        width: 1.4rem;
        height: 100%;
        font-size: 0.2rem;
        font-weight: 700;
        color: #fff;
      }
    }
  }
  .cart_food_list {
    position: fixed;
    width: 100%;
    bottom: 0;
    padding-bottom: 0.85rem;
    z-index: 99;
    background: #fff;
    .cart_food_list-top {
      display: flex;
      justify-content: space-between;
      padding: 0.15rem 0.165rem;
      background: #eceff1;
      color: #333;
      h4 {
        font-weight: normal;
        font-size: 0.2rem;
        color: #666;
      }
      div {
        display: flex;
        .delete {
          line-height: 0.25rem;
          margin-right: 0.05rem;
        }
        span {
          font-size: 0.16rem;
          color: #666;
        }
      }
    }
    .cart_food_details {
      ul {
        li {
          padding: 0.165rem 0.145rem;
          display: flex;
          justify-content: space-between;
          .cart_list_num {
            width: 55%;
            .cart_list_num_ellipsis {
              font-size: 0.19rem;
              font-weight: 700;
              color: #666;
              width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .cart_list_num_toellipsis {
              font-size: 0.12rem;
              color: #666;
            }
          }
          .cart_list_price {
            .cart_list_price_min {
              font-size: 0.16rem;
              color: #f60;
              line-height: 0.44rem;
            }
            .cart_list_price_max {
              color: #f60;
              font-size: 0.2rem;
              font-weight: 600;
            }
          }
          .cart_list_control {
            display: flex;
            .clear {
              font-size: 0.27rem;
              color: #3190e8;
              line-height: 0.44rem;
            }
            .cart_num {
              line-height: 0.44rem;
              margin: 0 0.1rem;
            }
          }
        }
      }
    }
  }
  .screen_cover {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 97;
    background: rgba(0, 0, 0, 0.3);
  }
}
</style>