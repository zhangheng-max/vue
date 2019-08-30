<template>
  <div class="Pronfile_info_setusername">
    <Header GoBack="true">
      <span slot="infousername">修改用户名</span>
    </Header>
    <section class="username">
      <van-field
        v-model="title"
        class="input"
        :class="{[input]:true}"
        placeholder="请输入用户名"
        @input="ChangInput()"
      />
      <p :class="{[setname]:true}">用户名长度在5到24位之间</p>
      <van-button type="info" :disabled="check" class="button">信息按钮</van-button>
    </section>
  </div>
</template>

<script>
import Header from "../hfod/Header";
export default {
  data() {
    return {
      title: "", //input的内容
      check: true, //按钮状态呢
      input: "",
      setname: ""
    };
  },
  components: {
    Header
  },
  methods: {
    ChangInput() {
      if (this.title.length < 5 || this.title.length > 24) {
        this.input = "setname-input";
        this.setname = "setname";
        this.check = true;
      } else {
        this.setname = "";
        this.input = "";
        this.check = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.Pronfile_info_setusername {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f5f5f5;
  z-index: 99;
  display: flex;
  flex-direction: column;
  .username {
    flex-grow: 1;
    padding: 0 0.1rem;
    padding-top: 0.66rem;
    .input {
      width: 100%;
      background: #f5f5f5;
      border: 0.01rem #ccc solid;
      font-size: 0.2rem;
    }
    .setname-input {
      border: 0.01rem red solid;
    }
    .setname {
      color: red;
    }
    p {
      font-size: 0.16rem;
      margin-top: 0.05rem;
      color: #666;
    }
    .button {
      width: 100%;
      border-radius: 0.05rem;
      margin-top: 0.2rem;
    }
  }
}
</style>