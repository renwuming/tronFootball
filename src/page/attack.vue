<template>
  <div class="content"
    v-loading="loading"
  >
    <ul class='defense-list'>
      <li v-for='item in defenseList' :key='item'>
        <p class='attack-btn hand no-hover' @click='attack'>
          <i class="fa fa-futbol-o" aria-hidden="true"></i>
          <span>挑战</span>
        </p>
        <div class="defense-players">
          <defense-list :list="item"></defense-list>
        </div>
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
    };
  },
  computed: {},
  methods: {
    attack() {
      // this.attackModalShow = true;
      this.$router.push({name: 'attackDetail'})
    }
  },
  async mounted() {
    let totallist = [];
    let list = await this.$simulateCall(0, "foreach_rank_card", "");
    let toplist = list.split("_");
    for (let i=0;i<toplist.length;i++){
      let single_team = [];
      let ele = toplist[i].replace(/\"/g,"").split(":");
      // toplist_j[ele[0]] = ele[1];
      let callArgs_d = `["${ele[1]}"]`;
      // console.log(callArgs_d);
      let detail = await this.$simulateCall(0, "get_user_player", callArgs_d);
      let team = JSON.parse(detail)["team"].split("_").slice(1,6);
      for (let j=0;j<5;j++){
        let member_j = {};
        let callArgs_m = `["${team[j]}"]`;
        let member = await this.$simulateCall(0, "get_card_id", callArgs_m);
        let member_num = member.replace(/\"/g,"").split(",")
        member_j["player_id"] = member_num[0];
        member_j["player_name"] = member_num[1];
        member_j["shoot"] = member_num[2];
        member_j["defend"] = member_num[3];
        member_j["speed"] = member_num[4];
        member_j["shoot_factor"] = member_num[5];
        member_j["defend_factor"] = member_num[6];
        member_j["speed_factor"] = member_num[7];
        member_j["player_role"] = member_num[8];
        member_j["growth"] = member_num[9];
        // single_team.push(member);
        single_team.push(member_j);

      }
      // toplist_d.push(ele[1]);
      totallist.push(single_team);
    }

    this.defenseList = totallist;
    // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"+totallist[0][1].speed)

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
      .defense-players {
        width: 80%;
      }
      .attack-btn {
        width: 150px;
        height: 150px;
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
