<template>
  <div class='wrapper'>
    <h1><span class='title'>{{data.player_name}}</span><span v-if='data.position==2' class='tag'>{{data.position | position}}</span></h1>
    <div class='main'>
      <div class="img-box">
        <img :src="data.avator">
      </div>
      <div class="radar-box">
        <div class='chart' ref='radar'></div>
      </div>
    </div>
    <p class='grow-value'>
      成长值：
      <br>
      <var>{{data.growth}}</var>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      default: _ => {
        return {}
      },
    },
  },
  components: {},
  data() {
    return {

    };
  },
  computed: {
    realShoot() {
      let data = this.data
      return +data.shoot + +data.shoot_factor * +data.growth
    },
    realDefend() {
      let data = this.data
      return +data.defend + +data.defend_factor * +data.growth
    },
    realSpeed() {
      let data = this.data
      return +data.speed + +data.speed_factor * +data.growth
    },
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
          radius: "70%",
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
      const nameMap = ['进攻','防守','速度']
      const vlist = [this.realShoot,this.realDefend,this.realSpeed]
      const max = this.getMax(vlist)
      obj.series[0].data[0].value = vlist
      obj.radar.indicator = vlist.map((value,index) => {
        value = parseFloat(value).toFixed(2)
        return {
          name: `${nameMap[index]}${value}`,
          max,
          color: colorMap[index],
        }
      })
      return obj
    }
  },
  methods: {
    getMax(list) {
      const max = Math.max.apply(null, list)
      return Math.ceil(max/100)*100
    }
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
    .title {
      text-shadow: 4px 4px 2px rgba(0, 0, 0, 0.4);
    }
    .tag {
      background-color: rgb(255, 204, 51);
      font-size: 18px;
      margin-left: 14px;
      padding: 4px;
      border-radius: 6px;
    }
  }
  .main {
    display: flex;
    width: 90%;
    height: 240px;
    margin: 20px 0;
  }
  .img-box {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    img {
      width: 140px;
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
