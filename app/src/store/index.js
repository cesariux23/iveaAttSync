import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'
const ATTSTATUS = {
  'PUNTUALIDAD': {
    name: 'PUNTUALIDAD',
    abb: 'P',
    icon: 'check',
    color: 'success'
  },
  'ASISTENCIA': {
    name: 'ASISTENCIA',
    abb: 'A',
    icon: 'check'
  },
  'COMISIÓN': {
    name: 'COMISIÓN LABORAL',
    abb: 'CL',
    icon: 'external-link',
    color: 'secondary'
  },
  'LICENCIA MEDICA': {
    name: 'LICENCIA MEDICA',
    abb: 'LM',
    icon: 'plus-square-o',
    color: 'primary'
  },
  'PERIODO VACACIONAL': {
    name: 'PERIODO VACACIONAL',
    abb: 'PV',
    icon: 'user-o',
    color: 'secondary'
  },
  'VACACIONES EXTRAORDINARIAS': {
    name: 'VACACIONES EXTRAORDINARIAS',
    abb: 'VE',
    icon: 'user-o',
    color: 'secondary'
  },
  'NO LABORAL': {
    name: 'NO LABORAL',
    abb: 'NL',
    icon: 'calendar-minus-o',
    color: 'info'
  },
  'RETARDO RECUPERABLE': {
    name: 'RETARDO RECUPERABLE',
    abb: 'RR',
    icon: 'clock-o'
  },
  'RETARDO MAYOR': {
    name: 'RETARDO MAYOR',
    abb: 'RM',
    icon: 'clock-o',
    color: 'warning'
  },
  'OMISIÓN DE SALIDA': {
    name: 'OMISIÓN DE SALIDA',
    abb: 'OS',
    icon: 'sign-out',
    color: 'warning'
  },
  'OMISIÓN DE ENTRADA': {
    name: 'OMISIÓN DE ENTRADA',
    abb: 'OE',
    icon: 'sign-in',
    color: 'warning'
  },
  'INASISTENCIA': {
    name: 'INASISTENCIA',
    abb: 'I',
    icon: 'times',
    color: 'danger'
  },
  'ECONOMICO': {
    name: 'PERMISO ECONOMICO',
    abb: '-',
    icon: 'circle-thin',
    color: 'secondary'
  },
  'PENDIENTE': {
    name: 'PENDIENTE',
    abb: '-',
    icon: 'circle-thin',
    color: 'secondary'
  }
}

const currentDate = {
  year: moment().year(),
  month: moment().month() + 1
}

const months = moment.months()

const state = {
  isLoggedIn: !!localStorage.getItem('token'),
  currentDate,
  months,
  attStatus: ATTSTATUS
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
  },
  currentDate: state => {
    return state.currentDate
  },
  months: state => {
    return state.months
  },
  attStatus: state => {
    return state.attStatus
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
