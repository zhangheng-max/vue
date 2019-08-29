<template>
  <!-- 头部 -->
  <header class="header">
    <div class="header-icon-search">
      <!-- 回退图标 -->
      <span v-if="GoBack=='true'">
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </span>

      <!-- 所有城市页面的ele.me字 -->
      <span v-if="GoBack=='ele.me'" class="span">ele.me</span>

      <!-- 附近商品页面的搜索图标 -->
      <slot name="search"></slot>
    </div>

    <div class="address">
      <!-- 搜索城市页面地址 -->
      <span v-if="Address">{{Address.cities}}</span>

      <!-- 附近商品页面的地址 -->
      <slot name="pois"></slot>

      <!-- 搜索页面文字 -->
      <span v-if="Address=='seek'">搜索</span>

      <!-- 订单页面 -->
      <slot name="order"></slot>

      <!-- 登录页面 -->
      <slot name="login"></slot>

      <!-- 我的页面 -->
      <slot name="profile"></slot>
      <!-- 用户信息 -->
      <slot name="profile_info"></slot>
    </div>

    <div class="header-icon-user">
      <!-- 搜索地址页面的切换城市 -->
      <slot name="head"></slot>

      <!-- 是登录注册还是已经登录过 -->
      <span v-if="Head">
        <router-link to="/profile" v-if="usercheack">
          <van-icon name="contact" class="el-icon-user" />
        </router-link>
        <router-link to="/login" v-else>
          <span style="color:#fff">登录|注册</span>
        </router-link>
      </span>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["GoBack", "Address", "Head"],
  data() {
    return {
      usercheack: ""
    };
  },
  computed: {},
  mounted() {
    this.usercheack = this.$store.state.user.user_check;
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 0.55rem;
  background: #3190e8;
  .header-icon-search {
    position: absolute;
    top: 0;
    left: 0;
    margin-left: 0.1rem;
    line-height: 0.55rem;
    color: #fff;
    .van-icon {
      font-size: 0.25rem;
      margin-right: 0.5rem;
      line-height: 0.55rem;
    }
    span {
      width: 1.5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.2rem;
    }
    .search {
      line-height: 0.55rem;
      color: #fff;
      font-size: 0.3rem;
    }
  }
  .address {
    margin: 0 auto;
    width: 1.5rem;
    span {
      width: 1.5rem;
      text-align: center;
      font-size: 0.22rem;
      display: block;
      color: #fff;
      font-family: "圆体";
      line-height: 0.55rem;
      // font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 700;
    }
  }
  .header-icon-user {
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 0.1rem;
    line-height: 0.55rem;
    color: #fff;
    .el-icon-user {
      font-size: 0.3rem;
      line-height: 0.55rem;
      color: #fff;
    }
  }
}
</style>