<template lang="pug">
  .dia
    div(v-if= "eventos.length > 0")
      i.fa.fa-2x(:class='statusClass' :title='evento.status')
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
  export default {
    name: 'Dia',
    props: ['eventos'],
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
      },
      statusClass: function () {
        let classes = ''
        this.eventsClass = 'visible'
        switch (this.evento.status) {
          case 'PENDIENTE':
            classes = 'fa-circle-thin text-secondary'
            break
          case 'ASISTENCIA':
            classes = 'fa-check'
            this.eventsClass = ''
            break
          case 'COMISIÓN':
            classes = 'fa-external-link'
            break
          case 'RETARDO RECUPERABLE':
            classes = 'fa-clock-o'
            break
          case 'RETARDO MAYOR':
            classes = 'fa-clock-o text-warning'
            break
          case 'NO LABORAL':
            classes = 'fa-calendar-minus-o text-info'
            break
          case 'PERIODO VACACIONAL':
            classes = 'fa-user-o text-secondary'
            break
          case 'OMISIÓN DE SALIDA':
            classes = 'fa-sign-out text-warning'
            break
          case 'OMISIÓN DE ENTRADA':
            classes = 'fa-sign-in text-warning'
            break
          case 'PUNTUALIDAD':
            classes = 'fa-check-circle-o text-success'
            this.eventsClass = ''
            break
          case 'INASISTENCIA':
            classes = 'fa-times text-danger'
            break
        }
        return classes
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
.container{
  padding-top: 0;
  .row{
    visibility: hidden;
  }
}
.visible{
  visibility: visible;
}

.col-lg-6{
  padding: 0 5px;
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
