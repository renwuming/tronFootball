<template>
  <div class="content"
    v-loading='loading'
  >
    <div class="defense-box">
      <div class="line2">
        <div v-show='teamList[0]' class="item">
          <div class='player-box'>
            <player :data='teamPList[0]'></player>
          </div>
          <div class="bottom-btn hand unselect" @click='unselect(0)'>替换守门员</div>
        </div>
        <div v-show='!teamList[0]' class='item' :class='{selecting: waitSelectIndex==0}'>
          <i class="fa fa-question-circle" aria-hidden="true"></i>
          <div class="bottom-btn hand" @click='select(0)'>选择守门员</div>
        </div>
        <div v-show='teamList[1]' class="item">
          <div class='player-box'>
            <player :data='teamPList[1]'></player>
          </div>
          <div class="bottom-btn hand unselect" @click='unselect(1)'>替换球员</div>
        </div>
        <div v-show='!teamList[1]' class='item' :class='{selecting: waitSelectIndex==1}'>
          <i class="fa fa-question-circle" aria-hidden="true"></i>
          <div class="bottom-btn hand" @click='select(1)'>选择球员</div>
        </div>
        <div v-show='teamList[2]' class="item">
          <div class='player-box'>
            <player :data='teamPList[2]'></player>
          </div>
          <div class="bottom-btn hand unselect" @click='unselect(2)'>替换球员</div>
        </div>
        <div v-show='!teamList[2]' class='item' :class='{selecting: waitSelectIndex==2}'>
          <i class="fa fa-question-circle" aria-hidden="true"></i>
          <div class="bottom-btn hand" @click='select(2)'>选择球员</div>
        </div>
        <div v-show='teamList[3]' class="item">
          <div class='player-box'>
            <player :data='teamPList[3]'></player>
          </div>
          <div class="bottom-btn hand unselect" @click='unselect(3)'>替换球员</div>
        </div>
        <div v-show='!teamList[3]' class='item' :class='{selecting: waitSelectIndex==3}'>
          <i class="fa fa-question-circle" aria-hidden="true"></i>
          <div class="bottom-btn hand" @click='select(3)'>选择球员</div>
        </div>
        <div v-show='teamList[4]' class="item">
          <div class='player-box'>
            <player :data='teamPList[4]'></player>
          </div>
          <div class="bottom-btn hand unselect" @click='unselect(4)'>替换球员</div>
        </div>
        <div v-show='!teamList[4]' class='item' :class='{selecting: waitSelectIndex==4}'>
          <i class="fa fa-question-circle" aria-hidden="true"></i>
          <div class="bottom-btn hand" @click='select(4)'>选择球员</div>
        </div>
      </div>
      <el-button class='defense-confirm-btn' :disabled="!teamValid" @click='submitTeam'>提交队伍</el-button>
    </div>
    <ul class='player-list'>
      <li v-for='(item,index) in playerList' :key='item.cardId'>
        <player :data='item'></player>
        <div class='btn-list'>
          <el-button v-show='!editTeam&&!teamMap[item.cardId]' class='buy-btn' @click='sale(index)'>卖出</el-button>
          <el-button v-show='editTeam&&(waitSelectIndex!=0||item.position==2&&waitSelectIndex==0)' class='select-btn' @click='choose(index)'>选择</el-button>
          <img v-show='item.speed' src="../assets/img/info.png" class='info-btn hand' @click='showDetail(index)'>
        </div>
      </li>
    </ul>

    <el-dialog
      :visible.sync="firstShow"
      :show-close="false"
      width="40%">
      <div class='dialog-text'>
        <p>您还没有球员哦~</p>
        <p>点击左侧free按钮，免费抽取球员</p>
        <p>然后才能开始游戏哦~</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <p class='confirm-btn hand no-hover' @click="firstShow = false">确 定</p>
      </span>
    </el-dialog>


    <el-dialog
      :visible.sync="detailShow"
      :show-close="false"
      :lock-scroll='false'
      class='detail-dialog'
      width="80%">
      <detail :data='detailPlayer'></detail>
      <span slot="footer" class="dialog-footer">
        <p class='confirm-btn hand no-hover' @click="detailShow = false">确 定</p>
      </span>
    </el-dialog>


    <el-dialog
      :visible.sync="saleShow"
      :show-close="false"
      :lock-scroll='false'
      title='出价'
      width="40%">
      <el-input v-model='price'></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelSale">取 消</el-button>
        <el-button @click="confirmSale">确 定</el-button>
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
      playerList: [],
      teamList: [],
      firstShow: false,
      detailShow: false,
      detailPlayer: {},
      editTeam: false,
      waitSelectIndex: null,
      loading: true,
      saleCardId: null,
      saleShow: false,
      price: '',
      teamMap: {},
    };
  },
  computed: {
    teamValid() {
      return this.teamList.filter(e => !!e).length == 5;
    },
    teamPList() {
      return this.teamList.map(cid => {
        if (!cid) return {};
        return this.getPlayerByCardId(cid);
      });
    }
  },
  methods: {
    cancelSale() {
      this.saleShow = false
      this.price = ''
    },
    async confirmSale() {
      const price = +this.price
      if(isNaN(price)||!price) {
        this.$message.warning('价格输入有误!')
        return
      }
      const args = JSON.stringify([this.saleCardId, price])
      const data = await this.$call(0, 'sale_my_card', args)
      this.saleShow = false
      this.$message({
        showClose: true,
        duration: 0,
        message: '请在区块链交易成功后，刷新页面！'
      });
    },
    sale(index) {
      const cardId = this.playerList[index].cardId;
      if(this.teamMap[cardId]) {
        this.$message.warning('队伍中的球员无法卖出!')
        return
      }
      this.saleCardId = cardId;
      this.saleShow = true;
    },
    async submitTeam() {
      const args = JSON.stringify(this.teamList);
      const data = await this.$call(0, "change_user_team", args);
      this.$message({
        showClose: true,
        duration: 0,
        message: '请在区块链交易成功后，刷新页面！'
      });
    },
    choose(index) {
      const cardId = this.playerList[index].cardId;
      this.unchooseTeam(cardId);
      this.teamList[this.waitSelectIndex] = cardId;
      this.teamList = [...this.teamList];
      this.editTeam = false;
      this.waitSelectIndex = null;
    },
    unchooseTeam(cardId) {
      const list = [];
      this.teamList.forEach(id => {
        if (id == cardId) list.push(null);
        else list.push(id);
      });
      this.teamList = list;
    },
    unselect(index) {
      this.teamList[index] = null;
      this.teamList = [...this.teamList];
    },
    select(index) {
      this.editTeam = true;
      this.waitSelectIndex = index;
    },
    showDetail(index) {
      this.detailPlayer = this.playerList[index];
      this.detailShow = true;
    },
    async handlePList(list) {
      const resList = [];
      for (let i = 0; i < list.length; i++) {
        const cardId = list[i];
        let data = await this.$simulateCall(
          0,
          "get_card_id",
          `[${JSON.stringify(cardId)}]`
        );
        data = JSON.parse(data)
        if(!data) continue
        data = data.split(",");
        let [
          avatorId,
          player_name,
          shoot,
          defend,
          speed,
          shoot_factor,
          defend_factor,
          speed_factor,
          position,
          growth
        ] = data;
        const obj = {
          avatorId,
          player_name,
          shoot,
          defend,
          speed,
          shoot_factor,
          defend_factor,
          speed_factor,
          position,
          growth
        };
        obj.avator = `${this.$preUrl}${avatorId}.jpg`;
        obj.cardId = cardId; // 卡片id
        this.$set(this.playerList,i,obj)
        this.handlePlayerStorage(obj, 'attack') // 缓存球员头像
      }
    },
    handleTeam(list) {
      this.teamList = list;
      // teamMap
      const obj = {}
      for (let i = 0; i < this.teamList.length; i++) {
        const cid = this.teamList[i];
        obj[cid] = true
      }
      this.teamMap = obj
      this.setItem('teamList', this.teamList)
    },
    getPlayerByCardId(cardId) {
      for (let i = 0; i < this.playerList.length; i++) {
        let p = this.playerList[i];
        if (p.cardId == cardId) return p;
      }
      return null;
    },
    loadList(plist) {
      const map = this.getItem('playerMap') || {}
      this.playerList = plist.map(cardId => {
        const data = map[cardId] || {}
        return {
          cardId,
          avatorId: data.avatorId,
          player_name: data.player_name,
        }
      })
    },
  },
  async created() {
    let list = await this.$simulateCall(0, "user_login", "");
    list = JSON.parse(list);
    if (list instanceof Object) {
      this.loading = false;
      this.setItem('userName', list.user_name)
      const plist = list.card_list.split("_").filter(e => !!e)
      const teamlist = list.team ? list.team.split("_").filter(e => !!e) : []
      this.loadList(plist)
      this.handlePList(plist);
      this.handleTeam(teamlist);
    } else {
      this.firstShow = true
      this.loading = false;
    }

  }
};
</script>

