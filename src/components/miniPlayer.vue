<template>
  <div class='wrapper'>
    <h1 v-if='data.player_name&&data.player_name.length <= 7'>{{data.player_name}}</h1>
    <h1 v-else style='font-size:14px'>{{data.player_name || '???'}}</h1>
    <div class="detail">
      <div class="img-box">
        <img v-if='data.avator||data.avatorId' :src="data.avator || avator">
        <i v-else class="fa fa-spinner fa-pulse fa-3x fa-fw" style='margin-top:30px;font-size:36px;'></i>
      </div>
      <div class='value-box'>
        <p>进攻 <var v-if='attack'>{{attack|value}}</var><var v-else>-</var></p>
        <p>防守 <var v-if='defend'>{{defend|value}}</var><var v-else>-</var></p>
        <p>速度 <var v-if='speed'>{{speed|value}}</var><var v-else>-</var></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data : Object,
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
  padding: 6px;
  box-sizing: border-box;
  .detail {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    .value-box {
      margin-left: 10px;
      width: 70px;
    }
  }
  h1 {
    font-size: 18px;
    color: #fff;
  }

  .img-box {
    width: 100px;
    text-align: center;
    position: relative;
    padding-bottom: 100px;
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
  p {
    color: #fff;
    font-size: 14px;
  }
  var {
    font-style: normal
  }
}
</style>
