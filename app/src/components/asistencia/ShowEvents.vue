<template lang="pug">
  .eventos
    h4.border-bottom.pb-2
      i.fa.fa-user-o
      |  {{ empleado.nombre }}
    .row      
      .col-1
        b  ID:
        |  {{ userid }}
      .col
        b  Adscripción:
        |  {{ empleado.adscripcion }}
      .col.col-lg-2
        b  Entrada:
        |  {{empleado.entrada}}
      .col.col-lg-2
        b Salida:
        |  {{empleado.salida}}
      .col.col-lg-2
        b  Tolerancia:
        |  {{empleado.tolerancia ? empleado.tolerancia : '--'}} min.
      .col.col-lg-1
        b-button(variant="light")
          i.fa.fa-pencil
          |  Editar
    h4.text-uppercase.border-bottom.pb-2
      i.fa.fa-calendar-o
      |  {{months[month - 1]}} {{year}}
    .row
      .col
        calendar(v-bind:selectedDate="{ year: this.year, month: this.month}" v-bind:userid="userid")
    
</template>
<script>
import calendar from './Calendar'
export default {
  name: 'showEvents',
  components: {
    calendar
  },
  data () {
    return {
      empleado: {}
    }
  },
  methods: {
    getEmpleado: function () {
      this.$http.get('/empleados/' + this.userid)
      .then((res) => {
        this.empleado = res.data.data
        this.$forceUpdate()
      })
    }
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
  },
  watch: {
    userid: function (val) {
      this.getEmpleado()
    }
  },
  mounted () {
    this.getEmpleado()
  }
}
</script>

