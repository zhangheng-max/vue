<template>
  <!-- 附件商家页面 -->
  <div class="TtpodMain">
    <!-- 表头 -->
    <Header :Head="{'login':this.user_cheack}">
      <!-- <router-link to="/search/"></router-link> -->
      <span slot="search">
        <van-icon name="search" class="search" />
      </span>
      <router-link to="/home" tag="span" slot="pois">
        <span class="span">{{pois.name}}</span>
      </router-link>
    </Header>

    <!-- 轮播 -->
    <div class="mint-swipe">
      <van-swipe>
        <van-swipe-item v-for="(v,i) in info" :key="i">
          <ul>
            <li v-for="(k,y) in info[i]" :key="y">
              <img :src="`https://fuss10.elemecdn.com${k.image_url}`" />
              <span>{{k.title}}</span>
            </li>
          </ul>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="main">
      <!-- 附件商家 -->
      <div class="adjunct">
        <div class="adjunct-merchant">
          <van-icon name="shop-o" class="shop-o" />
          <span>附件商家</span>
        </div>
        <div class="main-content">
          <ul>
            <li v-for="(v,i) in arr" :key="i">
              <img :src="`//elm.cangdu.org/img/${v.image_path}`" alt />
              <div class="item">
                <div class="item-left">
                  <div class="item-left-top">
                    <span>品牌</span>
                    <p>{{v.name}}</p>
                  </div>
                  <div class="item-left-content">
                    <van-rate :value="v.rating" readonly size="0.12rem" gutter="0" />
                    <span>{{v.rating}}</span>
                    <p>月售{{v.recent_order_num}}单</p>
                  </div>
                  <div class="item-left-footer">
                    <span>￥{{v.float_minimum_order_amount}}起送/{{v.piecewise_agent_fee.tips}}</span>
                  </div>
                </div>
                <div class="item-right">
                  <div class="item-right-top">
                    <span>
                      <em v-for="(l,o) in v.supports" :key="o">{{l.icon_name }}</em>
                    </span>
                  </div>
                  <div class="item-right-content">
                    <span>{{v.delivery_mode.text}}</span>
                    <p>准时达</p>
                  </div>
                  <div class="item-right-footer">
                    <span>
                      {{v.distance}}/
                      <em>{{v.order_lead_time}}</em>
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "../hfod/Header.vue";
import Footer from "../hfod/Footer.vue";
export default {
  data() {
    return {
      info: [], //轮播数据内容
      arr: [], //附近商家数据内容
      pois: [], //geohash的地址内容
      login: false
    };
  },
  components: {
    Header,
    Footer
  },
  computed: {
    //判断user_id纯不存在
    ...mapState(["user_cheack"])
  },
  methods: {
    //路由跳转到所有城市页面
    MsitegoHome() {
      this.$router.push({ path: "/home" });
    }
  },
  mounted() {
    let geohash = this.$route.query.geohash; //路由传参的地址
    let restaurants = geohash.split(","); //截取内容
    let latitude = restaurants[0]; //当前地址latitude地址
    let longitude = restaurants[1]; //当前地址longitude地址

    //轮播数据内容
    this.$http
      .get(
        `http://elm.cangdu.org/v2/index_entry?geohash=${geohash}&group_type=1&flags[]=F`
      )
      .then(res => {
        // console.log(res);
        if (res.data.length > 0) {
          let resArr = [...res.data];
          let foodArr = [];
          for (let i = 0, j = 0; i < res.data.length; i += 8, j++) {
            foodArr[j] = resArr.splice(0, 8);
          }
          this.info = foodArr;
        }
      });

    //附近商家数据内容
    this.$http
      .get(
        `http://elm.cangdu.org/shopping/restaurants?latitude=${latitude}&longitude=${longitude}&offset=0&limit=30&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=`
      )
      .then(res => {
        // console.log(res.data);
        this.arr = res.data;
        // console.log(this.arr);
      });
    //获取geohash的地址内容
    this.$http.get(`http://elm.cangdu.org/v2/pois/${geohash}`).then(res => {
      this.pois = res.data;
      // console.log(this.pois);
    });
  }
};
</script>

