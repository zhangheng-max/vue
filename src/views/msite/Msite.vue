<template>
  <!-- 附件商家页面 -->
  <div class="TtpodMain">
    <!-- 表头 -->
    <Header :Head="true">
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
      <Msitesvg></Msitesvg>
    </div>
    <div class="main">
      <!-- 附件商家 -->
      <div class="adjunct">
        <div class="adjunct-merchant">
          <van-icon name="shop-o" class="shop-o" />
          <span>附件商家</span>
        </div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
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
                      <!-- {{v.delivery_mode.text}} -->
                      <span>蜂鸟专送</span>
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
        </van-list>
      </div>
    </div>

    <!-- 底部 -->
    <Footer></Footer>

    <!-- 接口没有请求数据之前显示的动画 -->
    <Gif :shouGit="shouGit"></Gif>
  </div>
</template>

<script>
import Header from "../hfod/Header.vue";
import Footer from "../hfod/Footer.vue";
import Gif from "../Gif/Gif";
import Msitesvg from "./Msitesvg.vue";
export default {
  data() {
    return {
      info: [], //轮播数据内容
      arr: [], //附近商家数据内容
      pois: [], //geohash的地址内容
      latitude: "", //经纬度
      longitude: "", //经纬度
      login: false, //是否显示返回图标
      shouGit: true, //数据没有的时候显示的动画
      loading: false, //让加载结束
      finished: false, //最大可以加载到什么然后结束
      num: 0, //加载的数量
      list: []
    };
  },
  components: {
    Header,
    Footer,
    Gif,
    Msitesvg
  },

  mounted() {
    let geohash = this.$route.query.geohash; //路由传参的地址
    let restaurants = geohash.split(","); //截取内容
    this.latitude = restaurants[0]; //当前地址latitude地址
    this.longitude = restaurants[1]; //当前地址longitude地址
    this.shouGit = true;
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
        `http://elm.cangdu.org/shopping/restaurants?latitude=${this.latitude}&longitude=${this.longitude}&offset=0&limit=30&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=`
      )
      .then(res => {
        // console.log(res.data);
        this.arr = res.data;
        this.shouGit = false;
        // console.log(this.arr);
      });
    //获取geohash的地址内容
    this.$http.get(`http://elm.cangdu.org/v2/pois/${geohash}`).then(res => {
      this.pois = res.data;
      // console.log(this.pois);
    });
  },
  methods: {
    //路由跳转到所有城市页面
    MsitegoHome() {
      this.$router.push({ path: "/home" });
    },
    onLoad() {
      // 异步更新数据
      // 异步更新数据
      setTimeout(() => {
        this.Godata();
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.arr.length >= 60) {
          this.finished = true;
        }
      }, 500);
    },

    //获取数据
    Godata() {
      this.num = this.num + 30;
      this.$http
        .get(
          `http://elm.cangdu.org/shopping/restaurants?latitude=${this.latitude}&longitude=${this.longitude}&offset=${this.num}&limit=${this.num}&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=`
        )
        .then(res => {
          if (this.arr.length < 60) {
            this.arr = this.arr.concat(res.data);
          }
        });
    }
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
    margin-bottom: 0.55rem;
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