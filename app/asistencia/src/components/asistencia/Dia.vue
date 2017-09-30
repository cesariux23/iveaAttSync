<template lang="pug">
  .dia
    div(v-if= "eventos.length > 0")
      div {{evento.status}}
      div.evt.alert.alert-success(v-if= "evento.entradaEvt" title="Entrada")
        i.fa.fa-sign-in
        span {{evento.entradaEvt.hora}}: {{evento.entradaEvt.minuto}}
      div.evt.alert.alert-info(v-if= "evento.salidaEvt" title="Salida")
        i.fa.fa-sign-out
        span {{evento.salidaEvt.hora}}: {{evento.salidaEvt.minuto}}  
</template>
<script>
  export default {
    name: 'Dia',
    props: ['eventos'],
    computed: {
      evento: function () {
        if (this.eventos.length > 0) {
          return this.eventos[0]
        }
        return false
      }
    }
  }
</script>
<style scoped lang="less">
.evt {
  margin: 5px;
  padding: 1px;
  font-size: 12px;
  >span {
    padding: 3px;
  }
}
.empty{
  display: flex;
  justify-content: center;
}

.in {
  background: green;
}
.out {
  background: gray;
}
</style>

