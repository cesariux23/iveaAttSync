<template lang="pug">
  .text-center.h-100
    b-form.login-form(@submit.prevent="login")
      i.fa.fa-calendar-check-o.fa-5x.text-success
      h2
        b Control de asistencia
      h5 Recursos Humanos
      b-alert(:show="dismissCountDown"
             dismissible
             variant="danger"
             @dismissed="dismissCountdown=0"
             @dismiss-count-down="countDownChanged")
        | {{error}}
      b-form-group
        b-form-input(id="username" placeholder="Usuario" v-model='username')
      b-form-group
        b-form-input(id="password" type="password" placeholder="Password" v-model='password')
      b-form-group
        b-button(type="submit" variant="primary" size ="lg" block) Iniciar sesión
      br
      p Instituto Veracruzano de Educación para los Adultos, 2018.
            

</template>
<script>
  export default {
    name: 'Login',
    data () {
      return {
        username: '',
        password: '',
        error: '',
        dismissCountDown: 0
      }
    },
    methods: {
      countDownChanged (dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      login () {
        this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        }).then(data => {
          this.$router.push('/asistencia')
        }, error => {
          console.log('inthen')
          this.error = error.message
          this.dismissCountDown = 5
        })
      }
    }
  }
</script>
<style scoped>
  .text-center{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f6f6f6;
  }
</style>

