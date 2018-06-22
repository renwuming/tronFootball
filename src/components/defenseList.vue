<template>
  <div class="wrapper">
    <ul class='player-list'>
      <li v-for='(item2,index) in list'>
        <player :market='false' :small='false' :data='item2'></player>
        <p v-if='index == 0' class='pos-btn'>守门员</p>
      </li>
    </ul>
  </div>
</template>

<script>
// import {login} from '../api'
import player from "../components/player";

export default {
  props: {
    list : Array,
  },
  components: {
    player
  },
  data() {
    return {
      playerList: [1, 2, 3, 2, 3],
      posMap: ['前锋','前锋','后卫','后卫','守门员']
    };
  },
  computed: {},
  methods: {}
};
</script>

<style lang='scss' scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  .player-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    li {
      width: 19%;
      margin-right: 1%;
      text-align: center;
      background-color: #fff;
      border-radius: 10px;
      padding-bottom: 40px;
      position: relative;
      overflow: hidden;
      .pos-btn {
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: rgb(236, 185, 30);
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
      }
    }
  }
  .page-list {
    margin-top: 20px;
  }
}
</style>
