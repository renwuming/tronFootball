<template>
  <div class='wrapper' :class="{small: small}">
    <h1 v-if='data.player_name&&data.player_name.length <= 7'>{{data.player_name}}</h1>
    <h1 v-else style='font-size:14px'>{{data.player_name}}</h1>
    <span v-if="market">成长值：<var>{{data.growth}}</var></span>
    <div class="img-box">
      <img :src="data.avator">
    </div>
    <template v-if='!small'>
      <p class="line">
        进攻：<var>{{+data.shoot + +data.shoot_factor * +data.growth}}</var>
      </p >
      <p class="line">
        防守：<var>{{+data.defend + +data.defend_factor * +data.growth}}</var>
      </p >
      <p class="line">
        速度：<var>{{+data.speed + +data.speed_factor * +data.growth}}</var>
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
  computed: {},
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
    text-align: center;
    position: relative;
    margin: 10px 0;
    img {
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
