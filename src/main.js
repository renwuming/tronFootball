import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import router from "./router"
import filter from './filter'
import myPublic from './assets/js/common.js'
import TronWeb from 'tronweb'
import contract from './Football.json'

Vue.use(ElementUI)
Vue.use(myPublic)
Vue.use(filter)

Vue.prototype.$preUrl = 'https://sec-cdn.static.xiaomi.net/secStatic/groups/miui-sec/rentianfu/football/player_img/'


import config from './config'
import getPlayer from './data'

Vue.prototype.$getPlayer = getPlayer

async function getContract(contract, addr) {
  let T = {}
  // 1. check variable, 检查tronweb是否已经加载
  if (window.tronWeb) {
    // 2. check node connection，检查所需要的API是否都可以连通
    const nodes = await tronWeb.isConnected();
    const connected = !Object.entries(nodes).map(([name, connected]) => {
      if (!connected) {
        console.error(`Error: ${name} is not connected`);
      }
      return connected;
    }).includes(false);
    if (connected) {
      T = await tronWeb.contract(contract.abi, addr)
      return T
    } else {
      console.error('wait for tronLink');
      await sleep(100)
      T = await getContract(contract, addr)
      return T
    }
  } else {
    // 如果检测到没有注入tronWeb对象，则等待100ms后重新检测
    console.error('wait for tronLink');
    await sleep(100)
    T = await getContract(contract, addr)
    return T
  }
};

function sleep(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}

const addr = '41de2c98fe6a72c0b04ef4712d87fa27eb01513581';

// 合约地址
Vue.prototype.$addr = addr

Vue.prototype.$football = async function () {
  let T = await getContract(contract, addr)
  return T
}


Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    power: '??',
    userName: '???',
    commonPrice: null,
    vipPrice: null,
    powerPrice: null,
    currentRouter: null,
    freeFlag: false,
    address: null,
    teamList: [],
  },
  mutations: {
    update(state, payload) {
      if (payload.power || payload.power == 0) state.power = payload.power
      if (payload.userName) state.userName = payload.userName
      if (payload.commonPrice) state.commonPrice = payload.commonPrice
      if (payload.vipPrice) state.vipPrice = payload.vipPrice
      if (payload.powerPrice) state.powerPrice = payload.powerPrice
      if (payload.currentRouter) state.currentRouter = payload.currentRouter
      if (payload.freeFlag) state.freeFlag = payload.freeFlag
      if (payload.address) state.address = payload.address
      if (payload.teamList) state.teamList = payload.teamList
    },
  }
})

router.beforeEach(async (to, from, next) => {
  store.commit({
    type: 'update',
    currentRouter: to.name
  })
  init()
  next();
});

async function init() {
  let fb = await Vue.prototype.$football()
  console.log(fb)
  const self = Vue.prototype

  let user_detail = await (await Vue.prototype.$football()).user_login().call()
  console.log('user_detail: ' + user_detail)

  let last_time = user_detail[2].toNumber()
  if (!last_time) {
    await (await Vue.prototype.$football()).user_register().send()
    user_detail = await (await Vue.prototype.$football()).user_login().call()
  }
  let user_address = user_detail[0].toString()
  let team_detail = await (await Vue.prototype.$football()).get_user_team(user_address).call()
  let teamList = []
  for (let i = 0; i < team_detail.length; i++) {
    teamList.push(team_detail[i].toString())
  }


  store.commit({
    type: 'update',
    teamList,
  })

  store.commit({
    type: 'update',
    power: user_detail[3].toNumber(),
  })
  store.commit({
    type: 'update',
    address: user_address,
  })

  const { address } = store.state
  const commonPrice = self.getItem('commonPrice'),
    vipPrice = self.getItem('vipPrice'),
    powerPrice = self.getItem('powerPrice')
  if (!address) {
    store.commit({
      type: 'update',
      address: user_address,
      commonPrice: commonPrice,
    })
  }
  if (!commonPrice) {
    //获取普通卡片价格
    let data = (await (await self.$football()).get_common_card_price().call()).toString()
    self.setItem('commonPrice', data)
    store.commit({
      type: 'update',
      commonPrice: data,
    })
  } else {
    store.commit({
      type: 'update',
      commonPrice,
    })
  }
  //获取vip卡价格
  if (!vipPrice) {
    let data = (await (await self.$football()).get_vip_card_price().call()).toString()
    self.setItem('vipPrice', data)
    store.commit({
      type: 'update',
      vipPrice: data,
    })
  } else {
    store.commit({
      type: 'update',
      vipPrice,
    })
  }
  //获取体力价格
  if (!powerPrice) {
    let data = (await (await self.$football()).get_power_price().call()).toString()
    self.setItem('powerPrice', data)
    store.commit({
      type: 'update',
      powerPrice: data,
    })
  } else {
    store.commit({
      type: 'update',
      powerPrice,
    })
  }

}


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
