  <template>
  <!-- 搜索地址页面 -->
  <div class="Shopping">
    <!-- 表头 -->
    <Header GoBack="true" :Address="{cities:cities.name}">
      <span slot="head">
        <router-link to="/home" tag="span">切换城市</router-link>
      </span>
    </Header>

    <main class="main">
      <div class="city">
        <div class="city-input">
          <mt-field v-model="cityval" placeholder="输入学校、商务楼、地址"></mt-field>
        </div>
        <div class="city-button">
          <mt-button type="primary" @click="submit()">提交</mt-button>
        </div>
      </div>
      <div class="search" v-if="search==1">
        <p>很抱歉！无搜索结果</p>
      </div>
      <div class="getpois_ul" v-if="search.length>0">
        <ul>
          <li v-for="(v,i) in search" :key="i" @click="CitygoMsite(v)">
            <p>{{v.name}}</p>
            <span>{{v.address}}</span>
          </li>
        </ul>
      </div>
      <div v-if="search.length==0">
        <div class="pois">
          <p>搜索历史</p>
        </div>
        <div class="getpois" v-if="getpois.length>0">
          <ul>
            <!-- 点击跳转商家页面 -->
            <li v-for="(v,i) in getpois" :key="i" @click="CitygoMsite(v)">
              <p>{{v.name}}</p>
              <span>{{v.address}}</span>
            </li>
          </ul>
          <div class="del" @click="del()">清空所有</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Header from "../hfod/Header.vue";
export default {
  data() {
    return {
      cityval: "", //input内容
      cities: [], //传递id的城市数据内容
      search: [], //搜索内容
      getpois: [] //搜索历史
    };
  },
  components: {
    Header
  },
  methods: {
    //提交
    submit() {
      // this.$refs.inputVal.focus();
      if (this.cityval == "") {
        this.open();
      } else {
        //点击搜索地址数据内容
        let id = this.$route.params.id;
        this.$http
          .get(
            `http://elm.cangdu.org/v1/pois?type=search&city_id=${id}&keyword=${this.cityval}`
          )
          .then(res => {
            // console.log(res);
            if (res.data.length == 0) {
              res.data = 1;
            }
            this.search = res.data;
            // console.log(this.search);
          });
      }
    },

    // 当点击搜索内容为空时弹出框
    open() {
      this.$alert("内容不能为空", {
        confirmButtonText: "确定"
      });
    },

    //跳转到点击的附件商家
    CitygoMsite(v) {
      // console.log(v);
      let getpois = [...this.getpois]; //拷贝搜索历史的内容
      let check = getpois.some(val => {
        return val.geohash == v.geohash;
      });
      if (check == false) {
        getpois.push(v);
      }
      // console.log(check);

      localStorage.setItem("placeHistory", JSON.stringify(getpois));
      // console.log(getpois);

      this.getpois = getpois;
      this.$store.commit("setGeohash", v.geohash);
      this.$router.push({ path: `/msite`, query: { geohash: v.geohash } });
      // console.log(check);
    },

    //删除搜索历史
    del() {
      this.getpois = [];
      localStorage.removeItem("placeHistory");
    }
  },
  mounted() {
    //传递id的城市数据内容
    let id = this.$route.params.id;

    this.$http.get(`http://elm.cangdu.org/v1/cities/${id}`).then(res => {
      this.cities = res.data;
    });

    // 本地存储赋值
    let obj = JSON.parse(localStorage.getItem("placeHistory"));
    // console.log(obj);
    if (obj) {
      this.getpois = obj;
    }
  }
};
</script>

<style lang="scss" scoped>
.Shopping {
  margin: 0;
  padding: 0;
  background: #f4f4f4;
  display: flex;
  flex-direction: column;
}
.search {
  height: 0.45rem;
  line-height: 0.45rem;
  text-indent: 0.2rem;
  background: #fff;
  border-top: 0.02rem #ccc solid;
}
.Shopping .main {
  flex-grow: 1;
  width: 100%;
  margin-top: 0.7rem;
}
.Shopping .main .city {
  padding: 0.1rem 0;
  background: #fff;
  border-top: 0.01rem #ccc solid;
}
.Shopping .main .city .city-input {
  padding: 0 0.2rem;
  margin-bottom: 0.1rem;
}
.Shopping .main .city .city-button {
  padding: 0 0.2rem;
}
.Shopping .main .city .mint-cell {
  height: 0.34rem;
  // margin-top: 0.05rem;
  color: #333;
  border: 0.01rem solid #e4e4e4;
  border-radius: 0.05rem;
}

.Shopping .main .city button {
  width: 100%;
  height: 0.45rem;
  font-size: 0.2rem;
}
.Shopping .main .pois {
  width: 100%;
  border-top: 0.02rem solid #e4e4e4;
  border-bottom: 0.02rem solid #e4e4e4;
}
.Shopping .main .pois p {
  text-align: left;
  font-size: 0.12rem;
  color: #3b3b3b;
  text-indent: 0.15rem;
  padding: 0.05rem 0;
}
.Shopping .main .getpois {
  border-top: 0.01rem solid #e4e4e4;
  width: 100%;
}
.Shopping .main .getpois ul li {
  background: #fff;
  padding-top: 0.2rem;
  border-bottom: 0.01rem solid #e4e4e4;
}
.Shopping .main .getpois ul li span {
  margin-left: 0.2rem;
}
.Shopping .main .getpois ul li p {
  margin-left: 0.2rem;
}
.Shopping .main .getpois ul li p {
  font-size: 0.18rem;
}
.Shopping .main .getpois ul li span {
  display: block;
  font-size: 0.12rem;
  margin-top: 0.1rem;
  color: #999;
  margin-bottom: 0.1rem;
}
.Shopping .main .getpois .del {
  height: 0.5rem;
  color: #666;
  background: #fff;
  text-align: center;
  line-height: 0.5rem;
}
.Shopping .main .getpois_ul ul li {
  background: #fff;
  padding-top: 0.2rem;
  padding-bottom: 0.1rem;
  border-top: 0.01rem solid #e4e4e4;
}
.Shopping .main .getpois_ul ul li p {
  text-indent: 0.2rem;
  font-size: 0.18rem;
}
.Shopping .main .getpois_ul ul li span {
  display: block;
  font-size: 0.12rem;
  margin-top: 0.1rem;
  color: #999;
  margin-bottom: 0.1rem;
  margin-left: 0.2rem;
}
</style>