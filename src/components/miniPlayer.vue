<template>
  <div class='wrapper'>
    <h1 v-if='data.player_name.length <= 7'>{{data.player_name}}</h1>
    <h1 v-else style='font-size:14px'>{{data.player_name}}</h1>
    <div class="detail">
      <div class="img-box">
        <img :src="data.avator">
      </div>
      <div class='value-box'>
        <p>进攻 {{+data.shoot + +data.shoot_factor * +data.growth}}</p>
        <p>防守 {{+data.defend + +data.defend_factor * +data.growth}}</p>
        <p>速度 {{+data.speed + +data.speed_factor * +data.growth}}</p>
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
    img {
      width: 90%;
    }
  }
  p {
    color: #fff;
    font-size: 14px;
  }
}
</style>
