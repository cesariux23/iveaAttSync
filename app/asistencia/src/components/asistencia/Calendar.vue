<template lang='pug'>
  .row
    .col-xl-9
      .calendar
        .month
          .row
            .col-sm-4.text-left
              button.btn.btn-light(type="button" @click="anterior")
                i.fa.fa-chevron-left.fa-2x
            .col-sm-4.title
              b {{meses[info.mesActual-1]}}
              br
              span {{info.anio}}
            .col-sm-4.text-right
              button.btn.btn-light(type="button" @click="siguiente")
                i.fa.fa-chevron-right.fa-2x
        ul.weekdays
          li(v-for="wd in weekdays") {{wd}}

        .row.days
          .calendar-day(v-for="d in dias" v-bind:class="dayClass(d)" @click="openDetail(d)")
            .day-label
              span {{d}}
            dia(v-bind:eventos="asistencia | attEvent(d)")

        b-modal(ref="attModal"
          :title="modalTitle"
          closeTitle="Cerrar"
          okTitle="Actualizar asistencia"
          @ok="updateAtt"
        )
            .d-block
              b-form-group(label="Marcar la asistencia de este día como" label-for="status")
                b-form-select(id="status" :options="statuses" required v-model="selectedStatus")
              b-form-textarea(id="observaciones"
                        v-model="observaciones"
                        placeholder="Observaciones"
                        :rows="3"
                        :max-rows="6")
              hr
              .alert.alert-secondary(v-if= "!selectedDay") Sin eventos registrados
              div(v-else)
                p Eventos Registrados:
                .alert.alert-info
                  .row
                    .col
                      b Entrada: 
                      span(v-if="selectedDay.entradaEvt") {{selectedDay.entradaEvt.hora | zeroFill}}:{{selectedDay.entradaEvt.minuto | zeroFill}} hrs.
                      span(v-else) No definido.
                    .col
                      b Salida: 
                      span(v-if="selectedDay.salidaEvt") {{selectedDay.salidaEvt.hora | zeroFill}}:{{selectedDay.salidaEvt.minuto | zeroFill}} hrs.
                      span(v-else) No definido.
    .col-xl-3
      .card
        .card-header
          .float-right
            button.btn.btn-sm.btn-outline-primary(title='Recalcular asistencia')
              i.fa.fa-refresh
          h5.card-title Resumen del mes
          
        .card-body
          .row
            .col-xl-12.col
              p(v-for='(count, status) in resumen')
                b {{status}}
                | : 
                span {{count}}
              
