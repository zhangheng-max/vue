<template>
  <!-- 
    
  -->
  <div class="Order">
    <!-- 头部 -->
    <Header GoBack="true">
      <span slot="order">订单列表</span>
    </Header>

    <div class="main">
      <section class="main_orber">
        <section class="mian_section">
          <img src="//elm.cangdu.org/img/164ad0b6a3917599.jpg" alt />
          <div class="order_main">
            <div class="main_orber_data">
              <div class="main_orber_data_left">
                <p class="main_obrde_top_one">
                  效果演示
                  <van-icon name="arrow" class="arrow" />
                </p>
                <p class="main_obrde_top_tow">2019-09-08 18:39</p>
              </div>
              <div class="main_orber_data_right">等待支付</div>
            </div>
            <section class="data_order">
              <div class="data_left">的味道切尔奇二群翁</div>
              <div class="data_right">¥855.00</div>
            </section>
            <section class="data_footer">
              <div class="data_go">去支付(还剩14分50秒)</div>
            </section>
          </div>
        </section>
        <section class="mian_section">
          <img src="//elm.cangdu.org/img/164ad0b6a3917599.jpg" alt />
          <div class="order_main">
            <div class="main_orber_data">
              <div class="main_orber_data_left">
                <p class="main_obrde_top_one">
                  效果演示
                  <van-icon name="arrow" class="arrow" />
                </p>
                <p class="main_obrde_top_tow">2019-09-08 18:39</p>
              </div>
              <div class="main_orber_data_right">等待支付</div>
            </div>
            <section class="data_order">
              <div class="data_left">的味道切尔奇二群翁</div>
              <div class="data_right">¥855.00</div>
            </section>
            <section class="data_footer">
              <div class="data_go">去支付(还剩14分50秒)</div>
            </section>
          </div>
        </section>
      </section>
    </div>

    <!-- 尾部 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../hfod/Header";
import Footer from "../hfod/Footer";
export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss" scoped>
.Order {
  font-family: Helvetica Neue, Tahoma, Arial;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  .main {
    margin-top: 0.36rem;
    flex-grow: 1;
    .main_orber {
      margin-top: 0.2rem;
      .mian_section {
        margin-top: 0.15rem;
        padding: 0 0.19rem;
        display: flex;
        padding-top: 0.15rem;
        background: #fff;
        img {
          width: 0.55rem;
          height: 0.55rem;
          margin-right: 0.1rem;
        }
        .order_main {
          flex-grow: 1;
          .main_orber_data {
            height: 0.55rem;

            border-bottom: 0.01rem solid #ccc;
            display: flex;
            justify-content: space-between;
            .main_orber_data_left {
              .main_obrde_top_one {
                display: flex;
                font-size: 0.21rem;
                font-weight: 450;
                .arrow {
                  color: #999;
                  margin: auto 0;
                  font-size: 0.16rem;
                }
              }
              .main_obrde_top_tow {
                font-size: 0.16rem;
                color: #999;
                margin-top: 0.02rem;
              }
            }
          }
          .main_orber_data_right {
            font-size: 0.18rem;
          }
        }
        .data_order {
          border-bottom: 0.01rem solid #ccc;
          display: flex;
          padding: 0.15rem 0;
          justify-content: space-between;
          .data_right {
            color: #f60;
          }
        }
        .data_footer {
          padding: 0.15rem 0;
          display: flex;
          justify-content: flex-end;
          .data_go {
            border: 0.02rem solid #ccc;
            font-size: 0.15rem;
            padding: 0.02rem 0.04rem;
            border-radius: 0.05rem;
          }
        }
      }
    }
  }
}
</style>