<template lang='pug'>
  .card
    .card-header
      h4 Empleados
      .form-group
        .input-group
          b-form-input(v-model="search"
          type="text"
          placeholder="Buscar ...")
          span.input-group-addon(v-if="search")
            i.fa.fa-times
    .card-body
      .empleados-list
        div(v-if="search")
          .alert.alert-warning(v-if="filteredEmpleados.length === 0") Sin resultados.
          .alert.alert-info(v-else) Mostrando {{filteredEmpleados.length}} resultado(s).
        b-list-group
          b-list-group-item(v-for="emp in filteredEmpleados" :key="emp.userid" v-on:click="selectEmpleado(emp)" href="#")
            h5
              b {{ emp.userid }}
            p {{emp.nombre}}
            p.text-secondary {{emp.adscripcion}}
    .card-footer
      .row
        .col-md-6.text-left
          button.btn.btn-light(title= "Empleado anterior")
            i.fa.fa-chevron-left
        .col-md-6.text-right
          button.btn.btn-light(title= "Siguente empleado")
            i.fa.fa-chevron-right
  </template>
<script>
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
      this.$http.get('/empleados')
      .then((res) => {
        console.log(res)
        this.empleados = res.data.data
      })
    }
  }
</script>
<style lang="less" scoped>
  div{
    border-radius: 0;
  }
  .card {
    display: flex;
    flex-direction: column;
    >.card-header {
      max-height: 115px;
    }
    >.card-body{
      height: calc(~"100vh - 237px");
      overflow: auto;
      padding: 0;

      .list-group-item{
        
        line-height: 18px;
        padding: 10px;
        p{
          margin: 0;
        }
      }
    }
  }
</style>
