<template>
  <div class='content'>
    <div class="battle-box">
      <div class="line left">
        <div class="item">
          <div class='player-box'>
            <player :data="defenseList[0]"></player>
          </div>
        </div>
        <div class="item">
          <div class='player-box'>
            <player :data="defenseList[1]"></player>
          </div>
        </div>
      </div>
      <div class="line left">
        <div class="item">
          <div class='player-box'>
            <player :data="defenseList[2]"></player>
          </div>
        </div>
        <div class="item">
          <div class='player-box'>
            <player :data="defenseList[3]"></player>
          </div>
        </div>
      </div>
      <div class="line">
        <div class="item">
          <div class='player-box'>
            <player :data="defenseList[4]"></player>
          </div>
        </div>
        <i class="mid-icon fa fa-futbol-o" aria-hidden="true"></i>
        <div class="item me">
          <div class='player-box'>
            <player :data="attackList[0]"></player>
          </div>
        </div>
      </div>
      <div class="line right">
        <div class="item me">
          <div class='player-box'>
            <player :data="attackList[1]"></player>
          </div>
        </div>
        <div class="item me">
          <div class='player-box'>
            <player :data="attackList[2]"></player>
          </div>
        </div>
      </div>
      <div class="line right">
        <div class="item me">
          <div class='player-box'>
            <player :data="attackList[3]"></player>
          </div>
        </div>
        <div class="item me">
          <div class='player-box'>
            <player :data="attackList[4]"></player>
          </div>
        </div>
      </div>
    </div>
    <div class="live-box">
      <div class="text-live">{{liveStr}}</div>
      <el-button class='skip-btn'>跳过</el-button>
    </div>
    <!-- <ul class='defense-list'>
      <li v-for='item in defenseList' :key='item'>
        <div class="defense-players">
          <defense-list></defense-list>
        </div>
      </li>
    </ul> -->
  </div>
</template>

<script>
import player from "../components/miniPlayer";
import handleStr from "./handleStr";

export default {
  components: {
    player
  },
  data() {
    return {
      defenseList: this.$route.query.team,
      attackList: this.getItem('playerList'),
      liveStr: '',
    };
  },
  computed: {},
  methods: {
  },
  async mounted() {
    const myList = ["任无名", "赵无极", "韩如梦", "落霞雨", "任正天"];
    const enemyList = ["敌方1", "敌方2", "敌方3", "敌方4", "敌方守门员"];
    // const resultList = [2, 1];
    let callArgs = `["${this.defenseList[0].address}"]`;
    let result = null;
    await this.$call(0,"team_vs",callArgs);

    const self = this;
    let winner_growth;
    function getResult() {
      setTimeout(async () => {
        result = await self.$simulateCall(0,"get_match_info","");
        if(!result) {
          getResult();
        } else {
          console.log(result);
          let resultback = result.split("_");
          let resultList = []
          resultList.push(resultback[10]);
          resultList.push(resultback[11]);
          winner_growth = resultback[12];
          handleStr.apply(this, [myList.concat(enemyList), ...resultList]);
        }
      },500);
    }

    getResult();



  }
};
</script>

<style lang='scss' scoped>
.content {
  display: flex;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px;
  .battle-box {
    width: 60%;
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
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    .text-live {
      width: 100%;
      height: 700px;
      padding: 10px;
      background-color: rgba(255, 255, 255, 0.5);
      white-space: pre-wrap;
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
