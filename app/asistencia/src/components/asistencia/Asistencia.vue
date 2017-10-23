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
            p  {{ empleado.entrada }}
          div
            b Salida
            p  {{ empleado.salida }}
          div
            b Tolerancia
            p 15 mins.
          div
            router-link.btn.btn-outline-info(:to="{ name: 'edicionEmpleado', params: { id: empleado.userid }}" title='Registrar')
              i.fa.fa-pencil
        calendar(v-bind:info="info" v-bind:userid="empleado.userid" v-on:anterior="mesAnterior" v-on:siguiente="mesSiguiente")
      .center.well.empty-data(v-else)
        div
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
      }
    },
    data () {
      return {
        msg: ':p',
        empleado: null,
        info: {
          mesActual: moment().month() + 1,
          anio: 2017
        }
      }
    }
  }
</script>