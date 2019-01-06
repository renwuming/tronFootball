<template>
  <div class="content">
    <div class="battle-box">
      <div class="line left">
        <div class="item">
          <div class="player-box">
            <player :data="defenseList[0]"></player>
          </div>
        </div>
        <div class="item">
          <div class="player-box">
            <player :data="defenseList[1]"></player>
          </div>
        </div>
      </div>
      <div class="line left">
        <div class="item">
          <div class="player-box">
            <player :data="defenseList[2]"></player>
          </div>
        </div>
        <div class="item">
          <div class="player-box">
            <player :data="defenseList[3]"></player>
          </div>
        </div>
      </div>
      <div class="line">
        <div class="item">
          <div class="player-box">
            <player :data="defenseList[4]"></player>
          </div>
        </div>
        <i class="mid-icon fa fa-futbol-o" aria-hidden="true"></i>
        <div class="item me">
          <div class="player-box">
            <player :data="attackList[4]"></player>
          </div>
        </div>
      </div>
      <div class="line right">
        <div class="item me">
          <div class="player-box">
            <player :data="attackList[3]"></player>
          </div>
        </div>
        <div class="item me">
          <div class="player-box">
            <player :data="attackList[2]"></player>
          </div>
        </div>
      </div>
      <div class="line right">
        <div class="item me">
          <div class="player-box">
            <player :data="attackList[1]"></player>
          </div>
        </div>
        <div class="item me">
          <div class="player-box">
            <player :data="attackList[0]"></player>
          </div>
        </div>
      </div>
    </div>
    <div class="live-box">
      <div v-show="resultList.length<1" class="text-live">
        {{liveStr}}
        <i
          class="fa fa-spinner fa-pulse fa-3x fa-fw"
          style="margin-top:30px;font-size:36px;"
        ></i>
      </div>
      <div v-show="resultList.length>1" class="text-live">
        <p style="font-size:80px;width:100%;display:flex;justify-content:center;">
          <span style="width:160px;text-align:center;">{{resultList[0]}}</span>
          <span style="display:inline-block;width:40px;text-align:center;">:</span>
          <span style="width:160px;text-align:center;">{{resultList[1]}}</span>
        </p>
        <p style="font-size:20px;width:100%;display:flex;justify-content:center;">
          <span style="width:160px;text-align:center;">我方</span>
          <span style="display:inline-block;width:40px;text-align:center;"></span>
          <span style="width:160px;text-align:center;">敌方</span>
        </p>
        <p v-show="winFlag" class="win-box">获胜!</p>
        <p v-show="!winFlag" class="lose-box">失败</p>
        <p class="bottom-btn hand" @click="challenge">再次挑战</p>
      </div>
    </div>
  </div>
</template>

<script>
import player from "../components/miniPlayer";
import handleStr from "./handleStr";
import team_vs from "../util";

