<template>
  <div class='wrapper' :class="{small: small}">
    <h1 v-if='data.player_name&&data.player_name.length <= 7'>{{data.player_name}}</h1>
    <h1 v-else style='font-size:14px'>{{data.player_name || '???'}}</h1>
    <span v-if="market">成长值：<var v-if='data.growth||data.growth==0'>{{data.growth | value}}</var><var v-else>-</var></span>
    <div class="img-box">
      <img v-if='data.avator||data.avatorId' :src="data.avator || avator">
      <i v-else class="fa fa-spinner fa-pulse fa-3x fa-fw" style='margin-top:30px;font-size:36px;'></i>
    </div>
    <template v-if='!small'>
      <p class="line">
        进攻：<var v-if='attack'>{{attack|value}}</var><var v-else>-</var>
      </p >
      <p class="line">
        防守：<var v-if='defend'>{{defend|value}}</var><var v-else>-</var>
      </p >
      <p class="line">
        速度：<var v-if='speed'>{{speed|value}}</var><var v-else>-</var>
      </p >
    </template>
    <template v-else>
      <p>进攻 / 防守 / 速度</p >
      <p>200 / 200 / 200</p >
    </template>
  </div>
</template>
<script>
export default {
  props: {
    market: {
      default: true,
    },
    small: Boolean,
    data: {
      default: _ => {
        return {}
      },
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    avator() {
      return `${this.$preUrl}${this.data.avatorId}.jpg`
    },
    attack() {
      if(this.data.shoot)
        return +this.data.shoot + +this.data.shoot_factor * +this.data.growth
      else return null
    },
    defend() {
      if(this.data.defend)
        return +this.data.defend + +this.data.defend_factor * +this.data.growth
      else return null
    },
    speed() {
      if(this.data.speed)
        return +this.data.speed + +this.data.speed_factor * +this.data.growth
      else return null
    },
  },
  methods: {}
};
</script>

<style lang='scss' scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  h1 {
    color: #282828;
    font-size: 20px;
  }
  .img-box {
    width: 80%;
    padding-bottom: 80%;
    text-align: center;
    position: relative;
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    img,i {
      position: absolute;
      top:0;
      left:0;
      width: 90%;
    }
  }
  span {
    color: #23b8c1;
  }
  p.line {
    width: 80%;
    display: flex;
    justify-content: space-between;
    color: #282828;
    border-bottom: 1px solid #7d7d97;
  }
  var {
    font-weight: bold;
    font-style: normal;
  }
}
.small {
  h1 {
    font-size: 20px;
  }
  .img-box {
    width: 80%;
    max-width: 100px;
    text-align: center;
    position: relative;
    margin: 4px 0;
  }
}
</style>
