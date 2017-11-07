<template lang='pug'>
  .left
    .card#empladosList  
      .card-header
        router-link.fav(to="/empleados/registro" title='Registrar')
            i.fa.fa-plus
        H4 Empleados
          
        .form-group
          .input-group
            span.input-group-addon 
              i.fa.fa-search
            b-form-input(v-model="search"
              type="text"
              placeholder="Nombre, userid o adscripción")
      .card-body
        b-list-group
          b-list-group-item(v-for="emp in filteredEmpleados" :key="emp.userid" v-on:click="selectEmpleado(emp)")
            span.userid {{ emp.userid }}
            span
              span {{emp.nombre}}
              br
              span.ads.text-secondary.elipsis {{emp.adscripcion}}
        div(v-if="filteredEmpleados.length === 0") Sin resultados
</template>
<script>
  import HTTP from '../../http'
  export default {
    name: 'empleado-list',
    data () {
      return {
        search: '',
        msg: 'Empleados',
        empleados: []
      }
    },
    computed: {
      filteredEmpleados: function () {
        var self = this
        return self.empleados.filter(function (user) {
          return user.nombre.toLowerCase().indexOf(self.search.toLowerCase()) !== -1 ||
          user.adscripcion.toLowerCase().indexOf(self.search.toLowerCase()) !== -1 ||
           user.userid === parseInt(self.search)
        })
      }
    },
    methods: {
      selectEmpleado: function (emp) {
        this.$emit('selectedEmp', emp)
      }
    },
    created () {
      console.log('Created')
      HTTP.get('/empleados')
      .then((res) => {
        console.log(res)
        this.empleados = res.data.data
      })
    }
  }
</script>