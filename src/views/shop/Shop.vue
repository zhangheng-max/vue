<template>
  <!-- 商品添加页面 -->
  <div class="Shop">
    <header class="header">
      <span class="header-inco">
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </span>
      <ul>
        <li>
          <span class="span">商品</span>
        </li>
        <li>
          <span>评价</span>
        </li>
      </ul>
    </header>
    <main class="main">
      <div class="main-left">
        <van-sidebar v-model="activeKey" @change="active()" class="sidebar-item">
          <van-sidebar-item title="标签名称" />
          <van-sidebar-item title="标签名称" />
          <van-sidebar-item title="标签名称" />
        </van-sidebar>
      </div>
      <div class="main-right">
        <ul>
          <li>
            <header class="menu_detail_header">
              <section class="menu_detail_header_left">
                <span class="menu_item_title">热销榜</span>
                <span class="menu_item_description">是的分身乏术放</span>
              </section>
              <span class="menu_detail_header_right"></span>
            </header>
            <section class="menu_detail_list">
              <section class="menu_detail_link">
                <!-- 图片 -->
                <section class="menu_food_img">
                  <img src="//elm.cangdu.org/img/166ccefb30b20519.jpg" alt />
                </section>
                <!-- 内容 -->
                <section class="menu_food_description">
                  <h3 class="food_description_head">我问问</h3>
                  <p class="food_description_content">发111</p>
                  <p class="food_description_sale_rating">
                    <span>月售404份</span>
                    <span>好评率85%</span>
                  </p>
                  <p class="food_activity">
                    <span>买一什么都不送！！！！</span>
                  </p>
                </section>
              </section>
              <!-- 添加 -->
              <footer class="menu_detail_footer">
                <section class="food_price">
                  <span class="food_price_1">¥</span>
                  <span class="food_price_2">20</span>
                  <span class="food_price_3">起</span>
                </section>
                <section class="cart_module">
                  <!-- <section class="cart_button">
                    <span>
                      <van-icon name="clear" class="clear" />
                    </span>
                    <span class="cart_num">3</span>
                    <span>
                      <van-icon name="add" class="clear" />
                    </span>
                  </section>-->
                  <section class="choose_icon_container">
                    <van-button type="info" class="button">选取规格</van-button>
                  </section>
                </section>
              </footer>
            </section>
          </li>
        </ul>
      </div>
    </main>

    <!-- 底部 -->
    <footer class="footer">
      <section class="buy_cart_container">
        <section class="cart_icon_num">
          <span class="span1">
            <van-icon name="shopping-cart" class="shopping-cart" />
          </span>
          <!-- <span>
            <van-icon name="shopping-cart" info="9" class="shopping-cart" />
          </span>-->
        </section>
        <section class="cart_num">
          <div class="cart_num_1">¥ 41.00</div>
          <div class="cart_num_2">配送费¥5</div>
        </section>
      </section>
      <section class="gotopay">
        <span>还差¥20起送</span>
        <!-- <van-button type="primary" class="button">去结算</van-button> -->
      </section>
    </footer>

    <!-- 购物车 -->
    <section class="cart_food_list" style="display: none;">
      <div class="cart_food_list-top">
        <h4>购物车</h4>
        <div>
          <van-icon name="delete" class="delete" />
          <span>清空</span>
        </div>
      </div>
      <section class="cart_food_details">
        <ul>
          <li>
            <div class="cart_list_num">
              <p class="cart_list_num_ellipsis">腿aa</p>
              <p class="cart_list_num_toellipsis">默认</p>
            </div>
            <div class="cart_list_price">
              <span class="cart_list_price_min">¥</span>
              <span class="cart_list_price_max">21</span>
            </div>
            <div class="cart_list_control">
              <span>
                <van-icon name="clear" class="clear" />
              </span>
              <span class="cart_num">3</span>
              <span>
                <van-icon name="add" class="clear" />
              </span>
            </div>
          </li>
        </ul>
      </section>
    </section>
    <!-- 全屏阴影 -->
    <div class="screen_cover" style="display: none;"></div>
  </div>
</template>

<script>
import Header from "../hfod/Header";
export default {
  data() {
    return {
      activeKey: 0
    };
  },
  components: {
    Header
  },
  methods: {
    active() {
      //   console.log(this.activeKey);
    }
  }
};
</script>

<style lang="scss" scoped>
.Shop {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    width: 100%;
    .header-inco {
      position: absolute;
      top: 0.15rem;
      left: 0.2rem;
      font-size: 0.2rem;
    }
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
    flex-grow: 1;
    position: relative;
    .main-left {
      width: 25%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      .sidebar-item {
        width: 100%;
        .van-sidebar-item {
          padding: 0.245rem 0.1rem;
          font-size: 0.16rem;
        }
      }
    }
    .main-right {
      width: 75%;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      ul {
        li {
          .menu_detail_header {
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
                  font-size: 0.19rem;
                  width: 1.5rem;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
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
  }
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 0.56rem;
    background: #333;
    display: flex;
    z-index: 99;
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
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #333;
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
    z-index: 98;
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