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

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider('https://api.shasta.trongrid.io'); // Full node http endpoint
const solidityNode = new HttpProvider('https://api.shasta.trongrid.io'); // Solidity node http endpoint
const eventServer = new HttpProvider('https://api.shasta.trongrid.io'); // Contract events http endpoint

const privateKey = '9bc56c04b19d2f6cdc9d8ec9e0552ad9ded7a574daae89aa7512140be7133059';

Vue.prototype.$tronWeb = new TronWeb(
  fullNode,
  solidityNode,
  eventServer,
  privateKey
)

const addr = '41e6714c55c17acfea9f24d0240eb5a287587f17f1';

// 合约地址
Vue.prototype.$addr = addr

// 合约实例
Vue.prototype.$football = async function(){
  return await Vue.prototype.$tronWeb.contract(contract.abi,Vue.prototype.$addr)
}
//
// Vue.prototype.$call = function(value, callFunction, callArgs) {
//   return new Promise(resolve => {
//     Vue.prototype.$NebPay.call(addr, value, callFunction, callArgs, {
//       listener: resp => {
//         resolve(resp.result)
//       },
//     });
//   })
// }

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
      if(payload.power||payload.power==0) state.power = payload.power
      if(payload.userName) state.userName = payload.userName
      if(payload.commonPrice) state.commonPrice = payload.commonPrice
      if(payload.vipPrice) state.vipPrice = payload.vipPrice
      if(payload.powerPrice) state.powerPrice = payload.powerPrice
      if(payload.currentRouter) state.currentRouter = payload.currentRouter
      if(payload.freeFlag) state.freeFlag = payload.freeFlag
      if(payload.address) state.address = payload.address
      if(payload.teamList) state.teamList = payload.teamList
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
  const self = Vue.prototype

  // Vue.prototype.$simulateCall(0, "user_login", "").then(data => {
  //   data = JSON.parse(data);
  //   if (data instanceof Object) {
  //     const teamList = data.team ? data.team.split("_").filter(e => !!e) : []
  //     store.commit({
  //       type: 'update',
  //       userName: data.user_name,
  //       freeFlag: data.user_free != '1',
  //       teamList,
  //     })
  //   } else {
  //     store.commit({
  //       type: 'update',
  //       freeFlag: true,
  //     })
  //   }
  // })

  let user_detail = await Vue.prototype.$football().user_login().call()


  let last_time = user_detail[2].toNumber()
  if (!last_time) {
    await Vue.prototype.$football().user_register().send()
    user_detail = await Vue.prototype.$football().user_login().call()
  }
  let user_address = user_detail[0].toString()
  let team_detail = await Vue.prototype.$football().get_user_team(user_address).call()
  let teamList = []
  for (let i = 0;i<team_detail.length;i++){
    teamList.push(team_detail[i].toString())
  }


  store.commit({
    type: 'update',
    teamList,
  })


  // Vue.prototype.$simulateCall(0, "get_user_power", "").then(power => {
  //   power = +power
  //   if(isNaN(power)) power = '??'
  //   store.commit({
  //     type: 'update',
  //     power,
  //   })
  // })

  const { address } = store.state
  const commonPrice = self.getItem('commonPrice'),
        vipPrice = self.getItem('vipPrice'),
        powerPrice = self.getItem('powerPrice')
  // if(!address) self.$simulateCall(0, "get_address", "").then(data => {
  //   data = JSON.parse(data)
  //   store.commit({
  //     type: 'update',
  //     address: data,
  //   })
  // })
  if (!address) {
    store.commit({
      type: 'update',
      address: user_address,
      commonPrice: commonPrice,

    })
  }
  if(!commonPrice) {
    //获取普通卡片价格
    let data = (await self.$football().get_common_card_price().call()).toString()
    self.setItem('commonPrice',data)
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
  if(!vipPrice) {
    let data = (await self.$football().get_vip_card_price().call()).toString()
    self.setItem('vipPrice',data)
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
  if(!powerPrice) {
    let data = (await self.$football().get_power_price().call()).toString()
    self.setItem('powerPrice',data)
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
