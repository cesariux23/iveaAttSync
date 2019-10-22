<template lang="pug">
  .eventos
    .row
      .col-1
        b  ID
        br
        |  {{ empleado.userid }}
      .col
        b  Adscripción
        br
        |  {{ empleado.adscripcion }}
      .col-2
        b  Horario
        br
        | {{empleado.entrada ? empleado.entrada.substring(0,5) : ''}} - {{empleado.salida ? empleado.salida.substring(0,5) : ''}} hrs.
      .col-2
        b  Tolerancia
        br
        |  {{empleado.tolerancia ? empleado.tolerancia : '15'}} min.
      .col-2.text-right
        b-button(variant="info" :to="{name: 'edicionEmpleado', params: { id: userid}}")
          i.fa.fa-pencil
          |  Editar
    .row
      .col
        hr
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

