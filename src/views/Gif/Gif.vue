<template>
  <!-- 在没有数据之前显示的gif动画 -->
  <div class="imges" v-if="this.shouGit">
    <img src="../../imges/img.gif" alt />
  </div>
</template>

<script>
export default {
  props: ["shouGit"]
};
</script>

<style lang="scss" scoped>
.imges {
  z-index: 96;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  img {
    width: 2rem;
    display: block;
    margin: 50% auto;
    height: auto;
    background: #fff;
  }
}
</style>