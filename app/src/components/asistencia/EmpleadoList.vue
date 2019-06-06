<template lang='pug'>
  .border-right
    nav.navbar.navbar-light.bg-light
        .input-group
          b-form-input(v-model="search"
          type="text"
          placeholder="Buscar ...")
          .input-group-append(v-if="search")
            b-button(variant="outline-danger" @click="search = ''")
              i.fa.fa-times
    .card.border-right-0
      .card-body.border-0
        div(v-if="search")
          .alert.alert-warning.border-0(v-if="filteredEmpleados.length === 0") Sin resultados.
          .alert.alert-info.border-0(v-else) Mostrando {{filteredEmpleados.length}} resultado(s)
        .empleados-list
          b-list-group.border-0
            b-list-group-item.container.border-right-0( v-for="emp in filteredEmpleados" :key="emp.userid" :to="{ name: 'detalleAsistencia', params: Object.assign({ id: emp.userid }) }" replace)
              .row
                .col-2.px-0
                  h6.text-center
                    b {{ emp.userid }}
                .col
                  p {{emp.nombre}}
                  p.text.small {{emp.adscripcion}}
    nav.navbar.navbar-light.bg-light.position-fixed-bottom
      button.btn.btn-light(title= "Empleado anterior")
        i.fa.fa-chevron-left
      button.btn.btn-light(title= "Mostrar deshabilitados")
        i.fa.fa-user
      button.btn.btn-light(title= "Siguente empleado")
        i.fa.fa-chevron-right
      
  </template>
<script>
  export default {
    name: 'empleado-list',
    props: ['selectedDate'],
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
    watch: {
      $route: function (val) {
        this.$forceUpdate()
      }
    },
    created () {
      this.$http.get('/empleados')
      .then((res) => {
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
    >.card-body{
      height: calc(~"100vh - 166px");
      overflow-y: auto;
      overflow-x: hidden;
      padding: 0;
      .alert{
        margin: 0;
      }

      .list-group-item{
        
        line-height: 18px;
        padding: 10px;
        border-radius: 0;
        p{
          margin: 0;
        }
      }
    }
  }
</style>