<style lang='scss' scoped>
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  .player-list {
    flex-grow: 0;
    width: 100%;
    flex-wrap: wrap;
    display: flex;
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
      .select-btn {
        width: 70%;
        color: #fff;
        background-color: rgb(236, 185, 30);
        border-color: rgb(236, 185, 30);
        border-radius: 60px;
        margin: 0;
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
    width: 100%;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-bottom: 2px solid #fff;
    .line {
      display: flex;
      width: 100%;
      justify-content: center;
      margin-bottom: 20px;
    }
    .line2 {
      width: 100%;
      display: flex;
      align-items: center;
    }
    .item {
      display: flex;
      justify-content: center;
      text-align: center;
      width: 200px;
      min-height: 350px;
      margin-right: 20px;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 10px;
      position: relative;
      overflow: hidden;
      &.selecting {
        i {
          color: rgb(236, 185, 30);
        }
      }
      i {
        color: #fff;
        font-size: 200px;
        margin-top: 55px;
      }
      .bottom-btn {
        position: absolute;
        bottom: 0;
        background-color: rgb(236, 185, 30);
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        &.unselect {
          background-color: #cc0033;
        }
      }
      .player-box {
        width: 200px;
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
      &[disabled] {
        background-color: #aaa;
        border-color: #aaa;
      }
    }
  }
}
.dialog-text {
  p {
    font-size: 20px;
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