export default {
  components: {
    player
  },
  data() {
    return {
      defenseList: this.$route.query.team,
      address: this.$route.query.address,
      liveStr: "激烈角逐中",
      resultList: [],
      winFlag: false,
      noPower: false,
      attackList: []
    };
  },
  computed: {},
  methods: {
    async handlePowerTip() {
      let fb = await this.$football();
      let user = await fb.user_login().call();
      let power = user[3].toNumber();
      if (isNaN(power)) power = "??";
      this.$store.commit({
        type: "update",
        power
      });
      if (power <= 0) {
        this.$message({
          type: "error",
          showClose: true,
          duration: 0,
          message: "您的体力值不足!"
        });
        this.noPower = true;
      }
    },
    async challenge() {
      this.resultList = [];
      let fb = await this.$football();
      this.handlePowerTip();
      await this.init();
      await this.initMe();

      var res = team_vs(this.attackList, this.defenseList);
      this.resultList = [res[0], res[1]];
      this.winFlag = res[0] > res[1] ? true : false;
      console.log(res[2],res[3])
      fb.add_level(this.attackList.map(e=>e.cardId), this.defenseList.map(e=>e.cardId), res[2], res[3]).send();
    },
    getPlayerByCardId(cardId, playerList) {
      for (let i = 0; i < playerList.length; i++) {
        let p = playerList[i];
        if (p.cardId == cardId) return p;
      }
      return null;
    },
    async init() {
      let fb = await this.$football();
      const team = this.defenseList;
      for (let j = 0; j < team.length; j++) {
        const cardId = team[j].cardId;
        var card_info = await fb.get_card_info(cardId).call();
        var player = this.$getPlayer(card_info[2]);
        var card = {
          cardId: card_info[0],
          cardOwner: card_info[1],
          avatorId: card_info[2],
          level: card_info[3],
          onMarket: card_info[4],
          player_name: player.playerName,
          shoot: player.playerAttackValue,
          defend: player.playerDefendValue,
          speed: player.playerSpeedValue,
          position: player.playerPosition
        };
        if (this.pageChange != this.initDetailCount) return; // init次数与翻页次数不同，则退出
        card["avator"] = `${this.$preUrl}${card["avatorId"]}.jpg`;
        this.handlePlayerStorage(card, "attack"); // 缓存球员头像
        this.$set(this.defenseList, j, card);
      }
    },
    async initMe() {
      let fb = await this.$football();
      const team = this.attackList;
      for (let j = 0; j < team.length; j++) {
        const cardId = team[j].cardId;
        var card_info = await fb.get_card_info(cardId).call();
        var player = this.$getPlayer(card_info[2]);
        var card = {
          cardId: card_info[0],
          cardOwner: card_info[1],
          avatorId: card_info[2],
          level: card_info[3],
          onMarket: card_info[4],
          player_name: player.playerName,
          shoot: player.playerAttackValue,
          defend: player.playerDefendValue,
          speed: player.playerSpeedValue,
          position: player.playerPosition
        };
        if (this.pageChange != this.initDetailCount) return; // init次数与翻页次数不同，则退出
        card["avator"] = `${this.$preUrl}${card["avatorId"]}.jpg`;
        this.handlePlayerStorage(card, "attack"); // 缓存球员头像
        this.$set(this.attackList, j, card);
      }
      console.log(this.attackList);
    }
  },
  async created() {
    const team = this.getItem("teamList");
    const map = this.getItem("playerMap") || {};
    this.attackList = team.map(cid => {
      return map[cid];
    });
    this.challenge();
  }
};
</script>

<style lang='scss' scoped>
.content {
  position: relative;
  display: flex;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px;
  .battle-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: 100%;
    .line {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      &.left {
        justify-content: flex-start;
      }
      &.right {
        justify-content: flex-end;
      }
    }
    .item {
      display: flex;
      justify-content: center;
      text-align: center;
      margin-right: 20px;
      background-color: rgba(233, 23, 32, 0.7);
      border-radius: 10px;
      position: relative;
      overflow: hidden;
      &.me {
        background-color: rgba(255, 215, 3, 0.7);
      }
      .player-box {
      }
    }
  }
  .live-box {
    width: 50%;
    height: 300px;
    display: flex;
    position: absolute;
    left: 40px;
    bottom: 40px;
    flex-direction: column;
    align-items: center;
    padding: 20px;

    .bottom-btn {
      position: absolute;
      bottom: -30px;
      background-color: rgb(236, 185, 30);
      width: 200px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      border-radius: 20px;
    }
    .text-live {
      width: 100%;
      font-size: 22px;
      height: 700px;
      padding: 10px;
      background-color: rgba(255, 255, 255, 0.8);
      white-space: pre-wrap;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .win-box {
      color: #e91720;
      line-height: 40px;
      margin-top: 20px;
      font-size: 30px;
    }
    .lose-box {
      color: #3cac54;
      line-height: 40px;
      margin-top: 20px;
      font-size: 30px;
    }
    .skip-btn {
      width: 80%;
      margin-top: 40px;
      color: #fff;
      font-size: 20px;
      background-color: #3cac54;
      border-color: #3cac54;
      border-radius: 60px;
    }
  }
}
.mid-icon {
  font-size: 100px;
  color: #aaa;
  margin-right: 20px;
}
</style>
