// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import './styles/main.less'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vueMoment from 'vue-moment'
import axios from 'axios'
import io from 'socket.io-client'

Vue.use(vueMoment)

Vue.config.productionTip = false

Vue.use(BootstrapVue)

/** Global config **/
const $baseUrl = 'http://192.168.30.248:3000'
const $apiUrl = $baseUrl + '/api'
const $channel = '/czs'
const $socketUrl = $baseUrl + $channel

// Axios config
Vue.prototype.$http = axios.create({
  baseURL: $apiUrl
})

/**
 * Socket.io
 */
Vue.prototype.$socket = io($socketUrl)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
