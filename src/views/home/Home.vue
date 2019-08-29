<template>
  <!-- 城市页面 -->
  <div class="Select">
    <!-- 表头 -->
    <Header GoBack="ele.me" :Head="{'login':this.user_cheack}"></Header>
    <div class="present">
      <div class="present-place">
        <p>当前定位城市:</p>
        <span>定位不准时,请在城市列表中选择</span>
      </div>
      <div class="present-city" @click="HomegoCity(guess.id)">
        <p>{{guess.name}}</p>
        <span>
          <van-icon name="arrow" />
        </span>
      </div>
    </div>
    <div class="hot">
      <p>热门城市</p>
      <ul>
        <li v-for="(v,i) in hot" :key="i" @click="HomegoCity(v.id)">{{v.name}}</li>
      </ul>
    </div>
    <div class="letter">
      <ol v-for="(v,i) in Object.keys(info).sort()" :key="i">
        <li>
          {{v}}
          <span></span>
        </li>
        <ul>
          <li v-for="(k,y) in info[v]" :key="y" @click="HomegoCity(k.id)">{{k.name}}</li>
        </ul>
      </ol>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "../hfod/Header.vue";
export default {
  data() {
    return {
      info: [], //所有城市数据内容
      guess: [], // 当前城市数据内容
      hot: [], // 热门城市数据内容
      login: false //是否已经登录
    };
  },
  components: {
    Header
  },
  computed: {
    //查看是否已经登录
    ...mapGetters(["user_cheack"])
  },
  methods: {
    //路由跳转到搜索页面
    HomegoCity(id) {
      // console.log(111);
      this.$router.push({ path: `/city/${id}` });
      // this.$router.push({ name: "City", params: { id: id } });
    }
  },
  mounted() {
    //所有城市数据内容
    this.$http.get(`http://elm.cangdu.org/v1/cities?type=group`).then(res => {
      // console.log(Object.keys(res.data).sort());
      this.info = res.data;
    });

    // 当前城市数据内容
    this.$http.get(`http://elm.cangdu.org/v1/cities?type=guess`).then(res => {
      // console.log(res);
      this.guess = res.data;
    });

    // 热门城市数据内容
    this.$http.get(`http://elm.cangdu.org/v1/cities?type=hot`).then(res => {
      // console.log(res);
      this.hot = res.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.Select {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}

.Select .present {
  width: 100%;
  padding-top: 0.6rem;
  background: #fff;
}
.Select .present .present-place {
  height: 0.4rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px #ccc solid;
}
.Select .present .present-place p {
  font-size: 0.16rem;
  line-height: 0.4rem;
  color: #666;
  margin-left: 0.1rem;
}
.Select .present .present-place span {
  line-height: 0.4rem;
  font-size: 0.14rem;
  font-weight: 900;
  color: #9f9f9f;
  margin-right: 0.1rem;
}
.Select .present .present-city {
  display: flex;
  height: 0.5rem;
  justify-content: space-between;
}
.Select .present .present-city p {
  line-height: 0.5rem;
  margin-left: 0.1rem;
  color: #3190e8;
}
.Select .present .present-city span {
  line-height: 0.5rem;
  margin-right: 0.1rem;
}
.Select .hot {
  width: 100%;
  background: #fff;
  margin: 0.2rem 0;
}
.Select .hot p {
  height: 0.4rem;
  line-height: 0.4rem;
  color: #666;
  font-weight: 400;
  text-indent: 0.1rem;
  font-size: 0.16rem;
  border-top: 2px solid #e4e4e4;
}
.Select .hot ul {
  width: 100%;
  border-top: 1px #ccc solid;
  display: flex;
  flex-wrap: wrap;
}
.Select .hot ul li {
  width: 25%;
  height: 0.5rem;
  color: #3190e8;
  line-height: 0.5rem;
  font-size: 0.16rem;
  overflow: hidden;
  text-align: center;
  border-bottom: 1px #ccc solid;
  border-right: 1px #ccc solid;
  box-sizing: border-box;
}
.Select .hot ul li a {
  color: #3190e8;
}
.Select .hot ul li:nth-child(4n) {
  border-right: 0;
}
.Select .letter ol {
  width: 100%;
  background: #fff;
  margin-bottom: 0.2rem;
}
.Select .letter ol > li {
  height: 0.4rem;
  line-height: 0.4rem;
  text-indent: 0.1rem;
  color: #666;
  font-size: 0.18rem;
  border-top: 2px solid #e4e4e4;
  font-weight: 400;
}
.Select .letter ol > li > span {
  font-size: 0.14rem;
  margin-left: 0.1rem;
}
.Select .letter ol ul {
  width: 100%;
  border-top: 1px #ccc solid;
  display: flex;
  flex-wrap: wrap;
}
.Select .letter ol ul li {
  width: 25%;
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.16rem;
  overflow: hidden;
  text-align: center;
  border-bottom: 1px #ccc solid;
  border-right: 1px #ccc solid;
  box-sizing: border-box;
}
.Select .letter ol ul li:nth-child(4n) {
  border-right: 0;
}
</style>