</template>
<script>
  import HTTP from '../../http'
  import dia from './Dia'
  import moment from 'moment'
  moment.locale('es')
  export default {
    name: 'Calendar',
    components: {dia},
    props: ['info', 'userid'],
    data () {
      return {
        eventos: [],
        meses: moment.months(),
        asistencia: [],
        statuses: [
          { text: 'Seleccione uno', value: null },
          'PUNTUALIDAD', 'ASISTENCIA', 'RETARDO RECUPERABLE', 'RETARDO MAYOR', 'COMISIÓN', 'PERMISO ECONÓMICO', 'OMISIÓN DE ENTRADA', 'OMISIÓN DE SALIDA', 'INASISTENCIA', 'LICENCIA MEDICA', 'NO LABORAL', 'PERIODO VACACIONAL', 'VACACIONES EXTRA', 'PENDIENTE'
        ],
        selectedStatus: null,
        observaciones: null,
        weekdays: moment.weekdaysMin(),
        selectedDay: {},
        modalTitle: '',
        dia: null
      }
    },
    filters: {
      attEvent: function (eventos, d) {
        return eventos.filter(function (e) {
          return e.dia === parseInt(d)
        })
      },
      zeroFill: (numero) => {
        const width = 2 - numero.toString().length
        if (width > 0) {
          return new Array(width + (/\./.test(numero) ? 2 : 1)).join('0') + numero
        }
        return numero + '' // siempre devuelve tipo cadena
      }
    },
    computed: {
      // dias del mes para mostrar en el calendario
      dias: function () {
        const inicio = moment({ y: this.info.anio, M: this.info.mesActual - 1, d: 1 })
        let fin = moment({ y: this.info.anio, M: this.info.mesActual - 1, d: 1 }).add(1, 'month').subtract(1, 'day')

        const off = inicio.day() >= 1 ? Array.from(new Array(inicio.day()), (x, i) => '') : []
        return off.concat(Array.from(new Array(fin.date()), (x, i) => i + 1))
      },
      resumen: function () {
        // se extrae el status
        let status = this.asistencia.map((dia) => {
          return dia.status
        })

        let result = {}
        // cuenta los estatus para generar un resumen
        status.forEach(element => {
          if (!result[element]) {
            result[element] = 0
          }
          result[element] += 1
        })
        return result
      }
    },
    watch: {
      userid: function (val) {
        this.getEvents()
      }
    },
    methods: {
      anterior: function () {
        this.$emit('anterior')
        this.getEvents()
      },
      siguiente: function () {
        this.$emit('siguiente')
        this.getEvents()
      },
      getEvents: function () {
        HTTP.get('/asistencia', {
          params: {
            userid: this.userid,
            anio: this.info.anio,
            mes: this.info.mesActual
          }
        })
        .then((res) => {
          this.asistencia = res.data.data
          this.$forceUpdate()
        })
      },
      // clases para los dias
      dayClass: function (wd) {
        return {
          data: wd >= 1,
          empty: wd === ''
        }
      },
      openDetail: function (dia) {
        if (dia) {
          this.dia = dia
          this.modalTitle = 'Asistencia del día ' + dia + ' de ' + this.meses[this.info.mesActual - 1] + ' de ' + this.info.anio
          this.selectedStatus = null
          this.observaciones = null
          HTTP.get('/asistencia', {
            params: {
              userid: this.userid,
              anio: this.info.anio,
              mes: this.info.mesActual,
              dia: dia
            }
          })
          .then((res) => {
            this.selectedDay = res.data.data[0]
            if (this.selectedDay) this.selectedStatus = this.statuses.indexOf(this.selectedDay.status) >= 0 ? this.selectedDay.status : null
            if (this.selectedDay) this.observaciones = this.selectedDay.observaciones
            this.$refs.attModal.show()
            this.$forceUpdate()
          })
        }
      },
      updateAtt: function () {
        const url = '/asistencia' + (this.selectedDay ? `/${this.selectedDay.id}` : '')
        const data = {
          userid: this.userid,
          anio: this.info.anio,
          mes: this.info.mesActual,
          dia: this.dia,
          observaciones: this.observaciones,
          status: this.selectedStatus
        }
        const method = this.selectedDay ? 'patch' : 'post'
        HTTP({
          method,
          url: url,
          data
        })
        .then((res) => {
          this.getEvents()
        })
      }
    },
    created: function () {
      this.getEvents()
    }
  }
</script>
<style lang="less">
ul {list-style-type: none;}

.calendar{
  box-shadow: 0 10px 10px #999;
  margin-left: auto;
  margin-bottom: 20px;
}

.month {
    padding: 10px 25px;
    width: 100%;
    background: #1abc9c;
    text-align: center;
    .title {
      color:#fff;
      text-transform: uppercase;
      line-height: 18px;
    }
}


.weekdays {
    margin: 0 !important;
    padding: 10px 0;
    background-color: #ddd;
}

.weekdays li {
    display: inline-block;
    width: 14.28571428571429%;
    color: #666;
    text-align: center;
}

.days {
    background: #eee;
    margin: 0;
    padding-bottom: 1px;
}

.calendar-day.data:hover{
  .day-label{
    background-color: #414141;
    color: #fff;
  }
  .event-container{
    visibility: visible;
  }
}

.calendar-day{
  width: 14.28571428571429%;
  border: 1px solid #eee;
  min-height: 95px;
  max-height: 110px;
  padding: 5px; 
}
.calendar-day.data{
  background-color: white;
  color: #4d4d4d;
  text-align: center;
  cursor: pointer; 
  .day-label{
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #868e96;
    border-radius: 50%;
    span{
      display: flex;
    }
  }
}

.calendar-day.empty >*{
  display: none;
}

.days li {
    list-style-type: none;
    display: inline-block;
    width: 13.6%;
    height: 95px;
    text-align: center;
    font-size:12px;
    margin: 0 2px 0 2px;
}
.days li.data{
  background-color: white;
  cursor: pointer;
}

.days li.empty{
  height: 0;
}
.days li.empty >*{
  display: none;
  
}

.days li .active {
    padding: 5px;
    background: #1abc9c;
    color: white !important
}
</style>
