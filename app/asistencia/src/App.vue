<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info" fixed="top">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <b-navbar-brand href="#/asistencia">Control de asistencia</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-nav is-nav-bar>
          <b-nav-item href="#/empleados/registro">Registro de emplado</b-nav-item>
          <b-nav-item href="#/dispositivos">Dispositivos en línea</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-nav>
      </b-collapse>
    </b-navbar>
    <div class="container-fluid main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
.main {
  margin-top: 3.5em;
}
</style>
