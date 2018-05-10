import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'

const state = {
  isLoggedIn: !!localStorage.getItem('token')
}

const mutations = {
  [LOGIN] (state) {
    state.pending = true
  },
  [LOGIN_SUCCESS] (state) {
    state.isLoggedIn = true
    state.pending = false
  },
  [LOGOUT] (state) {
    state.isLoggedIn = false
  }
}

// datos FAKE
const fake = {
  username: 'admin',
  password: 'Ive@2018'
}

const actions = {
  login ({ commit }, creds) {
    commit(LOGIN) // show spinner
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // se valida el fake user
        console.log(creds)
        console.log(fake)
        if (creds.username === fake.username && creds.password === fake.password) {
          localStorage.setItem('token', 'JWT')
          commit(LOGIN_SUCCESS)
          resolve()
        } else {
          reject(new Error('Credenciales no validas'))
        }
      }, 1000)
    })
  },
  logout ({ commit }) {
    localStorage.removeItem('token')
    commit(LOGOUT)
  }
}

const getters = {
  isLoggedIn: state => {
    return state.isLoggedIn
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
