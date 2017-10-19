<template lang="pug">
  .form
    b-form(@submit="onSubmit")
      h3 Datos generales
      .row
        .col-1
          b-form-group(id="grupo1" label="UserId" label-for="userid")
            span(v-if="isPatch")
              | {{form.userid}}
            b-form-input(v-if="!isPatch" id="userid" placeholder="Último ID" v-model="form.userid")
        .col
          b-form-group(id="grupo1" label="Nombre *" label-for="nombre")
            b-form-input(id="nombre" placeholder="Nombre completo del empleado" v-model="form.nombre" required)
        .col-2
          b-form-group(id="grupoRFc" label="RFC" label-for="rfc")
            b-form-input(id="rfc" v-model="form.rfc" required)
        .col
          b-form-group(id="grupo2" label="Adscripción *" label-for="adscripcion")
            b-form-input(id="adscripcion" v-model="form.adscripcion" required)
      h3 Horario
      .row
        .col
          b-form-group(id="grupo3" label="Hora de entrada *" label-for="entrada")
            b-form-input(id="entrada" type="time" v-model="form.entrada" required)
        .col
          b-form-group(id="grupo6" label="Hora de salida *" label-for="salida" required)
            b-form-input(id="salida"  type="time" v-model="form.salida" required)
      .row
        .col
          b-form-group(id="grupo4" label="Hora de salida a comer" label-for="salidacomer")
            b-form-input(id="salidacomer" type="time" v-model="form.salidacomer")
        .col
          b-form-group(id="grupo5" label="Hora de entrada de comer" label-for="entradacomer")
            b-form-input(id="entradacomer"  type="time" v-model="form.entradacomer")
     
    .btn-form-group
      router-link.btn.btn-secondary(:to="{ name: 'asistenciaGeneral'}") Regresar
      
      b-button(type="submit" variant="success") {{isPatch? 'Actualizar registro': 'Registrar nuevo empleado'}}
</template>
<script>
export default {
  name: 'EmpleadoForm',
  props: ['empleado', 'isPatch'],
  data: () => {
    return {
      _form: {
        userid: null,
        nombre: '',
        adscripcion: '',
        entrada: '08:00',
        salida: '15:00',
        entrada_comer: null,
        salida_comer: null
      },
      form: {}
    }
  },
  methods: {
    onSubmit: function () {
      this.$emit('save', this.form)
    }
  },
  watch: {
    empleado () {
      if (this.empleado) {
        this.form = this.empleado.data
      } else {
        this.form = this._form
      }
      this.$forceUpdate()
    },

    isPatch () {
      console.log(this.isPatch)
    }
  },
  created: () => {
    this.form = this._form
  }
}
</script>

