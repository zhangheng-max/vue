<template>
  <!-- 我的—收获地址 -->
  <div class="Pronfile_info_address">
    <Header GoBack="true">
      <span slot="addContent">编辑地址</span>
      <section slot="addRight">
        <span v-if="check" @click="Backcheck()">编辑</span>
        <span v-else @click="Backcheck()">完成</span>
      </section>
    </Header>
    <section class="main">
      <div class="address">
        <ul>
          <li v-for="(v,i) in info" :key="i">
            <div>
              <p>{{v.address}}</p>
              <p>
                <span>{{v.phone}}</span>
              </p>
            </div>
            <van-icon name="cross" class="icon" v-if="check==false" @click="del(v.id,i)" />
          </li>
        </ul>
        <router-link to="/profile/info/address/add" tag="div" class="addsite">
          <span>新增地址</span>
          <p class="addsvg">
            <van-icon name="arrow" />
          </p>
        </router-link>
      </div>
    </section>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "../hfod/Header";
export default {
  data() {
    return {
      check: true, //编辑还是完成
      info: "" //地址数据
    };
  },
  components: {
    Header
  },
  methods: {
    Backcheck() {
      this.check = !this.check;
    },
    del(id, i) {
      let info = [...this.info];
      this.$http
        .delete(
          `http://elm.cangdu.org/v1/users/${this.$store.state.user.user_id}/addresses/${id}`
        )
        .then(res => {
          if (res.data.status == 1) {
            info.splice(i, 1);
            this.info = info;
          }
        });
    }
  },
  mounted() {
    this.$http
      .get(
        `http://elm.cangdu.org/v1/users/${this.$store.state.user.user_id}/addresses`
      )
      .then(res => {
        this.info = res.data;
      });
  }
};
</script>

<style lang="scss" scoped>
.Pronfile_info_address {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f5f5f5;
  z-index: 99;
  display: flex;
  flex-direction: column;
  .main {
    flex-grow: 1;
    margin-top: 0.66rem;
    border-top: 0.01rem solid #d9d9d9;
    border-bottom: 0.01rem solid #d9d9d9;
    .address {
      ul {
        li {
          background: #fff;
          border-bottom: 0.01rem solid #d9d9d9;
          padding: 0.11rem;
          display: flex;
          div {
            flex-grow: 1;
            p {
              margin: 0.05rem 0;
              color: #333;
            }
          }
          .icon {
            line-height: 0.57rem;
            color: #999;
          }
        }
        li:nth-child(1) {
          background: #fff8c3;
        }
      }
      .addsite {
        display: flex;
        justify-content: space-between;
        padding: 0.15rem 0.11rem;
        border-top: 0.01rem solid #d9d9d9;
        background: #fff;
        margin-top: 0.1rem;
      }
    }
  }
}
</style>