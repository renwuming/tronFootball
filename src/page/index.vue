<template>
  <div class="content" v-loading="loading">
    <ul class="player-list">
      <li v-for="item in playerList" :key="item.cardId">
        <player :data="item"></player>
        <p class="price">{{item.price}} TRX</p>
        <el-button class="buy-btn" v-on:click="buy(item.cardId,item.price)">购买</el-button>
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
// import {login} from '../api'
import Vue from "vue";
import player from "../components/player";
import get_player from "../data.js";

export default {
  props: [],
  components: {
    player
  },
  data() {
    return {
      playerList: [],
      loading: true,
      pageNum: 1,
      pageTotal: 0,
      pageSize: 10,
      topList: []
    };
  },
  computed: {},
  methods: {
    //buy function
    async buy(id, price) {
  console.log(id,price)
      await (await this.$football()).buy_card(id, price).send();

      this.$message({
        showClose: true,
        duration: 0,
        message: "请在区块链交易成功后，刷新页面！"
      });
    },
    async init() {
      const INT = 100*10000
      this.loading = true;
      let start = this.pageSize * (this.pageNum - 1),
        end = start + this.pageSize;
      if (end > this.pageTotal) end = this.pageTotal;
      let player_list = [];
      for (let j = start; j < end; j++) {
        let players = {
          cardId: `${j}${Math.random()}`,
          player_name: null,
          shoot: 0,
          defend: 0,
          speed: 0,
          position: 0,
          price: 0,
          level: 0,
        };
        let detail = this.topList[j];
        players.cardId = detail.cardId;
        players.avatorId = detail.playerId;
        players.player_name = detail.playerName;
        players.shoot = detail.playerAttackValue;
        players.defend = detail.playerDefendValue;
        players.speed = detail.playerSpeedValue;
        players.position = detail.playerPosition;
        players.price = detail.price / INT;
        players.level = detail.level;
        players.avator = `${this.$preUrl}${players.avatorId}.jpg`;
        this.handlePlayerStorage(players, "attack"); // 缓存球员头像
        player_list.push(players);
      }
      this.playerList = player_list;
      this.loading = false;
    }
  },
  //获得市场上所有卡片信息，信息包括卡片id，球员id，球员姓名，攻击，防御，速度，位置，卡片价格
  async created() {
    let card_on_market = await (await this.$football())
      .get_all_card_on_market()
      .call();
    let list = [];
    for (let i = 0; i < card_on_market[1].toNumber(); i++) {
      let card_id = card_on_market[0][i].toString();
      let card_info = await (await this.$football())
        .get_card_info(card_id)
        .call();

      let [card_id2, ownerId, playerId, level, onMarket, price] = card_info;
      let card_detail = get_player(card_info[2].toString());
      card_detail.cardId = card_id;
      card_detail.price = card_info[5].toString();
      card_detail.level = level

      list.push(card_detail);
    }
    this.topList = list;
    this.pageTotal = this.topList.length;
    this.init();
  },
  watch: {
    pageNum() {
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
  .player-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    li {
      width: 200px;
      margin-right: 20px;
      text-align: center;
      background-color: #fff;
      border-radius: 10px;
      padding: 10px;
      margin-top: 20px;
      .buy-btn {
        width: 70%;
        color: #fff;
        background-color: #3cac54;
        border-color: #3cac54;
        border-radius: 60px;
      }
      .price {
        color: #282828;
        font-weight: bold;
        margin-bottom: 10px;
        font-size: 18px;
      }
    }
  }
  .page-list {
    margin-top: 20px;
  }
}
</style>
