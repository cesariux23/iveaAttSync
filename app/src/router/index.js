import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import DetalleAsistencia from '@/components/asistencia/DetalleAsistencia'
import ShowEvents from '@/components/asistencia/ShowEvents'
import Registro from '@/components/empleados/Registro'
import Dispositivos from '@/components/dispositivos/ListaDispositivos'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/asistencia/:year/:month',
      name: 'detalleAsistenciaIndex',
      component: DetalleAsistencia,
      children: [
        {
          path: ':id',
          name: 'detalleAsistencia',
          component: ShowEvents
        }
      ]
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

router.beforeEach((to, from, next) => {
  // si ha iniciado sesion, y no esta en el login, se redirecciona
  if (to.name !== 'login' && !store.getters.isLoggedIn) {
    next('/login')
  } else {
    // si ya inicio la sesion, se redirecciona a la asistencia
    if (to.name === 'login' && store.getters.isLoggedIn) {
      next('/asistencia')
    } else {
      next()
    }
  }
})

export default router
