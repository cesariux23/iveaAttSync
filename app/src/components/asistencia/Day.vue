<template lang="pug">
  .dia
    div(v-if= "eventos.length > 0")
      att-icon.fa-2x(:status='evento.status')
      .container.event-container
        .row(:class='eventsClass')
          .col-lg-6(v-if= "evento.entradaEvt" title="Entrada")
            b-badge(variant="success")
              span {{evento.entradaEvt.hora | zeroFill}}:{{evento.entradaEvt.minuto | zeroFill}}
          .col-lg-6(v-if= "evento.salidaEvt" title="Salida")
            b-badge(variant="info")
              span {{evento.salidaEvt.hora | zeroFill}}:{{evento.salidaEvt.minuto | zeroFill}}
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
.evt {
  margin: 2px;
  padding: 1px;
  font-size: 12px;
  >span {
    padding: 3px;
  }
}
.container{
  padding-top: 0;
}
.visible{
  visibility: visible;
}

.col-lg-6{
  padding: 0 2px;
  font-size: 14px;
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
