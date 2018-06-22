import Vue from 'vue'
import VueRouter from 'vue-router';
import market from './page/index'
import home from './page/home'
import attack from './page/attack'

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
];

export const router = new VueRouter({
  routes
});


// 全局钩子校验token
import {validateToken} from './api'

router.beforeEach((to, from, next) => {
  Vue.currentRouter = to
  // if(to.name == 'login') {
  //   next();
  //   return
  // }
  // validateToken().then(res => {
  //   if(res.user) {
  //     Vue.userInfo = res.user
      next();
  //   } else {
  //     router.push({name: 'login', query: {target: to.path}})
  //   }
  // })
});

export default router;
