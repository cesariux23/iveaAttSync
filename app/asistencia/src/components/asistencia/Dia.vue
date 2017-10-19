<template lang="pug">
  .dia
    div(v-if= "eventos.length > 0")
      div {{evento.status}}
      div.evt.alert.alert-success(v-if= "evento.entradaEvt" title="Entrada")
        i.fa.fa-sign-in
        span {{evento.entradaEvt.hora | zeroFill}}: {{evento.entradaEvt.minuto | zeroFill}}
      div.evt.alert.alert-info(v-if= "evento.salidaEvt" title="Salida")
        i.fa.fa-sign-out
        span {{evento.salidaEvt.hora | zeroFill}}: {{evento.salidaEvt.minuto | zeroFill}}  
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
    },
    filters: {
      zeroFill: (numero) => {
        const width = 2 - numero.toString().length
        if (width > 0) {
          return new Array(width + (/\./.test(numero) ? 2 : 1)).join('0') + numero
        }
        return numero + '' // siempre devuelve tipo cadena
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

