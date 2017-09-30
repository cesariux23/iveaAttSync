<template lang ="pug">
  .calendar
    .month
      ul
        li.prev
          button.btn.btn-light(type="button" @click="anterior")
            i.fa.fa-chevron-left.fa-2x
        li.next
          button.btn.btn-light(type="button" @click="siguiente")
            i.fa.fa-chevron-right.fa-2x
        li
          b {{meses[info.mesActual-1]}}
          br
          span {{info.anio}}
    ul.weekdays
      li(v-for="wd in weekdays") {{wd}}

    .row.days
      .calendar-day(v-for="d in dias" v-bind:class="dayClass(d)" @click="openDetail(d)")
        span.day-label.text-secondary {{d}}
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
                .col-6
                  b Entrada: 
                  span(v-if="selectedDay.entradaEvt") {{selectedDay.entradaEvt.hora}}:{{selectedDay.entradaEvt.minuto}} hrs.
                  span(v-else) No definido.
                .col-6 
                  b Salida: 
                  span(v-if="selectedDay.salidaEvt") {{selectedDay.salidaEvt.hora}}:{{selectedDay.salidaEvt.minuto}} hrs.
                  span(v-else) No definido.
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
          'PUNTUALIDAD', 'ASISTENCIA', 'RETARDO', 'INASISTENCIA', 'LICENCIA', 'NO_LABORAL'
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
      }
    },
    computed: {
      // dias del mes para mostrar en el calendario
      dias: function () {
        const inicio = moment({ y: this.info.anio, M: this.info.mesActual - 1, d: 1 })
        let fin = moment({ y: this.info.anio, M: this.info.mesActual - 1, d: 1 }).add(1, 'month').subtract(1, 'day')

        const off = inicio.day() >= 1 ? Array.from(new Array(inicio.day()), (x, i) => '') : []
        return off.concat(Array.from(new Array(fin.date()), (x, i) => i + 1))
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
          this.modalTitle = 'Asistencia del día ' + dia + ' de ' + this.meses[this.info.mesActual - 1]
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
<style scoped lang="less">
ul {list-style-type: none;}

.calendar{
  box-shadow: 0 10px 10px #999;
}

.month {
    padding: 10px 25px;
    width: 100%;
    background: #1abc9c;
    text-align: center;
}

.month ul {
    margin: 0;
    padding: 0;
}

.month ul li {
    color: white;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
}

.month .prev {
    float: left;
    padding-top: 10px;
}

.month .next {
    float: right;
    padding-top: 10px;
}
.weekdays {
    margin: 0;
    padding: 10px 0;
    background-color: #ddd;
}

.weekdays li {
    display: inline-block;
    width: 13.6%;
    color: #666;
    text-align: center;
}

.days {
    background: #eee;
    margin: 0;
    padding-bottom: 10px;
}

.calendar-day{
  width: 14.28571428571429%;
  border: 1px solid #eee;
  height: 120px;
  padding: 5px;
}
.calendar-day.data{
    background-color: white;
    cursor: pointer;
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
.days li > span.day-label{
    text-align: center;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: left;
    justify-content: center;
    position: absolute;
}

.days li .active {
    padding: 5px;
    background: #1abc9c;
    color: white !important
}

/* Add media queries for smaller screens */
@media screen and (max-width:1120px) {
    .weekdays li, .days li {width: 13.1%;}
}

@media screen and (max-width: 820px) {
    .weekdays li, .days li {width: 12.5%;}
    .days li .active {padding: 2px;}
}

@media screen and (max-width: 690px) {
    .weekdays li, .days li {width: 12.2%;}
}
</style>
