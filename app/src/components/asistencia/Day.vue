<template lang="pug">
  .dia
    .container(v-if= "eventos.length > 0")
      .row
        .col-xl-6.col-icon
          att-icon.fa-2x(:status='evento.status')
        .col-xl-6.col-event
            .row(:class='eventsClass')
              .col-12(v-if= "evento.entradaEvt" title="Entrada")
                span.text-info {{evento.entradaEvt.hora | zeroFill}}:{{evento.entradaEvt.minuto | zeroFill}}
              .col-12(v-if= "evento.salidaEvt" title="Salida")
                span.text-primary {{evento.salidaEvt.hora | zeroFill}}:{{evento.salidaEvt.minuto | zeroFill}}
</template>
<script>
  import AttIcon from '../common/AttIcon'
  export default {
    name: 'Day',
    props: ['eventos'],
    components: {AttIcon},
    data () {
      return {
        eventsClass: ''
      }
    },
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
.container{
  padding-top: 0;
}
.visible{
  visibility: visible;
}

.col-event{
  padding: 0 1px;  
  font-size: 13px;
}
.col-icon{
  margin-top: -10px;
  font-size: 20px;
}

.badge{
  width: 100%;
  text-align: center;
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
