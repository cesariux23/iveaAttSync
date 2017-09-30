<template lang="pug">
  .register
    h3 Registro de empleados
    empleado-form
</template>
<script>
  import EmpleadoForm from './EmpleadoForm'
  export default {
    name: 'Registro',
    components: { EmpleadoForm }
  }
</script>