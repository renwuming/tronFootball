<template>
  <div class="content"
    v-loading='loading'>
    <ul class='player-list'>
      <li v-for='item in playerList' :key='item'>
        <player :data="tiem"></player>
        <p class='price'>0.11 NAS</p>
        <el-button class='buy-btn'>购买</el-button>
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
let dappaddress = 'n1e2ooLb5Fzgrbmg6DrKCd4p7SHVPUyDz46';
let to = dappaddress;



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
  methods: {},
  mounted() {

    let value = 0;
    let callFunction = "foreach_sale_card";
    let callArgs = "";
    this.$NebPay.simulateCall(to,value,callFunction,callArgs,{
      listener:(resp) => {
        console.log("result----------" + resp.result)
        let parts = resp.result.split("_");
        let players = {
          player_id : 0,
          shoot : 0,
          defend : 0,
          speed : 0,
          shoot_factor : 0,
          defend_factor : 0,
          speed_factor : 0,
          player_role : 0,
          growth : 0
        }
        for(let j=0;j<parts.length;j++){
          let detail = parts[j].split("~");
          players.player_id = detail[0];
          players.shoot = detail[1];
          players.defend = detail[2];
          players.speed = detail[3];
          players.shoot_factor = detail[4];
          players.defend_factor = detail[5];
          players.speed_factor = detail[6];
          players.player_role = detail[7];
          players.growth = detail[8];

        this.playerList[j] = players;
        }
        console.log(this.playerList[0].player_id);
      }

      })

    setTimeout(_ => {
      this.loading = false
    }, 500)
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
