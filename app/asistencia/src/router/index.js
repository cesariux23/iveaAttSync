import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Asistencia from '@/components/asistencia/Asistencia'
import Registro from '@/components/empleados/Registro'
import Dispositivos from '@/components/dispositivos/ListaDispositivos'

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
      name: 'asistenciaGeneral',
      component: Asistencia
    },
    {
      path: '/empleados/registro',
      name: 'registroEmpleado',
      component: Registro
    },
    {
      path: '/empleado/:id',
      name: 'edicionEmpleado',
      component: Registro,
      props: true
    },
    {
      path: '/dispositivos',
      name: 'enLinea',
      component: Dispositivos,
      props: true
    }
  ]
})
