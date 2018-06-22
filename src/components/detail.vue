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
  </div>
</template>

<script>
export default {
  props: {
    value: Array,
  },
  components: {},
  data() {
    return {

    };
  },
  computed: {
    option() {
      const obj = {
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
          }
        },
        radar: {
          radius: "90%",
          center: ["50%", "66%"],
          name: {
            textStyle: {
              color: "#fff",
              fontSize: 16,
              borderRadius: 3,
              padding: [5, 5]
            }
          },
          splitNumber: 4,
          splitArea: {
            areaStyle: {
              color: ["transparent", "transparent", "transparent", "transparent"]
            }
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 1)"
            }
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 1)"
            }
          },
          indicator: [
          ]
        },
        series: [
          {
            type: "radar",
            lineStyle: {
              color: "#dc7448"
            },
            areaStyle: {
              color: "#dc7448"
            },
            data: [
              {
                name: "综合能力"
              },
            ]
          }
        ]
      }
      const colorMap = ["#FF0033","#FFCC33","#0099CC"]
      const nameMap = ['攻击','防守','速度']
      const [attack, defense, speed] = this.value
      obj.series[0].data[0].value = this.value
      obj.radar.indicator = this.value.map((value,index) => {
        return {
          name: `${nameMap[index]} ${value}`,
          max: 200,
          color: colorMap[index],
          // label: {
          //   fontSize: 120,
          // },
          // itemStyle: {
          //   align: "center",
          //   color: "#fff",
          //   fontSize: 22,
          //   textShadowColor: "rgba(0,0,0,.4)",
          //   textShadowOffsetX: 4,
          //   textShadowOffsetY: 4,
          //   textShadowBlur: 2
          // }
        }
      })
      console.log(obj)
      return obj
    }
  },
  methods: {
  },
  mounted() {
    // echarts实例
    const radar = echarts.init(this.$refs.radar);
    radar.setOption(this.option);
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
    font-size: 26px;
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
    // border-left: 2px solid #fff;
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
