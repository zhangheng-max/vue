<template>
  <div class="Pronfile_info_address_addDetail">
    <Header GoBack="true">
      <span slot="addDetail">搜索地址</span>
    </Header>
    <section class="main">
      <div class="add-detail">
        <input type="text" placeholder="请输入小区/写字楼/学校等" v-model="title" />
        <van-button type="info" class="button" @click="GoData()">确定</van-button>
      </div>
      <div class="warnpart">为了满足商家的送餐要求，建议您从列表中选择地址</div>
      <div class="point" v-if="info.length==0">
        <p>找不到地址？</p>
        <p>请尝试输入小区、写字楼或学校名</p>
        <p>详细地址（如门牌号）可稍后输入哦。</p>
      </div>
      <section class="poisearch-container" v-if="info.length>0">
        <ul>
          <li v-for="(v,i) in info" :key="i">
            <p>{{v.name}}</p>
            <p>{{v.address}}</p>
          </li>
        </ul>
      </section>
    </section>
  </div>
</template>

<script>
import Header from "../hfod/Header";
export default {
  data() {
    return {
      title: "",
      info: []
    };
  },
  components: {
    Header
  },
  methods: {
    GoData() {
      if (this.title == "") {
        this.$dialog.alert({
          message: "搜索内容不能为空"
        });
      } else {
        this.$http
          .get(
            `http://elm.cangdu.org/v1/pois?type=nearby&keyword=${this.title}`
          )
          .then(res => {
            //   console.log(res);
            if (res.status == 200) {
              this.info = res.data;
            }
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.Pronfile_info_address_addDetail {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background: #f5f5f5;
  .main {
    margin-top: 0.65rem;
    .add-detail {
      padding: 0.145rem;
      background: #fff;
      display: flex;
      justify-content: space-between;
      input {
        width: 76%;
        display: block;
        background: #f2f2f2;
        border: 0.01rem solid #ddd;
        border-radius: 0.05rem;
        text-indent: 0.15rem;
      }
      .button {
        width: 21%;
        font-size: 0.2rem;
        border-radius: 0.05rem;
      }
    }
    .warnpart {
      background: #fff6e4;
      color: #ff883f;
      text-align: center;
      padding: 0.05rem 0;
    }
    .point {
      position: absolute;
      top: 50%;
      width: 100%;
      text-align: center;
      p {
        font-size: 0.2rem;
        margin-bottom: 0.11rem;
        color: #969696;
      }
    }
    .poisearch-container {
      ul {
        background: #f5f5f5;
        li {
          border-bottom: 1px solid #ccc;
          padding: 0.11rem;
          p {
            margin-bottom: 0.05rem;
            color: #969696;
          }
        }
      }
    }
  }
}
</style>