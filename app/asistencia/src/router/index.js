import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Asistencia from '@/components/asistencia/Asistencia'
import Registro from '@/components/empleados/Registro'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/asistencia',
      name: 'Asitencia',
      component: Asistencia
    },
    {
      path: '/empleados/registro',
      name: 'Registro',
      component: Registro
    }
  ]
})
