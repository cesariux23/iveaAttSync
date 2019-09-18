// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Notifications from 'vue-notification'
import 'bootstrap/dist/css/bootstrap.css'
import './styles/main.less'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vueMoment from 'vue-moment'
import axios from 'axios'
import io from 'socket.io-client'
import store from './store'

Vue.use(vueMoment)

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(Notifications)

/** Global config **/
const baseUrl = process.env.BASE_URL
const apiUrl = baseUrl + '/api'
const channel = process.env.CHANNEL
const socketUrl = baseUrl + '/' + channel
console.log(socketUrl)

// Axios config
Vue.prototype.$http = axios.create({
  baseURL: apiUrl
})

/**
 * Socket.io
 */
Vue.prototype.$socket = io(socketUrl)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
