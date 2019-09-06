<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// import TtpodMain from "@/views/TtpodMain.vue";
// import Switchover from "@/views/Switchover.vue";
// import Select from "@/views/Select.vue";
export default {
  components: {
    // TtpodMain,
    // Switchover
    // Select
  }
};
</script>
<style lang="scss">
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  font-size: 0.18rem;
  background: #f5f5f5;
}
ul,
li,
ol,
p,
h1,
h2,
h3,
h4 {
  margin: 0;
  padding: 0;
  list-style: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>