<template lang="pug">
  .eventos
    .row      
      .col-1
        b  ID
        br
        |  {{ userid }}
      .col
        b  Adscripción
        br
        |  {{ empleado.adscripcion }}
      .col.col-lg-2
        b  Entrada
        br
        |  {{empleado.entrada ? empleado.entrada.substring(0,5) : ''}}
      .col.col-lg-2
        b Salida
        br
        |  {{empleado.salida ? empleado.salida.substring(0,5) : ''}}
      .col.col-lg-2
        b  Tolerancia
        br
        |  {{empleado.tolerancia ? empleado.tolerancia : '--'}} min.
      .col.col-lg-1
        b-button(variant="info" :to="{name: 'edicionEmpleado', params: { id: userid}}")
          i.fa.fa-pencil
          |  Editar
    .row
      .col
        calendar(v-bind:selectedDate="{ year: this.year, month: this.month}" v-bind:userid="userid")
    
</template>
<script>
import calendar from './Calendar'
export default {
  name: 'showEvents',
  props: ['empleado'],
  components: {
    calendar
  },
  computed: {
    year () {
      return this.$route.params.year
    },
    month () {
      return this.$route.params.month
    },
    months () {
      return this.$store.getters.months
    },
    userid () {
      return this.$route.params.id
    }
  }
}
</script>

