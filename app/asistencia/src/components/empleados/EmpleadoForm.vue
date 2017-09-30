<template lang="pug">
  .form
    | {{form}}
    b-form(@submit="onSubmit")
      b-form-group(id="grupo1" label="Nombre" label-for="nombre")
        b-form-input(id="nombre" placeholder="Nombre completo del empleado" v-model="form.nombre" required)
      b-form-group(id="grupo2" label="Adscripción" label-for="adscripcion")
        b-form-input(id="adscripcion" v-model="form.adscripcion" required)
      b-form-group(id="grupo3" label="Hora de entrada" label-for="entrada")
        b-form-input(id="entrada" v-model="form.entrada" required)
      b-form-group(id="grupo4" label="Hora de salida a comer" label-for="salidacomer")
        b-form-input(id="salidacomer" v-model="form.salidacomer")
      b-form-group(id="grupo5" label="Hora de entrada de comer" label-for="entradacomer")
        b-form-input(id="entradacomer" v-model="form.entradacomer")
      b-form-group(id="grupo6" label="Hora de salida" label-for="salida" required)
        b-form-input(id="salida" v-model="form.salida" required)
      b-button(type="submit" variant="primary") Guardar
</template>
<script>
export default {
  name: 'EmpleadoForm',
  data: () => {
    return {
      form: {
        nombre: '',
        adscripcion: '',
        entrada: '',
        salida: ''
      }
    }
  },
  methods: {
    onSubmit: function () {
      alert(':P')
    }
  }
}
</script>

