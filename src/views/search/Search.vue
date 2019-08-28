<template>
  <!-- 搜索商家或美食页面 -->
  <div class="Search">
    <!-- 表头 -->
    <Header GoBack="true" Address="seek"></Header>

    <!-- 内容 -->
    <main class="main">
      <div class="search_form">
        <van-field
          class="input"
          v-model="username"
          clearable
          placeholder="请输入商家或美食名称"
          @input="change()"
        />
        <van-button type="info" @click="search()">提交</van-button>
      </div>

      <!-- 搜索历史 -->
      <section class="search_history" v-if="info.length==0">
        <h4 class="clear_history" v-if="arr.length>0">搜索历史</h4>
        <ul>
          <li v-for="(v,i) in arr" :key="i">
            <span @click="serchadd(v)">{{v}}</span>
            <van-icon name="cross" class="search_history-li-inco" @click="del(i)" />
          </li>
        </ul>
        <div class="footer-history" v-if="arr.length>0" @click="detele()">
          <span>清空历史搜索</span>
        </div>
      </section>

      <!-- 搜索内容 -->
      <section class="title_restaurant" v-if="info.length>0">
        <h4 class="clear_history">商家</h4>
        <ul>
          <li v-for="(v,i) in info" :key="i">
            <div class="item_left">
              <img :src="`//elm.cangdu.org/img/${v.image_path}`" />
            </div>
            <div class="item_right">
              <p>
                <span>{{v.name}}</span>
                <svg
                  data-v-3726cde6
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="24"
                  height="14"
                  class="pay_icon"
                >
                  <polygon
                    data-v-3726cde6
                    points="0,14 4,0 24,0 20,14"
                    style="fill: none; stroke: rgb(255, 96, 0); stroke-width: 1;"
                  />
                  <line
                    data-v-3726cde6
                    x1="1.5"
                    y1="12"
                    x2="20"
                    y2="12"
                    style="stroke: rgb(255, 96, 0); stroke-width: 1.5;"
                  />
                  <text
                    data-v-3726cde6
                    x="3.5"
                    y="9"
                    style="fill: rgb(255, 96, 0); font-size: 9px; font-weight: bold;"
                  >支付</text>
                </svg>
              </p>
              <p>月售 {{v.recent_order_num}} 单</p>
              <p>{{v.float_minimum_order_amount}} 元起送 / 距离{{v.distance}}</p>
            </div>
          </li>
        </ul>
      </section>

      <!-- 无搜索结果 -->
      <div class="search_none" v-if="info==1">很抱歉！无搜索结果</div>
    </main>
    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../hfod/Header.vue";
import Footer from "../hfod/Footer.vue";
export default {
  data() {
    return {
      username: "", //input值
      arr: [], //搜索记录
      info: [] //搜索内容,
    };
  },
  components: {
    Header,
    Footer
  },
  methods: {
    //提交username查询附近商家或美食
    search() {
      let geohash = this.$route.params.geohash;
      let arr = [...this.arr];
      //搜索内容
      if (this.username !== "") {
        this.$http
          .get(
            `http://elm.cangdu.org/v4/restaurants?extras[]=restaurant_activity&geohash=${geohash}&keyword=${this.username}&type=search`
          )
          .then(res => {
            // console.log(res.data);
            if (res.data.length == 0 || res.data.status == 0) {
              this.info = 1;
            } else {
              this.info = res.data;
            }
          });
        //添加搜索记录
        let check = arr.some(v => {
          return v == this.username;
        });
        if (!check) {
          arr.push(this.username);
        }
        //把搜索历史进行本地存储
        localStorage.setItem("searchHistory", JSON.stringify(arr));
        this.arr = arr;
        // console.log(this.arr);
      }
    },
    //进行给username赋值然后搜索
    serchadd(v) {
      this.username = v;
      this.search();
    },
    //input中的change事件
    change() {
      if (this.username == "") {
        this.info = [];
      }
    },
    //删除选中下标的历史搜索
    del(i) {
      let arr = [...this.arr];
      arr.splice(i, 1);
      localStorage.setItem("searchHistory", JSON.stringify(arr));
      this.arr = arr;
    },
    //清空搜索历史和本地存储
    detele() {
      this.arr = [];
      localStorage.removeItem("searchHistory");
    }
  },
  mounted() {
    //提取arr搜索历史复制
    let obj = JSON.parse(localStorage.getItem("searchHistory"));
    if (obj) {
      this.arr = obj;
    }
  }
};
</script>

