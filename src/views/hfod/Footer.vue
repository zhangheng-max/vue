<template>
  <!--尾部 -->
  <footer class="footer">
    <van-tabbar route>
      <van-tabbar-item icon="home-o" :to="{ path: `/msite`, query: { geohash:this.geohash } }">外卖</van-tabbar-item>
      <van-tabbar-item icon="search" :to="`/search/${this.geohash}`">搜索</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/order">订单</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/profile">我的</van-tabbar-item>
    </van-tabbar>
    <router-view />
  </footer>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["geohash"])
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  z-index: 99;
  bottom: 0;
  width: 100%;
  background: #fff;
  ul {
    border-top: 0.01rem #ccc solid;
    display: flex;
    li {
      width: 25%;
      text-align: center;
      padding: 0.05rem 0;
      i {
        display: block;
        font-size: 0.25rem;
      }

      span {
        color: #999;
        font-size: 0.16rem;
      }
    }
  }
}
</style>