<style lang="scss" scoped>
.TtpodMain {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  .span {
    font-weight: normal;
  }
  .mint-swipe {
    width: 100%;
    height: auto;
    ul {
      margin-top: 0.6rem;
      display: flex;
      flex-wrap: wrap;
      background: #fff;
      padding: 0 0 0.25rem 0;
      height: 2.5rem;
      border-bottom: 0.01rem #ccc solid;
      li {
        margin: 0.15rem 0;
        width: 25%;
        text-align: center;
        img {
          width: 0.6rem;
          height: 0.6rem;
          display: block;
          margin: 0.05rem auto;
        }
        span {
          font-size: 0.16rem;
          color: #666;
        }
      }
    }
  }

  .main {
    margin-top: 0.15rem;
    border-top: 0.01rem #ccc solid;
    width: 100%;

    .adjunct {
      background: #fff;
      padding: 0 0.1rem;

      .adjunct-merchant {
        height: 0.4rem;
        display: flex;
        .shop-o {
          font-size: 0.22rem;
          line-height: 0.4rem;
          color: #999;
          margin-right: 0.1rem;
        }
        span {
          font-size: 0.16rem;
          color: #999;
          line-height: 0.4rem;
          font-weight: 500;
        }
      }

      .main-content {
        margin-bottom: 0.6rem;
        width: 100%;
        ul {
          li {
            padding: 0.25rem 0;
            display: flex;
            border-bottom: #ccc 0.01rem solid;
            img {
              width: 0.9rem;
              height: 0.9rem;
              display: block;
              border: 0.01rem #ccc solid;
              margin-right: 0.1rem;
            }
            .item {
              flex-grow: 1;
              .item-left {
                float: left;
                .item-left-top {
                  display: flex;
                  span {
                    display: block;
                    height: 0.2rem;
                    font-weight: 600;
                    line-height: 0.2rem;
                    font-size: 0.14rem;
                    border-radius: 0.03rem;
                    padding: 0 0.02rem;
                    background: #ffd547;
                  }
                  p {
                    width: 1.2rem;
                    height: 0.18rem;
                    font-size: 0.18rem;
                    font-weight: 550;
                    line-height: 0.18rem;
                    margin-left: 0.05rem;
                    white-space: nowrap; /*一行显示*/
                    overflow: hidden; /*超出部分隐藏*/
                    text-overflow: ellipsis;
                  }
                }
                .item-left-content {
                  margin-top: 0.2rem;
                  display: flex;
                  font-size: 0.14rem;
                  color: #ccc;
                  span {
                    font-size: 0.14rem;
                    margin: 0 0.06rem;
                    line-height: 0.18rem;
                    color: #ffd547;
                  }
                  p {
                    font-size: 0.12rem;
                    color: #000;
                  }
                }
                .item-left-footer {
                  font-size: 0.13rem;
                  margin-top: 0.15rem;
                  color: #000;
                }
              }
              .item-right {
                float: right;
                font-size: 0.12rem;
                text-align: right;
                .item-right-top {
                  > span {
                    color: #999;
                    em {
                      font-style: normal;
                      margin: 0 0.05rem;
                    }
                  }
                }
                .item-right-content {
                  display: flex;
                  justify-content: flex-end;
                  margin-top: 0.25rem;
                  margin-bottom: 0.17rem;
                  span {
                    font-size: 0.1rem;
                    display: block;
                    color: #fff;
                    padding: 0 0.02rem;
                    border-radius: 0.02rem;
                    line-height: 0.16rem;
                    background: #398fdf;
                  }
                  p {
                    font-size: 0.1rem;
                    display: block;
                    padding: 0 0.02rem;
                    line-height: 0.16rem;
                    color: #398fdf;
                    border: 0.01rem solid #398fdf;
                    margin-left: 0.05rem;
                    border-radius: 0.02rem;
                  }
                }
                .item-right-footer {
                  span {
                    color: #999;
                    em {
                      font-style: normal;
                      color: #398fdf;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>