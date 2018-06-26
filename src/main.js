import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import router from "./router"
import filter from './filter'
import myPublic from './assets/js/common.js'


Vue.use(ElementUI)
Vue.use(myPublic)
Vue.use(filter)

Vue.prototype.$preUrl = 'https://sec-cdn.static.xiaomi.net/secStatic/groups/miui-sec/rentianfu/football/player_img/'

const NebPay = _require('nebpay')
Vue.prototype.$NebPay = new NebPay()


const addr = 'n1oQBuAkvnAuLxCEefGtewbuARbrS6KzL5f';

Vue.prototype.$addr = addr

Vue.prototype.$simulateCall = function(value, callFunction, callArgs) {
  return new Promise(resolve => {
    Vue.prototype.$NebPay.simulateCall(addr, value, callFunction, callArgs, {
      listener: resp => {
        resolve(resp.result)
      },
    });
  })
}

Vue.prototype.$call = function(value, callFunction, callArgs) {
  return new Promise(resolve => {
    Vue.prototype.$NebPay.call(addr, value, callFunction, callArgs, {
      listener: resp => {
        resolve(resp.result)
      },
    });
  })
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
  Vue.prototype.$simulateCall(0, "user_login", "").then(data => {
    data = JSON.parse(data);
    if (data instanceof Object) {
      const teamList = data.team ? data.team.split("_").filter(e => !!e) : []
      console.log(teamList,'>>>>>>>>>')
      store.commit({
        type: 'update',
        userName: data.user_name,
        freeFlag: data.user_free != '1',
        teamList,
      })
    } else {
      store.commit({
        type: 'update',
        freeFlag: true,
      })
    }
  })
  Vue.prototype.$simulateCall(0, "get_user_power", "").then(power => {
    power = +power
    if(isNaN(power)) power = '??'
    store.commit({
      type: 'update',
      power,
    })
  })

  const { address } = store.state
  const commonPrice = self.getItem('commonPrice'),
        vipPrice = self.getItem('vipPrice'),
        powerPrice = self.getItem('powerPrice')
  if(!address) self.$simulateCall(0, "get_address", "").then(data => {
    data = JSON.parse(data)
    store.commit({
      type: 'update',
      address: data,
    })
  })
  if(!commonPrice) {
    self.$simulateCall(0,"get_common_card_price","").then(data => {
    self.setItem('commonPrice',data)
    store.commit({
      type: 'update',
      commonPrice: data,
    })
  }) } else {
    store.commit({
      type: 'update',
      commonPrice,
    })
  }
  if(!vipPrice) { self.$simulateCall(0,"get_vip_card_price","").then(data => {
    self.setItem('vipPrice',data)
    store.commit({
      type: 'update',
      vipPrice: data,
    })
  }) } else {
    store.commit({
      type: 'update',
      vipPrice,
    })
  }
  if(!powerPrice) { self.$simulateCall(0,"get_power_price","").then(data => {
    self.setItem('powerPrice',data)
    store.commit({
      type: 'update',
      powerPrice: data,
    })
  }) } else {
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
