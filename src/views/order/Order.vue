<template>
  <!-- 
    
  -->
  <div class="Order">
    <!-- 头部 -->
    <Header GoBack="true">
      <span slot="order">订单列表</span>
    </Header>

    <div class="main"></div>

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
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  .main {
    flex-grow: 1;
  }
}
</style>