<template>
  <div class="content"
    v-loading='loading'>
    <ul class='player-list'>
      <li v-for='item in playerList' :key='item'>
        <player></player>
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

export default {
  props: [],
  components: {
    player
  },
  data() {
    return {
      playerList: [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2],
      loading: true,
    };
  },
  computed: {},
  methods: {},
  mounted() {
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
