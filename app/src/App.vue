<template lang="pug">
  #app.h-100
    b-navbar(toggleable="md" type="dark" variant="info" fixed="top" v-if="isLoggedIn")
      b-nav-toggle(target="nav_collapse")
      b-navbar-brand(href="#/asistencia") Control de asistencia
      b-collapse(is-nav id="nav_collapse")
        b-navbar-nav
          li.nav-item
            router-link.nav-link(:to="{ name: 'detalleAsistenciaIndex', params: Object.assign({},currentDate) }" active-class="active") Detalle de asistencia
          li.nav-item
            router-link.nav-link(to="/empleados/registro" active-class="active") Registro de emplado
          li.nav-item
            router-link.nav-link(to="/dispositivos" active-class="active") Dispositivos en línea
        b-navbar-nav.ml-auto
          b-nav-item(@click='logout')
            i.fa.fa-power-off
            |  Cerrar sesión

    .main.h-100(:class="{'space-navbar' : isLoggedIn}")
      router-view
</template>

<script>
export default {
  name: 'app',
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    currentDate () {
      return this.$store.getters.currentDate
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.main {
  min-height: 100%;
}
.space-navbar {
  padding-top: 3.5em;
}
html{
  height: 100%;
}
body{
  height: 100%;
}
</style>