<style lang="scss" scoped>
.Search {
  height: 100%;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  .header {
    position: fixed;
    top: 0;
    z-index: 99;
    width: 100%;
    height: 0.55rem;
    background: #0085ff;
    display: flex;
    justify-content: space-between;
    .header-icon-search {
      margin-left: 0.1rem;
      line-height: 0.55rem;
      font-size: 0.3rem;
      .el-icon-arrow-left {
        line-height: 0.55rem;
        color: #fff;
        font-size: 0.3rem;
      }
    }
    .address {
      width: 1.5rem;
      span {
        text-align: center;
        width: 1.5rem;
        font-size: 0.22rem;
        display: block;
        color: #fff;
        font-family: "圆体";
        line-height: 0.55rem;
        // font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 600;
      }
    }
    .header-icon-user {
      margin-right: 0.2rem;
      line-height: 0.55rem;
      .el-icon-user {
        font-size: 0.3rem;
        line-height: 0.55rem;
        color: #fff;
      }
    }
  }
  .main {
    width: 100%;
    margin-bottom: 0.68rem;
    .search_none {
      margin: 0 auto;
      color: #333;
      background-color: #fff;
      line-height: 0.5rem;
      text-align: center;
      margin-top: 0.05rem;
    }
    .search_form {
      margin-top: 0.55rem;
      background: #fff;
      padding: 0.14rem;
      display: flex;
      .input {
        width: 79%;
        height: 0.42rem;
        font-size: 0.18rem;
        border: 0.01rem solid #ccc;
        background: #f5f5f5;
        margin-right: 0.05rem;
        border-radius: 0.05rem;
        line-height: 0.4rem;
        font-weight: 600;
        padding: 0 0.1rem;
        color: #333;
      }
      button {
        width: 20%;
        margin: 0;
        border-radius: 0.05rem;
        font-size: 0.2rem;
        font-weight: 600;
        height: 0.42rem;
        line-height: 0.42rem;
      }
    }
    .search_history {
      width: 100%;
      .clear_history {
        line-height: 0.56rem;
        font-size: 0.18rem;
        color: #666;
        font-weight: 700;
        text-indent: 0.15rem;
      }
      ul {
        li {
          padding: 0 0.1rem;
          line-height: 0.56rem;
          background: #fff;
          border-bottom: 0.01rem solid #e4e4e4;
          display: flex;
          justify-content: space-between;
          span {
            line-height: 0.56rem;
            font-size: 0.22rem;
            width: 86%;
          }
          .search_history-li-inco {
            font-size: 0.2rem;
            font-weight: 900;
            color: rgb(153, 153, 153);
            line-height: 0.56rem;
          }
        }
      }
      .footer-history {
        line-height: 0.56rem;
        text-align: center;
        background: #fff;
        span {
          font-size: 0.2rem;
          font-weight: 600;
          color: #3190e8;
        }
      }
    }
    .title_restaurant {
      width: 100%;
      .clear_history {
        line-height: 0.56rem;
        font-size: 0.18rem;
        color: #666;
        font-weight: 700;
        text-indent: 0.15rem;
      }
      ul {
        li {
          display: flex;
          padding: 0.16rem;
          background: #fff;
          border-bottom: 0.01rem solid #e4e4e4;
          .item_left {
            margin-right: 0.1rem;
            img {
              width: 0.47rem;
              height: 0.47rem;
            }
          }
          .item_right {
            flex-grow: 1;
            padding-bottom: 0.1rem;
            border-bottom: 0.01rem solid #e4e4e4;
            p {
              font-size: 0.16rem;
              line-height: 0.25rem;
              color: #333;
              display: flex;
              span {
                width: 1.5rem;
                margin-right: 0.08rem;
                white-space: nowrap; /*一行显示*/
                overflow: hidden; /*超出部分隐藏*/
                text-overflow: ellipsis;
              }
              svg {
                margin-top: 0.05rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>