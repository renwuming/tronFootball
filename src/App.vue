<template>
  <el-container>
    <el-header class='header-top'>
      <img class='logo' src="./assets/img/logo.png">
      <h1>星云世界杯</h1>
      <div class='user-box'>
        <span v-if='user'>{{user.name}}</span>
      </div>
    </el-header>
    <el-container class='wrapper'>
      <el-header height=40>
        <el-menu :default-active='activeMenu' :router='true'>
          <el-menu-item index="market" route='/'>球员市场</el-menu-item>
          <el-menu-item index="home" route='/home'>我的球员</el-menu-item>
          <el-menu-item index="attack" route='/attack'>竞技场</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <div class="free-btn hand no-hover" @click='getFree'>
      <i class="fa fa-gift" aria-hidden="true"></i>
    </div>
  </el-container>

</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      activeMenu: null,
      user: Vue.userInfo
    };
  },
  methods: {
    async getFree() {
      let list = await this.$call(0, 'get_free_card', '')
    },
  },
  watch: {
    $route() {
      this.user = Vue.userInfo;
      const { name, meta } = Vue.currentRouter;
      this.activeMenu = name;
    }
  },
  mounted() {
    this.user = Vue.userInfo;
    const { name, meta } = Vue.currentRouter;
    this.activeMenu = name;
  }
};
</script>

<style lang='scss'>
body {
  background-color: #2b5836;
  background: url(./assets/img/bk.jpg) top center/cover repeat-y;
  background-size: 100% auto;
  .el-message-box {
    width: auto;
  }
}
h1 {
  font-size: 24px;
  color: #fff;
}
.el-header {
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: #333;
}

.hand {
  cursor: pointer;
}
.hand:hover {
  text-decoration: underline;
}
.no-hover:hover {
  text-decoration: none;
}
.el-dialog__footer {
  padding-bottom: 10px;
}
.dialog-footer {
  display: flex;
  justify-content: center;
  .confirm-btn {
    width: 200px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background-color: #3cac54;
    border-color: #3cac54;
    border-radius: 10px;
  }
}
</style>
<style lang='scss' scoped>
.el-menu {
  display: flex;
  height: 40px;
  box-sizing: content-box;
  background-color: transparent;
  border-right: none;
  border-bottom: 2px solid rgba(255, 255, 204, 0.5);
  li {
    color: #ffffcc;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    width: 120px;
    text-align: center;
    box-sizing: border-box;
    margin-right: 10px;
  }
  .el-menu-item:focus,
  .el-menu-item:hover,
  .is-active {
    color: #cc3333;
    background-color: rgba(255, 255, 204, 0.5);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
}
.header-top {
  height: 80px !important;
  margin: 16px 0;
  display: flex;
  align-items: center;
  h1 {
    color: #fe5882;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
  }
  .logo {
    margin-right: 20px;
    height: 80px;
  }
}
.free-btn {
  position: fixed;
  left: -10px;
  top: 20px;
  width: 120px;
  height: 120px;
  font-size: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  border: 2px solid #fe5882;
  &:hover {
    background-color: #fe5882;
    i {
      color: #fff;
    }
  }
  i {
    color: #fe5882;
  }
}
</style>

