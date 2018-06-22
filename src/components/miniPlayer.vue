<template>
  <div class='wrapper'>
    <h1>贝克汉姆</h1>
    <div class="detail">
      <div class="img-box">
        <img src="http://www.renwuming.cn/static/car-game/portrait.jpg">
      </div>
      <div class='value-box'>
        <p>进攻 200</p>
        <p>防守 200</p>
        <p>速度 200</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
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
