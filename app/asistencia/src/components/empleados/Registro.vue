<template lang="pug">
  .container
    h1 {{ isPatch ? 'Actualizar datos del empleado' : 'Registro de empleados' }}
    hr
    empleado-form(@save='save' :empleado='empleado' :isPatch='isPatch')
</template>
<script>
  import EmpleadoForm from './EmpleadoForm'
  import HTTP from '../../http'
  export default {
    name: 'Registro',
    props: ['id'],
    components: { EmpleadoForm },
    data: () => {
      return {
        empleado: {
          userid: null,
          nombre: '',
          adscripcion: '',
          entrada: '08:00',
          salida: '15:00',
          entrada_comer: null,
          salida_comer: null
        },
        isPatch: false
      }
    },
    methods: {
      save: function (empleado) {
        const url = '/empleados' + (this.id ? `/${empleado.userid}` : '')
        const data = {
          userid: empleado.userid,
          nombre: empleado.nombre,
          adscripcion: empleado.adscripcion,
          entrada: empleado.entrada,
          salida: empleado.salida,
          entrada_comer: empleado.entrada_comer,
          salida_comer: empleado.salida_comer
        }
        const method = this.isPatch ? 'patch' : 'post'
        HTTP({
          method,
          url: url,
          data
        })
        .then((res) => {
          alert(res)
        })
      }
    },
    created: function () {
      if (this.id) {
        HTTP.get(`/empleados/${this.id}`)
        .then((res) => {
          console.log(res)
          if (res.data) {
            this.empleado = res.data
            this.isPatch = true
          }
        })
      }
    }
  }
</script>