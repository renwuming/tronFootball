<template>
  <div class="content">
    <ul class='defense-list'>
      <li v-for='item in defenseList' :key='item'>
        <p class='attack-btn hand no-hover' @click='attack'>
          <i class="fa fa-futbol-o" aria-hidden="true"></i>
          <span>挑战</span>
        </p>
        <div class="defense-players">
          <defense-list></defense-list>
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
      defenseList: [1, 2, 3],
      attackModalShow: false
    };
  },
  computed: {},
  methods: {
    attack() {
      // this.attackModalShow = true;
      this.$router.push({name: 'attackDetail'})
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
