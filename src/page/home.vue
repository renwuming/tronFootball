<template>
  <div class="content">
    <ul class='player-list'>
      <li v-for='item in playerList' :key='item.id'>
        <player></player>
        <el-button class='buy-btn'>卖出</el-button>
      </li>
    </ul>
    <div class="defense-box">
      <div class="line">
        <div class="item">
          <i class="fa fa-question-circle" aria-hidden="true"></i>
          <div class="bottom-btn hand">选择前锋</div>
        </div>
        <div class="item">
          <div class='player-box'>
            <player></player>
            <div class="bottom-btn hand">替换前锋</div>
          </div>
        </div>
      </div>
      <div class="line">
        <div class="item">
          <i class="fa fa-question-circle" aria-hidden="true"></i>
          <div class="bottom-btn hand">选择后卫</div>
        </div>
        <div class="item">
          <div class='player-box'>
            <player></player>
            <div class="bottom-btn hand">替换后卫</div>
          </div>
        </div>
      </div>
      <div class="line">
        <div class="item">
          <div class='player-box'>
            <player></player>
            <div class="bottom-btn hand">替换守门员</div>
          </div>
        </div>
      </div>
      <el-button class='defense-confirm-btn'>确认防守阵容</el-button>
    </div>

    <el-dialog
      :visible.sync="firstShow"
      :show-close="false"
      width="80%">
      <span>欢迎来到xxxx!</span>
      <p>系统赠送您 5 名球员!</p>
      <span slot="footer" class="dialog-footer">
        <p class='confirm-btn hand' @click="firstShow = false">确 定</p>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import player from "../components/player";

export default {
  props: [],
  components: {
    player
  },
  data() {
    return {
      playerList: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        1,
        2,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3
      ],
      firstShow: true,
    };
  },
  computed: {},
  methods: {}
};
</script>

<style lang='scss' scoped>
.content {
  width: 100%;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  .player-list {
    flex-grow: 0;
    width: 50%;
    flex-wrap: wrap;
    display: flex;
    li {
      width: 200px;
      height: 350px;
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
    }
  }
  .defense-box {
    width: 50%;
    border-left: 2px solid #fff;
    min-height: 400px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    .line {
      display: flex;
      width: 100%;
      justify-content: center;
      margin-bottom: 20px;
    }
    .item {
      display: flex;
      justify-content: center;
      text-align: center;
      width: 200px;
      min-height: 350px;
      margin-right: 40px;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 10px;
      position: relative;
      overflow: hidden;
      i {
        color: #fff;
        font-size: 200px;
        margin-top: 55px;
      }
      .bottom-btn {
        position: absolute;
        bottom: 0;
        background-color: #3cac54;
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
      }
      .player-box {
        background-color: #fff;
      }
    }
    .defense-confirm-btn {
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
</style>
