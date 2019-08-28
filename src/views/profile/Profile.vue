<template>
  <!-- 我的页面 -->
  <div class="Profile">
    <Header GoBack="true">
      <span slot="profile">我的</span>
    </Header>
    <div class="main">
      <section class="profile-number" @click="GoLogin()">
        <div class="privateImage-svg">
          <svg v-if="info==0" viewBox="0 0 122 122" id="avatar-default">
            <path
              fill="#DCDCDC"
              fill-rule="evenodd"
              d="M61 121.5c33.413 0 60.5-27.087 60.5-60.5S94.413.5 61 .5.5 27.587.5 61s27.087 60.5 60.5 60.5zm12.526-45.806c-.019 3.316-.108 6.052.237 9.825 3.286 8.749 18.816 9.407 28.468 17.891-1.833 1.998-6.768 6.788-15 10.848-7.02 3.463-16.838 6.416-24.831 6.416-17.366 0-32.764-7.149-42.919-17.264 9.713-8.407 25.49-9.173 28.769-17.891.345-3.773.258-6.509.24-9.825l-.004-.002c-1.903-.985-5.438-7.268-6.01-12.571-1.492-.12-3.843-1.561-4.534-7.247-.37-3.053 1.107-4.77 2.004-5.31-5.046-19.212 1.507-33.16 20.749-34.406 5.753 0 10.18 1.52 11.909 4.523 15.35 2.702 11.756 22.658 9.328 29.882.899.54 2.376 2.258 2.004 5.31-.689 5.687-3.042 7.127-4.534 7.248-.575 5.305-3.25 10.82-5.873 12.57l-.003.003zM61 120.5C28.14 120.5 1.5 93.86 1.5 61S28.14 1.5 61 1.5s59.5 26.64 59.5 59.5-26.64 59.5-59.5 59.5z"
            />
          </svg>
          <img v-else :src="`//elm.cangdu.org/img/${info.avatar}`" alt />
        </div>
        <div class="user-info">
          <p v-if="info">{{info.username}}</p>
          <p v-if="info.length==0">登录/注册</p>
          <p>
            <span class="user-icon">
              <svg viewBox="0 0 655 1024" id="mobile">
                <path
                  d="M0 122.501v778.998C0 968.946 55.189 1024 123.268 1024h408.824c68.52 0 123.268-54.846 123.268-122.501V122.501C655.36 55.054 600.171 0 532.092 0H123.268C54.748 0 0 54.846 0 122.501zM327.68 942.08c-22.622 0-40.96-18.338-40.96-40.96s18.338-40.96 40.96-40.96 40.96 18.338 40.96 40.96-18.338 40.96-40.96 40.96zM81.92 163.84h491.52V819.2H81.92V163.84z"
                />
              </svg>
            </span>
            <span class="icon-mobile-number">暂无绑定手机号</span>
          </p>
        </div>
        <span class="arrow">
          <van-icon name="arrow" color="#fff" />
        </span>
      </section>

      <!-- 余额 -->
      <section class="info-data">
        <ul>
          <li>
            <span class="info-data-top">
              <b style="color:#f90" v-if="info">{{info.balance}}</b>
              <b style="color:#f90" v-if="info.length==0">0.00</b>
              <span>元</span>
            </span>
            <span class="info-data-bottom">我的余额</span>
          </li>
          <li>
            <span class="info-data-top">
              <b style="color: #ff5f3e" v-if="info">{{info.gift_amount}}</b>
              <b style="color: #ff5f3e" v-if="info.length==0">0</b>
              <span>个</span>
            </span>
            <span class="info-data-bottom">我的优惠</span>
          </li>
          <li>
            <span class="info-data-top">
              <b style="color: #6ac20b" v-if="info">{{info.point}}</b>
              <b style="color: #6ac20b" v-if="info.length==0">0</b>
              <span>分</span>
            </span>
            <span class="info-data-bottom">我的积分</span>
          </li>
        </ul>
      </section>

      <!-- 服务 -->
      <section class="profile-1reTe">
        <div class="profile-2reTe">
          <span class="profile-rete-icon">
            <svg
              data-v-617269a8
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 38 38"
              id="order"
            >
              <g data-v-617269a8 fill="none" fill-rule="evenodd">
                <g
                  data-v-617269a8
                  stroke="#666"
                  stroke-width="4"
                  mask="url(#order-regular.41c17f8_b)"
                >
                  <rect data-v-617269a8 id="order-regular.41c17f8_a" width="38" height="38" rx="2" />
                </g>
                <rect data-v-617269a8 width="24" height="2" x="7" y="8" fill="#666" rx="1" />
                <rect data-v-617269a8 width="20" height="2" x="7" y="17" fill="#666" rx="1" />
                <rect data-v-617269a8 width="8" height="2" x="7" y="26" fill="#666" rx="1" />
              </g>
            </svg>
          </span>
          <div class="myorder-div">
            <span>我的订单</span>
            <span class="myorder-div-icon">
              <van-icon name="arrow" color="rgb(187, 187, 187)" />
            </span>
          </div>
        </div>
        <div class="profile-2reTe">
          <span class="profile-rete-icon">
            <svg data-v-0fc4ab7a fill="#fc7b53">
              <use data-v-0fc4ab7a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point" />
            </svg>
          </span>
          <div class="myorder-div">
            <span>积分商城</span>
            <span class="myorder-div-icon">
              <van-icon name="arrow" color="rgb(187, 187, 187)" />
            </span>
          </div>
        </div>
        <div class="profile-2reTe">
          <span class="profile-rete-icon">
            <svg data-v-0fc4ab7a fill="#ffc636">
              <use data-v-0fc4ab7a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#vip" />
              <svg viewBox="0 0 40 40" id="point">
                <path
                  d="M34.6 7.1c0-1.1-1-2.1-2.1-2.1h-24c-1.1 0-2 1-2.1 2.1l-1.6 25C4.6 34.3 6.3 36 8.5 36h24c2.2 0 3.9-1.7 3.7-3.9l-1.6-25zm-5.9 6.1c-.2 4.6-3.7 8.2-8.3 8.2-4.6 0-8.2-3.7-8.4-8.3-.3-.2-.5-.6-.5-1 0-.7.6-1.2 1.3-1.2s1.3.6 1.3 1.2c0 .5-.3.9-.7 1.1.2 3.8 3.2 6.8 7.1 6.8 3.9 0 6.8-3.1 7-6.9-.4-.2-.6-.6-.6-1.1 0-.7.6-1.2 1.3-1.2s1.3.6 1.3 1.2c-.2.6-.4 1-.8 1.2z"
                />
              </svg>
            </svg>
          </span>
          <div class="myorder-div">
            <span>饿了么会员卡</span>
            <span class="myorder-div-icon">
              <van-icon name="arrow" color="rgb(187, 187, 187)" />
            </span>
          </div>
        </div>
      </section>
      <section class="profile-1reTe">
        <div class="profile-2reTe">
          <span class="profile-rete-icon">
            <svg data-v-0fc4ab7a fill="#4aa5f0">
              <use
                data-v-0fc4ab7a
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#service"
              >
                <svg viewBox="0 0 40 40" id="service">
                  <g id="service_XMLID_1_">
                    <path
                      id="service_XMLID_6_"
                      d="M32.2 9.5c-.2-.7-.1-.7-.4-.9-1.7-1.2-5.3.2-6.7 1.9-.8-3.8-3.8-6.1-4.7-5.9-.9-.2-4 2.1-4.8 5.9-1.3-1.7-5-3.1-6.7-1.9-.1.1-.5.6-.5.7C5.4 20.7 15 24.6 19 25.7v8.7c0 .7.3 1.2 1 1.2s1-.5 1-1.2v-8.6c4-1 14.2-4.8 11.2-16.3z"
                    />
                    <path
                      id="service_XMLID_7_"
                      d="M6 25c-.9 0-1.6.7-1.6 1.5.1.8.7 1.5 1.6 1.5 3.1 0 6.5 1.5 8.5 3.7.3.3.7.6 1.1.6.4 0 .7-.1 1-.4.6-.6.6-1.6.1-2.3C14.1 26.8 10 25 6 25z"
                    />
                    <path
                      id="service_XMLID_8_"
                      d="M34.6 25c-4 0-8.1 1.9-10.7 4.6-.6.6-.5 1.6.1 2.2.3.3.7.4 1 .4.4 0 .8-.3 1.1-.6 2-2.1 5.3-3.7 8.4-3.7h.1c.8 0 1.5-.7 1.5-1.5 0-.7-.7-1.4-1.5-1.4z"
                    />
                  </g>
                  <path d="M0 0h40v40H0z" class="st1" />
                </svg>
              </use>
            </svg>
          </span>
          <div class="myorder-div">
            <span>服务中心</span>
            <span class="myorder-div-icon">
              <van-icon name="arrow" color="rgb(187, 187, 187)" />
            </span>
          </div>
        </div>
        <div class="profile-2reTe">
          <span class="profile-rete-icon">
            <svg data-v-0fc4ab7a fill="#3cabff">
              <use
                data-v-0fc4ab7a
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#download"
              >
                <svg viewBox="0 0 40 40" id="download">
                  <path
                    d="M30 5H10c-2.8 0-5 2.2-5 5v20c0 2.8 2.2 5 5 5h20c2.8 0 5-2.2 5-5V10c0-2.8-2.2-5-5-5zm-3.9 22.7c-.1.2-.3.4-.6.5-4.3 2.8-10.1 1.6-13-2.8-2.8-4.3-1.6-10.2 2.8-13 4.3-2.8 10.2-1.6 13 2.8.2.2.3.5.4.8.1.2 0 .5-.2.7l-8.8 5.7c-.2.2-.6.1-.7-.2l-.5-.7c-.4-.6-.2-1.5.4-1.9l5.6-3.6c.2-.2.3-.5.2-.7l-.1-.1c-2.2-1.8-5.4-2.1-7.9-.4-3.1 2-4 6.1-2 9.2 2 3.1 6.1 4 9.2 2 .6-.4 1.3-.2 1.7.4l.3.7c.1.2.4.5.2.6zm3.1-4.4l-.9.6c-.2.2-.6.1-.7-.2L26.5 22c-.2-.2-.1-.6.2-.7l1.8-1.1c.2-.2.6-.1.7.2l.6.9c.3.6.1 1.5-.6 2z"
                  />
                </svg>
              </use>
            </svg>
          </span>
          <div class="myorder-div">
            <span>下载饿了么APP</span>
            <span class="myorder-div-icon">
              <van-icon name="arrow" color="rgb(187, 187, 187)" />
            </span>
          </div>
        </div>
      </section>
    </div>
    <Footer></Footer>
    {{this.$store.state.id}}
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "../hfod/Header";
import Footer from "../hfod/Footer";
export default {
  data() {
    return {
      info: [] //页面数据
    };
  },
  components: {
    Header,
    Footer
  },
  computed: {
    ...mapState(["user_id"])
  },
  mounted() {
    // let id = localStorage.getItem("user_id");
    if (this.user_id) {
      this.$http
        .get(`http://elm.cangdu.org/v1/user?user_id=${this.user_id}`)
        .then(res => {
          this.info = res.data;
        });
    }
  },
  methods: {
    //路由跳转
    GoLogin() {
      if (this.info != "") {
        console.log(111);
      } else {
        this.$router.push({ path: "/login" });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.Profile {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .main {
    margin-top: 0.55rem;
    flex-grow: 1;
    .profile-number {
      display: flex;
      background: #3190e8;
      padding: 0.14rem;
      .privateImage-svg {
        margin-top: 0.05rem;
        margin-right: 0.15rem;
        img {
          width: 0.7rem;
          height: 0.7rem;
          border-radius: 50%;
          background: #fff;
        }
        svg {
          width: 0.7rem;
          height: 0.7rem;
          border-radius: 50%;
          background: #fff;
        }
      }
      .user-info {
        flex-grow: 1;
        margin-top: 0.15rem;
        p {
          color: #fff;
          font-weight: 600;
          font-size: 0.23rem;
          display: flex;
          span {
            font-size: 0.16rem;
            font-weight: normal;
            line-height: 0.3rem;
          }
        }
        .user-icon {
          svg {
            width: 0.15rem;
            height: 0.22rem;
            fill: rgb(255, 255, 255);
            margin-top: 0.03rem;
            margin-right: 0.05rem;
          }
        }
      }
      .arrow {
        margin-top: 6%;
      }
    }
    .info-data {
      background: #fff;
      ul {
        display: flex;
        li {
          width: 33.3%;
          border-right: 0.01rem solid #f1f1f1;
          .info-data-top {
            display: block;
            padding: 0.2rem 0 0.12rem 0;
            text-align: center;
            b {
              display: inline-block;
              font-size: 0.35rem;
              font-weight: 700;
              line-height: 0.3rem;
              font-family: Helvetica Neue, Tahoma;
            }
            span {
              font-size: 0.14rem;
            }
          }
          .info-data-bottom {
            display: block;
            text-align: center;
            padding-bottom: 0.13rem;
            font-size: 0.16rem;
            color: #666;
            font-weight: 400;
          }
        }
        li:nth-child(3) {
          border: 0;
        }
      }
    }
    .profile-1reTe {
      width: 100%;
      margin-top: 0.15rem;

      .profile-2reTe {
        background: #fff;
        display: flex;
        .profile-rete-icon {
          margin-left: 0.25rem;
          margin-top: 0.14rem;
          margin-right: 0.1rem;
          svg {
            width: 0.2rem;
            height: 0.2rem;
          }
        }
        .myorder-div {
          flex-grow: 1;
          border-bottom: 0.01rem #f1f1f1 solid;
          display: flex;
          justify-content: space-between;
          padding: 0.12rem 0.07rem 0.12rem 0;
          span {
            font-size: 0.2rem;
          }
        }
      }
    }
  }
}
</style>