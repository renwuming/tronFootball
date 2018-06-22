import Vue from 'vue'
import {router} from '../router'
import axios from 'axios'
import config from '../config'

const baseURL = config.URL()

const http = axios.create({
  baseURL,
});
// axios.defaults.withCredentials = true;
// response拦截器
// http.interceptors.response.use(res => {
//   if (res.data.code == -10) {
//     router.push({name: 'login', query: {target: Vue.currentRouter.path}})
//     return res
//   } else {
//     return res
//   }
// })

export const cancelTicket = body => {
  return http.post(`/ticket/cancel`, body).then(res => res.data)
}

export const getUserList = params => {
  return http.get(`/user/list`, { params: params }).then(res => res.data)
}


