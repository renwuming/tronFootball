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

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
