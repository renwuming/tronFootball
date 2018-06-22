<template>
  <div class="content">
    <ul class='player-list'>
      <li v-for='item in playerList' :key='item.id'>
        <player></player>
        <div class='btn-list'>
          <el-button class='buy-btn'>卖出</el-button>
          <img src="../assets/img/info.png" class='info-btn hand' @click='showDetail'>
        </div>
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
      <el-button class='defense-confirm-btn'>确认球队阵容</el-button>
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


    <el-dialog
      :visible.sync="detailShow"
      :show-close="false"
      :lock-scroll='false'
      class='detail-dialog'
      width="80%">
      <detail :value='detailPlayer'></detail>
      <span slot="footer" class="dialog-footer">
        <p class='confirm-btn hand' @click="detailShow = false">确 定</p>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import player from "../components/player";
import detail from "../components/detail";

export default {
  props: [],
  components: {
    player,
    detail
  },
  data() {
    return {
      playerList: [1, 2, 3, 4, 5, 6],
      firstShow: false,
      detailShow: false,
      detailPlayer: [140, 170, 120],
    };
  },
  computed: {},
  methods: {
    showDetail() {
      this.detailShow = true;
    }
  }
};
</script>

<style lang='scss' scoped>
.content {
  width: 100%;
  display: flex;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  .player-list {
    flex-grow: 0;
    width: 50%;
    flex-wrap: wrap;
    display: flex;
    li {
      width: 260px;
      height: 400px;
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
      .btn-list {
        position: relative;
        text-align: center;
        .info-btn {
          position: absolute;
          right: 0;
          top: 7px;
          width: 25px;
          height: auto;
        }
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
<style lang='scss'>
.detail-dialog {
  .el-dialog {
    background-color: #bbb !important;
    border-radius: 10px;
    border: 2px solid #fff;
  }
  .confirm-btn {
    background-color: transparent;
    border: 1px solid #fff;
  }
}

</style>

