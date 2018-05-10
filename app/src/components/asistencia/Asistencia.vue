<template lang='pug'>
  .events-container.h-100
    .empleado-list-container(:class="{ open: showSideNav }")
      empleado-list( v-on:selectedEmp="updateSelected")
    div
    .eventos.w-100(:class="{ open: showSideNav }")
      b-button.menu(variant="link" @click="toggleSideNav" placeholder='Mostrar menú')
        i.fa.fa-bars.fa-2x
      .container-fluid(v-if="empleado")
        .float-right
          router-link.btn.btn-outline-secondary(:to="{ name: 'edicionEmpleado', params: { id: empleado.userid }}")
              i.fa.fa-pencil
              |  Editar empleado
        h3 Detalle de la asistencia
        hr
        .row
          .col-md-4.col-lg-1
            b Userid
            p {{empleado.userid}}
          .col
            b Nombre
            p {{ empleado.nombre }}
          .col
            b Adscripción
            p {{ empleado.adscripcion }}
          .col-md-3.col-lg-1
            b Entrada
            p  {{ empleado.entrada }}
          .col-md-3.col-lg-1
            b Salida
            p  {{ empleado.salida }}
          .col-md-3.col-lg-1
            b Tolerancia
            p 15 mins.
        hr
        calendar(v-bind:info="info" v-bind:userid="empleado.userid" v-on:anterior="mesAnterior" v-on:siguiente="mesSiguiente")

      .empty-data(v-else)
        .center.well
          p
            i.fa.fa-users.fa-5x
          p Seleccione un empleado de la lista
</template>
<script>
import list from './EmpleadoList'
import calendar from './Calendar'
import moment from 'moment'
export default {
  name: 'Asistencia',
  components: {
    'empleado-list': list,
    calendar
  },
  methods: {
    updateSelected: function (emp) {
      this.empleado = emp
    },
    mesAnterior: function () {
      if (this.info.mesActual === 1) {
        this.info.mesActual = 12
        this.info.anio--
      } else {
        this.info.mesActual--
      }
    },
    mesSiguiente: function () {
      if (this.info.mesActual === 12) {
        this.info.mesActual = 1
        this.info.anio++
      } else {
        this.info.mesActual++
      }
    },
    toggleSideNav: function () {
      this.showSideNav = !this.showSideNav
    }
  },
  data () {
    return {
      empleado: null,
      showSideNav: true,
      info: {
        mesActual: moment().month() + 1,
        anio: moment().year()
      }
    }
  }
}
</script>
<style lang="less" scoped>
@sidebar: 350px;
.menu {
  padding-left: 0px;
}
.events-container {
  display: flex;
  .empleados {
    position: fixed;
    overflow-y: hidden;
  }
  .eventos{
    overflow-y: auto;
    transition: all 0.2s ease-in-out;
    &.open{
      margin-left: @sidebar;
    }
  }
  .detalles {
    margin-left: auto;
  }
  .empleado-list-container {
    flex: 1 0 auto;
    position: absolute;
    width: @sidebar;
    margin-left: -@sidebar;
    transition: all 0.2s ease-in-out;
    &.open{
      margin-left:0;
    }
  }
}
</style>
