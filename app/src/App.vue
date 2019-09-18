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
    notifications(group="updated" position="bottom right" classes="custom")
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

<style lang="less">
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
.custom{
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 10px;
  margin: 0 5px 5px;

  color: #ffffff;
  background: #44A4FC;
  border-left: 5px solid #187FE7;

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #E54D42;
    border-left-color: #B82E24;
  }

  &.success {
    background: #68CD86;
    border-left-color: #42A85F;
  }
}
</style>
