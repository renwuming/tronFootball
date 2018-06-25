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


export default router;
