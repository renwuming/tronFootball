import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import router from "./router"
import http from "./api"
import filter from './filter'
import myPublic from './assets/js/common.js'


Vue.use(ElementUI)
Vue.use(myPublic)
Vue.use(filter)

Vue.prototype.$preUrl = 'https://sec-cdn.static.xiaomi.net/secStatic/groups/miui-sec/rentianfu/football/player_img/'

const NebPay = _require('nebpay')
Vue.prototype.$NebPay = new NebPay()
const addr = 'n1nxECbBxHYMcBocPMv8SvVEUmPo1fKBrKH';
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

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
