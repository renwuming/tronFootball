<template>
  <div class='wrapper'>
    <h1>贝克汉姆</h1>
    <div class='main'>
      <div class="img-box">
        <img src="http://www.renwuming.cn/static/car-game/portrait.jpg">
      </div>
      <div class="radar-box">
        <div class='chart' ref='radar'></div>
      </div>
    </div>
    <p class='grow-value'>
      成长值：
      <br>
      <var>66</var>
    </p>
    
    <!-- <p class="line">
      进攻：<var>200</var>
    </p>
    <p class="line">
      防守：<var>200</var>
    </p>
    <p class="line">
      速度：<var>200</var>
    </p> -->
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
  methods: {},
  mounted() {
    const option = {
      title: {
        text: "球员综合能力",
        textStyle: {
          align: "center",
          color: "#fff",
          fontSize: 22,
          textShadowColor: "rgba(0,0,0,.4)",
          textShadowOffsetX: 4,
          textShadowOffsetY: 4,
          textShadowBlur: 2
          // padding: [5,5]
        }
      },
      legend: {
        data: [{ name: "攻击" }]
      },
      radar: {
        name: {
          textStyle: {
            color: "#fff",
            fontSize: 16,
            borderRadius: 3,
            padding: [5, 5]
          }
        },
        splitArea: {
          areaStyle: {
            color: ["#fff", "#B8D3E4", "#96C5E3", "#7DB5DA", "#72ACD1"]
          }
        },
        indicator: [
          { name: "攻击", max: 200, color: "#CC0033" },
          { name: "防守", max: 200, color: "#FFCC33" },
          { name: "速度", max: 200, color: "#009966" }
        ]
      },
      series: [
        {
          type: "radar",
          data: [
            {
              value: [120, 150, 180],
              name: "贝克汉姆"
            }
          ]
        }
      ]
    };
    // 基于准备好的dom，初始化echarts实例
    const radar = echarts.init(this.$refs.radar);
    radar.setOption(option);
  }
};
</script>

<style lang='scss' scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  color: #fff;
  h1 {
    width: 100%;
    text-align: left;
    text-shadow: 4px 4px 2px rgba(0, 0, 0, 0.4);
  }
  .main {
    display: flex;
    width: 90%;
    margin: 20px 0;
  }
  .img-box {
    width: 50%;
    text-align: center;
    position: relative;
    img {
      width: 300px;
    }
  }
  .radar-box {
    border-left: 2px solid #fff;
    display: flex;
    justify-content: center;
    width: 50%;
    .chart {
      width: 80%;
      height: 100%;
    }
  }
  p.grow-value {
    width: 100%;
    text-align: left;
    font-size: 20px;
    text-shadow: 4px 4px 2px rgba(0, 0, 0, 0.4);
    var {
      font-size: 24px;
      text-shadow: 4px 4px 2px rgba(0, 0, 0, 0.4);
      font-size: 24px;
      color: #fefd31;
    }
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
</style>
