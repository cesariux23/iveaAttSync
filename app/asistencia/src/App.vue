<template lang="pug">
  #app
    b-navbar(toggleable="md" type="dark" variant="info" fixed="top")
      b-nav-toggle(target="nav_collapse")
      b-navbar-brand(href="#/asistencia") Control de asistencia
      b-collapse(is-nav id="nav_collapse")
        b-nav(is-nav-bar)
          li.nav-item
            router-link.nav-link(to="/empleados/registro" active-class="active") Registro de emplado
          li.nav-item
            router-link.nav-link(to="/dispositivos" active-class="active") Dispositivos en línea
    
    .main
      router-view
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
.main {
  padding-top: 3.5em;
}
</style>
