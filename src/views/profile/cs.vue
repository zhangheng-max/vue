<template>
  <div class="mode">
    <button @click="add($event)" class="button">+</button>
  </div>
</template>

<script>
import jq from "jquery";
export default {
  data() {
    return {
      show: true
    };
  },
  mounted() {},
  methods: {
    add(e) {
      console.log(e);
      let mode = document.getElementById("mode");

      let div = document.createElement("div");
      let div2 = document.createElement("div");
      div.className = "ball";
      div2.className = "ball2";
      div.style.top = e.clientY + "px";
      div.style.left = e.clientX + "px";
      document.body.appendChild(div);
      div.appendChild(div2);

      let y = window.innerHeight - e.clientY;
      console.log(y);
      div.style.webkitTransform = `translateY(${y}px)`;
      div.style.transform = `translateY(${y}px)`;
      div2.style.webkitTransform = `translateX(-${e.clientX - 20}px)`;
      div2.style.transform = `translateX(-${e.clientX - 20}px)`;
      setTimeout(() => {
        document.body.removeChild(div);
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./cs.css";
.button {
  margin-top: 50px;
  margin-left: 50%;
}
</style>