<template>
  <div class="content" v-loading="loading">
    <ul class="defense-list">
      <li v-for="(item,index) in defenseList" :key="item.avatorId" :class="{me: same(address,item.address)}">
        <p
          v-if="power>0&&teamList&&teamList.length&&!same(address,item.address)"
          class="attack-btn hand no-hover"
          @click="attack(item)"
        >
          <span>No.{{index+1}}</span>
          <i class="fa fa-futbol-o" aria-hidden="true"></i>
          <span v-show="item.length>0">挑战</span>
        </p>
        <p v-else class="attack-btn">
          <span>No.{{index+1}}</span>
          <i class="fa fa-futbol-o" aria-hidden="true"></i>
          <span v-if="same(address,item.address)">我的队伍</span>
        </p>
        <div class="defense-players">
          <p class="address-box">{{item.address}}</p>
          <defense-list :list="item"></defense-list>
        </div>
      </li>
    </ul>
    <el-pagination
      class="page-list"
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :current-page.sync="pageNum"
      :total="pageTotal"
    ></el-pagination>
  </div>
</template>

<script>
import Vue from "vue";
import player from "../components/player";
import defenseList from "../components/defenseList";
import { mapState } from "vuex";

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
      teamTip: false,
      powerTip: false,
      pageChange: 1,
      initDetailCount: 0
    };
  },
  computed: {
    ...mapState(["power", "address", "teamList"])
  },
  methods: {
    same(add1, add2) {
      add1 = add1.slice(2).toLowerCase()
      add2 = add2.slice(2).toLowerCase()
      return add1 == add2
    },
    async attack(en_team) {
      if (en_team.length <= 0) {
        this.$message.warning("正在加载队伍，请稍候~");
        return;
      }
      if (isNaN(this.power) || Vue.power <= 0) {
        Vue.prototype.$message({
          type: "error",
          showClose: true,
          duration: 0,
          message: "您的体力值不足!"
        });
      } else {
        this.$router.push({
          name: "attackDetail",
          query: { team: en_team, address: en_team.address }
        });
      }
    },
    async init() {
      let totallist = [];
      let start = this.pageSize * (this.pageNum - 1),
        end = start + this.pageSize;
      if (end > this.pageTotal) end = this.pageTotal;
      for (let i = start; i < end; i++) {
        let ele = this.toplist[i].replace(/\"/g, "").split(":");
        let callArgs_d = `["${ele[1]}"]`;
        let detail = await this.$simulateCall(0, "get_user_player", callArgs_d);
        detail = JSON.parse(detail);
        let team = detail.team
          .split("_")
          .slice(1, 6)
          .map(id => {
            return {
              cardId: id
            };
          });
        team.No = i + 1;
        team.address = ele[1];
        totallist.push(team);
      }
      if (totallist[0].address == this.defenseList[0].address) {
        this.defenseList = totallist;
        this.loadDetalFromStorage();
        this.initDetail();
      }
    },
    loadDetalFromStorage() {
      const map = this.getItem("playerMap") || {};
      for (let i = 0; i < this.defenseList.length; i++) {
        const team = this.defenseList[i];
        for (let j = 0; j < team.length; j++) {
          const cardId = team[j].cardId;
          if (!map[cardId]) continue;
          team[j] = map[cardId];
          const newTeam = team.concat();
          newTeam.address = team.address;
          newTeam.No = team.No;
          this.$set(this.defenseList, i, newTeam);
        }
      }
    },
    async initDetail() {
      this.initDetailCount++;
      for (let i = 0; i < this.defenseList.length; i++) {
        if (this.pageChange != this.initDetailCount) return; // init次数与翻页次数不同，则退出
        if (!this.defenseList[i]) return;
        const team = this.defenseList[i];
        for (let j = 0; j < team.length; j++) {
          if (this.pageChange != this.initDetailCount) return; // init次数与翻页次数不同，则退出
          let member_j = {};
          if (!team[j] instanceof Object) return;
          const cardId = team[j].cardId;
          let callArgs_m = `["${cardId}"]`;
          let member = await this.$simulateCall(0, "get_card_id", callArgs_m);
          if (this.pageChange != this.initDetailCount) return; // init次数与翻页次数不同，则退出
          let member_num = member.replace(/\"/g, "").split(",");
          let ele = this.toplist[i].replace(/\"/g, "").split(":");
          member_j["cardId"] = cardId;
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
          member_j["address"] = ele[1];
          member_j["avator"] = `${this.$preUrl}${member_j["avatorId"]}.jpg`;
          team[j] = member_j;
          this.handlePlayerStorage(member_j, "attack"); // 缓存球员头像
          const newTeam = team.concat();
          newTeam.address = team.address;
          newTeam.No = team.No;
          this.$set(this.defenseList, i, newTeam);
        }
      }
    },
    handlePowerTip() {
      if (this.powerTip) return;
      if (this.power <= 0) {
        Vue.prototype.$message({
          type: "error",
          showClose: true,
          duration: 0,
          message: "您的体力值不足!"
        });
        this.powerTip = true;
      }
    },
    handleTeamTip() {
      if (this.teamTip) return;
      if (!this.teamList || (this.teamList && this.teamList.length < 1)) {
        this.$message({
          showClose: true,
          duration: 0,
          type: "warning",
          message: "您还没有组建球队！"
        });
        this.teamTip = true;
      }
    },
    async loadList() {
      let fb = await this.$football()
      let totallist = [];
      let start = this.pageSize * (this.pageNum - 1),
        end = start + this.pageSize;
      if (end > this.pageTotal) end = this.pageTotal;
      for (let i = start; i < end; i++) {
        var teamRes = []
        var team = this.toplist[i];
        teamRes.address = team.address
        for(var j=0;j<5;j++) {
            var card_info = await fb.get_card_info(team[j]).call();
            var player = this.$getPlayer(card_info[2]);
            var card = {
                cardId:card_info[0],
                cardOwner:card_info[1],
                avatorId:card_info[2],
                level:card_info[3],
                onMarket:card_info[4],
                // card_price:card_info[5],
                player_name:player.playerName,
                shoot:player.playerAttackValue,
                defend:player.playerDefendValue,
                speed:player.playerSpeedValue,
                position:player.playerPosition
            }
            teamRes.push(card);
        }
        totallist.push(teamRes);
      }
      this.defenseList = totallist;
      this.loading = false;
    }
  },
  async mounted() {
    let list = []
    let fb = await this.$football();
    let allusers = await fb.get_all_users().call();
console.log(allusers)
    for (let i = 1; i < allusers[1].toNumber(); i++) {
      let user = allusers[0][i]
      let team = await fb.get_user_team(user).call()
      team.address = user.toString()
      list.push(team)
    }
console.log(list)
    this.toplist = list
    // let r = [1,2,3,4,5]
    // r.address = '416dec0a62a41f523b040ee19ccbf533eabca3a189'
    // this.toplist = [r]
    this.pageTotal = this.toplist.length;
    this.loadList();
    // this.init();
  },
  watch: {
    power() {
      this.handlePowerTip();
    },
    teamList() {
      this.handleTeamTip();
    },
    pageNum() {
      this.pageChange++;
      this.loadList();
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
