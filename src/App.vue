<template>
  <el-container>
    <el-header class='header-top'>
      <img class='logo' src="./assets/img/logo.png">
      <h1>星云世界杯</h1>
      <div class='user-box'>
        <span v-if='userName'>{{userName}} | 体力 {{power}}</span>
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
    <div class="top-btn">
      <span>获取球员</span>
    </div>
    <div class="free-btn hand no-hover" @click='getFree'>
      <el-tooltip class="item" effect="dark" content="新玩家限一次，免费抽取5名球员" placement="right">
        <i class="fa" style='font-size:30px;'>free!</i>
      </el-tooltip>
    </div>
    <div class="normal-btn free-btn hand no-hover" @click='getCommon'>
      <el-tooltip class="item" effect="dark" content="较少花费，抽取1名普通球员" placement="right">
        <i class="fa fa-gift" aria-hidden="true"></i>
      </el-tooltip>
    </div>
    <div class="vip-btn free-btn hand no-hover" @click='getVIP'>
      <el-tooltip class="item" effect="dark" content="较多花费，抽取1名优秀球员" placement="right">
        <i class="fa fa-gift" aria-hidden="true"></i>
      </el-tooltip>
      <span>vip</span>
    </div>
    <div class="top-btn-right">
      <span>补充体力</span>
    </div>
    <div class="free-power-btn hand no-hover" @click='getFreePower'>
      <el-tooltip class="item" effect="dark" content="每天一次，免费增加5点体力" placement="left">
        <i class="fa fa-medkit" aria-hidden="true"></i>
      </el-tooltip>
    </div>
    <div class="power-btn free-power-btn hand no-hover" @click='getPower'>
      <el-tooltip class="item" effect="dark" content="较少花费，增加5点体力" placement="left">
        <i class="fa fa-medkit" aria-hidden="true"></i>
      </el-tooltip>
    </div>
  </el-container>

</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      activeMenu: null,
      userName: "",
      power: "-"
    };
  },
  methods: {
    async init() {
      let commonPrice = await this.$simulateCall(
        0,
        "get_common_card_price",
        ""
      );
      this.setItem("commonPrice", commonPrice);
      let vipPrice = await this.$simulateCall(0, "get_vip_card_price", "");
      this.setItem("vipPrice", vipPrice);
      let powerPrice = await this.$simulateCall(0, "get_power_price", "");
      this.setItem("powerPrice", powerPrice);
    },
    async getFree() {
      let data = await this.$call(0, "get_free_card", "");
    },
    async getCommon() {
      let value = this.getItem("commonPrice");
      let price = +value / 1000000000000000000;
      let data = await this.$call(price, "get_common_card", "");
    },
    async getVIP() {
      let value = this.getItem("vipPrice");
      let price = +value / 1000000000000000000;
      let data = await this.$call(price, "get_vip_card", "");
    },
    async getPower() {
      let value = this.getItem("powerPrice");
      let price = +value / 1000000000000000000;
      let data = await this.$call(price, "get_power", "");
    },
    async getFreePower() {
      let data = await this.$call(0, "get_free_power", "");
    }
  },
  watch: {
    $route() {
      const { name, meta } = Vue.currentRouter;
      this.activeMenu = name;
      this.power = Vue.power;
      this.init();
      this.userName = this.getItem("userName");
    }
  },
  mounted() {
    this.userName = this.getItem("userName");
    this.power = Vue.power;
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
  position: relative;
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
  .user-box {
    position: absolute;
    right: 80px;
    top: 24px;
    color: #fff;
    font-size: 20px;
    background-color: #3cac54;
    padding: 4px 20px;
  }
}
.free-btn {
  position: fixed;
  left: -10px;
  top: 100px;
  width: 100px;
  height: 100px;
  font-size: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  border: 2px solid #3cac54;
  z-index: 10000;
  &:hover {
    background-color: #3cac54;
    i {
      font-size: 40px;
      color: #fff;
    }
  }
  i {
    font-size: 40px;
    color: #3cac54;
    width: 100%;
    text-align: center;
  }
  span {
    font-size: 30px;
  }
}
.normal-btn {
  top: 220px;
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
.vip-btn {
  top: 340px;
  border: 2px solid #ffff00;
  &:hover {
    background-color: #ffff00;
    i,
    span {
      color: #fff;
    }
  }
  i,
  span {
    color: #ffff00;
  }
}
.free-power-btn {
  position: fixed;
  right: -10px;
  top: 100px;
  width: 100px;
  height: 100px;
  font-size: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  border: 2px solid #3cac54;
  z-index: 10000;
  &:hover {
    background-color: #3cac54;
    i {
      font-size: 40px;
      color: #fff;
    }
  }
  i {
    font-size: 40px;
    color: #3cac54;
    width: 100%;
    text-align: center;
  }
  span {
    font-size: 30px;
  }
}
.power-btn {
  top: 220px;
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
.top-btn {
  position: fixed;
  left: -10px;
  width: 100px;
  font-size: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  border: 2px solid #3cac54;
  z-index: 10000;
  top: 20px;
  height: 60px;
  span {
    color: #3cac54;
    font-size: 18px;
  }
}
.top-btn-right {
  position: fixed;
  right: -10px;
  width: 100px;
  font-size: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  border: 2px solid #3cac54;
  z-index: 10000;
  top: 20px;
  height: 60px;
  span {
    color: #3cac54;
    font-size: 18px;
  }
}
</style>

