import Vue from 'vue'
import VueRouter from 'vue-router';
import market from './page/index'
import home from './page/home'
import attack from './page/attack'
import attackDetail from './page/attackDetail'

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name: 'market',
    component: market,
  },
  {
    path: '/home',
    name: 'home',
    component: home,
  },
  {
    path: '/attack',
    name: 'attack',
    component: attack,
  },
  {
    path: '/attackDetail',
    name: 'attackDetail',
    component: attackDetail,
  },
];

export const router = new VueRouter({
  routes
});


router.beforeEach(async (to, from, next) => {
  Vue.currentRouter = to
  Vue.power = await Vue.prototype.$simulateCall(0, 'get_user_power', '')
  if(isNaN(+Vue.power)) Vue.power = '??'
  const userName = Vue.prototype.getItem('userName')
  if(!userName&&to.name!='home') {
    setTimeout(_ => {
      router.push({name: 'home'})
    }, 500)
  } else {
    next();
  }
});


export default router;
