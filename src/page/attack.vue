<template>
  <div class="content"
    v-loading="loading"
  >
    <ul class='defense-list'>
      <li v-for='item in defenseList' :key='item.avatorId' :class='{me: address==item.address}'>
        <p v-if='power>0&&teamList&&teamList.length&&address!=item.address' class='attack-btn hand no-hover' @click='attack(item)'>
          <span>No.{{item.No}}</span>
          <i class="fa fa-futbol-o" aria-hidden="true"></i>
          <span v-show='item.length>0'>挑战</span>
        </p>
        <p v-else class='attack-btn'>
          <span>No.{{item.No}}</span>
          <i class="fa fa-futbol-o" aria-hidden="true"></i>
          <span v-if='address==item.address'>我的队伍</span>
        </p>
        <div class="defense-players">
          <p class='address-box'>{{item.address}}</p>
          <defense-list :list="item"></defense-list>
        </div>
      </li>
    </ul>
    <el-pagination
      class='page-list'
      background
      layout="prev, pager, next"
      :page-size='pageSize'
      :current-page.sync='pageNum'
      :total="pageTotal">
    </el-pagination>
  </div>
</template>

<script>
import Vue from "vue";
import player from "../components/player";
import defenseList from "../components/defenseList";

export default {
  props: [],
  components: {
    player,
    defenseList
  },
  data() {
    return {
      defenseList: [],
      attackModalShow: false,
      loading: true,
      pageNum: 1,
      pageTotal: 0,
      pageSize: 3,
      toplist: [],
      address: "",
      teamList: [],
      power: 0,
    };
  },
  computed: {},
  methods: {
    async updatePower() {
      Vue.power = await Vue.prototype.$simulateCall(0, 'get_user_power', '')
      if(isNaN(+Vue.power)) Vue.power = '??'
      if(isNaN(+Vue.power)||Vue.power<=0) {
        Vue.prototype.$message({
          type: 'error',
          showClose: true,
          duration: 0,
          message: '您的体力值不足!'
        });
      }
      this.power = Vue.power
    },
    async attack(en_team) {
      if(en_team.length<=0) {
        this.$message.warning('正在加载队伍，请稍候~')
        return
      }
      if(isNaN(this.power)||Vue.power<=0) {
        Vue.prototype.$message({
          type: 'error',
          showClose: true,
          duration: 0,
          message: '您的体力值不足!'
        });
      } else {
        this.$router.push({ name: "attackDetail", query: { team: en_team } });
      }
    },
    async init() {
      let totallist = [];
      let start = this.pageSize * (this.pageNum - 1),
        end = start + this.pageSize;
      if (end > this.pageTotal) end = this.pageTotal;
      for (let i = start; i < end; i++) {
        let single_team = [];
        let ele = this.toplist[i].replace(/\"/g, "").split(":");
        let callArgs_d = `["${ele[1]}"]`;
        let detail = await this.$simulateCall(0, "get_user_player", callArgs_d);
        detail = JSON.parse(detail);
        let team = detail.team.split("_").slice(1, 6);
        for (let j = 0; j < 5; j++) {
          let member_j = {};
          let callArgs_m = `["${team[j]}"]`;
          let member = await this.$simulateCall(0, "get_card_id", callArgs_m);
          let member_num = member.replace(/\"/g, "").split(",");
          member_j["avatorId"] = member_num[0];
          member_j["player_name"] = member_num[1];
          member_j["shoot"] = member_num[2];
          member_j["defend"] = member_num[3];
          member_j["speed"] = member_num[4];
          member_j["shoot_factor"] = member_num[5];
          member_j["defend_factor"] = member_num[6];
          member_j["speed_factor"] = member_num[7];
          member_j["position"] = member_num[8];
          member_j["growth"] = member_num[9];
          member_j["avator"] = `${this.$preUrl}${member_j["avatorId"]}.jpg`;
          member_j["address"] = ele[1];
          single_team.push(member_j);
        }
        single_team.No = i + 1;
        single_team.address = ele[1];
        totallist.push(single_team);
      }
      if(totallist[0].address == this.defenseList[0].address) {
        this.defenseList = totallist;
      }
    },
    async handleAddress() {
      let address = await Vue.prototype.$simulateCall(0, 'get_address', '')
      Vue.address = JSON.parse(address)
      this.address = Vue.address
    },
    loadList() {
      let totallist = [];
      let start = this.pageSize * (this.pageNum - 1),
        end = start + this.pageSize;
      if (end > this.pageTotal) end = this.pageTotal;
      for (let i = start; i < end; i++) {
        let data = this.toplist[i].replace(/\"/g, "").split(':')
        const address = data[1],
              No = data[0],
              item = []
        item.No = No
        item.address = address
        totallist.push(item)
      }
      this.defenseList = totallist
      this.loading = false;
    }
  },
  async mounted() {
    this.updatePower()
    // 获取team信息
    let res = await this.$simulateCall(0, "user_login", "");
    res = JSON.parse(res);
    if (res instanceof Object) {
      let teamList = res.team.split("_").filter(e => !!e);
      this.setItem("teamList", teamList);
      this.teamList = teamList
    }
    if(!this.teamList || (this.teamList && this.teamList.length < 1)) {
      this.$message({
        showClose: true,
        duration: 0,
        type: "warning",
        message: "您还没有组建球队！"
      });
    }
    this.handleAddress()
    let list = await this.$simulateCall(0, "foreach_rank_card", "");
    if (list.length > 10) {
      this.toplist = list.split("_");
    }
    this.pageTotal = this.toplist.length;
    this.loadList()
    this.init();
  },
  watch: {
    pageNum() {
      this.loadList()
      this.init();
    }
  }
};
</script>

<style lang='scss' scoped>
.content {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  .defense-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    li {
      width: 100%;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 10px;
      padding: 10px 20px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      &.me {
        background-color: rgba(254, 58, 82, 0.5);
      }
      .defense-players {
        width: 80%;
        .address-box {
          width: 100%;
          text-align: center;
          background-color: #ecb91e;
          color: #fff;
          margin-bottom: 10px;
          border-radius: 20px;
        }
      }
      .attack-btn {
        width: 150px;
        background-color: #3cac54;
        border-radius: 20px;
        color: #fff;
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        padding: 10px 0;
        margin-right: 30px;
        i {
          margin-top: 10px;
          font-size: 90px;
        }
        span {
          font-size: 20px;
          margin-top: 10px;
        }
      }
    }
  }
  .page-list {
    margin-top: 20px;
  }
}
</style>
