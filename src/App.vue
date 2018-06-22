<template>
  <el-container>
    <el-header class='header-top'>
      <div>
        <h1>logo</h1>
      </div>
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
  </el-container>

</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      activeMenu: null,
      fullScreen: false,
      user: Vue.userInfo
    };
  },
  methods: {
    logout() {
      logout().then(res => {
        if (res.success) {
          this.$router.push({ name: "login" });
        } else {
          this.$message.warning("退出失败!");
        }
      });
    },
    gotoCreate() {
      const { href } = this.$router.resolve({ name: "activityEdit" });
      window.open(href, "_blank");
    }
  },
  watch: {
    $route() {
      this.user = Vue.userInfo;
      const { name, meta } = Vue.currentRouter;
      this.activeMenu = name;
      this.fullScreen = meta.fullScreen;
    }
  },
  mounted() {
    this.user = Vue.userInfo;
    const { name, meta } = Vue.currentRouter;
    this.activeMenu = name;
    this.fullScreen = meta.fullScreen;
    console.log(this.activeMenu);
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
.header-top {
  margin-top: 30px;
}
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
</style>

