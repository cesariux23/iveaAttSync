<template lang='pug'>
  section.main
    empleado-list( v-on:selectedEmp="updateSelected")
    .eventos
      div(v-if="empleado")
        .empleado
          div
            b Userid
            p {{empleado.userid}}
            
          div
            b Nombre
            p {{ empleado.nombre }}
          div
            b Adscripción
            p {{ empleado.adscripcion }}
          div
            b Entrada
            p 8:00
          div
            b Salida
            p 15:00
          div
            b Tolerancia
            p 15 mins.
        calendar(v-bind:info="info" v-bind:userid="empleado.userid" v-on:anterior="mesAnterior" v-on:siguiente="mesSiguiente")
      .center.well(v-else) Seleccione un empleado

</template>
<script>
  import list from './EmpleadoList'
  import calendar from './Calendar'
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
      }
    },
    data () {
      return {
        msg: ':p',
        empleado: null,
        info: {
          mesActual: 9,
          anio: 2017
        }
      }
    }
  }
</script>