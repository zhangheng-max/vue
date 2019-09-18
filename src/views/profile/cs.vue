<template>
  <div class="vehicle">
    <button @click="check=true">显示</button>
    <div class="shadow" v-if="check">
      <div class="Grade">
        <section class="icon">
          <van-icon name="cross" class="icon_in" @click="check=false" />
          <p>车辆整体评分</p>
        </section>
        <section class="model">
          <van-picker :columns="columns" @change="onChange" class="columns" />
          <van-picker :columns="columns" @change="Version" class="columns" />
        </section>
        <section>
          <div class="button">保存</div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);

import "./rem";

export default {
  data() {
    return {
      check: true,
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"]
    };
  },
  methods: {
    onChange(picker, value, index) {
      // `当前值：${value}, 当前索引：${index}`;
      console.log(value);
    },
    Version(picker, value, index) {
      // `当前值：${value}, 当前索引：${index}`;
      console.log(value);
    }
  }
};
</script>

<style lang="scss" scoped>
.vehicle {
  width: 100%;
  height: 100%;
  .shadow {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 59;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: rgba($color: #000000, $alpha: 0.5);
    .Grade {
      width: 86%;
      // width: 100%;
      padding: 0.1rem 0.13rem;
      margin: 0 auto;
      background: #fff;
      .icon {
        text-align: right;
        p {
          text-align: left;
          font-size: 0.18rem;
          font-weight: 600;
          margin-left: 0.1rem;
          margin-bottom: 0.1rem;
        }
      }
      .model {
        display: flex;
        justify-content: center;
        .columns {
          padding: 0 0.15rem;
        }
      }
    }
    .button {
      margin-top: 0.1rem;
      width: 100%;
      padding: 0.15rem 0;
      background: blue;
      color: #fff;
      font-size: 0.18rem;
      font-weight: bold;
      text-align: center;
      border-radius: 0.05rem;
    }
  }
}
</style>