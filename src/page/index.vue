<template>
  <div class="content"
    v-loading='loading'>
    <ul class='player-list'>
      <li v-for='item in playerList' :key='item'>
        <player :data="item"></player>
        <p class='price'>{{item.price}} NAS</p>
        <el-button class='buy-btn' v-on:click="buy(item.player_id,item.price)">购买</el-button>
      </li>
    </ul>
    <el-pagination
      class='page-list'
      background
      layout="prev, pager, next"
      :total="50">
    </el-pagination>
  </div>
</template>

<script>
// import {login} from '../api'
import Vue from 'vue'
import player from "../components/player";


export default {
  props: [],
  components: {
    player
  },
  data() {
    return {
      playerList: [],
      loading: true,
    };
  },
  computed: {},
  methods: {
    //buy function
    async buy(id,price){
      let value_buy = price;
      let callFunction_buy = 'get_sale_card';
      let callArgs_buy = `["${id}"]`;
      console.log(callArgs_buy);
      await this.$call(value_buy,callFunction_buy,callArgs_buy);

    }

  },
  async mounted() {
    //show player list and detail
    let value = 0;
    let callFunction = "foreach_sale_card";
    let callArgs = "";
    let list = await this.$simulateCall(value,callFunction,callArgs)
    let player_list = [];

    if (list.length > 2){
      let parts = list.split("_");

      for(let j=0;j<parts.length;j++){
        let players = {
          player_id : 0,
          player_name : null,
          shoot : 0,
          defend : 0,
          speed : 0,
          shoot_factor : 0,
          defend_factor : 0,
          speed_factor : 0,
          player_role : 0,
          growth : 0,
          price : 0
        };
        let detail = parts[j].split("~");
        let num = detail[1].split(",");
        players.player_id = detail[0].replace("\"","");
        players.player_name = num[0];
        players.shoot = num[1];
        players.defend = num[2];
        players.speed = num[3];
        players.shoot_factor = num[4];
        players.defend_factor = num[5];
        players.speed_factor = num[6];
        players.player_role = num[7];
        players.growth = num[8];
        players.price = detail[2].replace("\"","");

        player_list.push(players);
      }
      this.playerList = player_list;
      // console.log(this.playerList[0].shoot);
    }



      this.loading = false

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
