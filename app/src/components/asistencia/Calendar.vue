<template lang='pug'>
  .calendar-container
    h5 Eventos
    .row
      .col
        .calendar
          .row.weekdays
            span.text-uppercase(v-for="wd in weekdays") {{wd}}
          .row.days
            .calendar-day(v-for="d in dias" v-bind:class="dayClass(d)"  @click="handleDayClick(d)")
              .day-label.position-absolute(:class="{selected: selection.indexOf(d) >= 0 }")
                span {{d}}
              day(v-bind:eventos="asistencia | attEvent(d)")

          b-modal(ref="attModal"
            :title="modalTitle"
            closeTitle="Cerrar"
            okTitle="Actualizar asistencia"
            cancelTitle="Cancelar"
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
                        span(v-else)
                          | No definido.
                          i.fa.fa-exclamation-circle
                      .col
                        b Salida: 
                        span(v-if="selectedDay.salidaEvt") {{selectedDay.salidaEvt.hora | zeroFill}}:{{selectedDay.salidaEvt.minuto | zeroFill}} hrs.
                        span(v-else)
                          b No definido.
                          i.fa.fa-exclamation-circle
      .col-5
        div(v-if="selection.length > 0")
          b-card
            template(slot="header")
              div(v-if="selection.length == 1")
                b-button.float-right(variant="light" @click="selection = []")
                  i.fa.fa-times
                  |  Cerrar
                h4
                  i.fa.fa-calendar-check-o
                  b  {{selection[0]}}
                  |  de {{months[selectedDate.month - 1]}}
              div(v-else)
                b-button.float-right(variant="light" @click="selection = []")
                  i.fa.fa-times
                  |  Limpiar
                h4
                  i.fa.fa-calendar-plus-o
                  b  {{selection.length}}
                  |  días
            div(v-if="selection.length > 1")
              .alert.alert-info
                | Días seleccionados:
                b  {{selection.join(', ')}}
            .container(v-if="isLoadingDayDetail")
              i.fa.fa-circle-o-notch.fa-fw.fa-2x.fa-spin.text-muted
            b-tabs(v-else  v-model="tabIndex")
              b-tab(title="Detalles" active)
                .container
                  .text-center
                    p(v-if="selectedDay.status")
                      att-icon.fa-3x(:status='selectedDay.status')
                      br
                      | {{selectedDay.status}}
                    p(v-else)
                      i.fa.fa-3x.fa-question-circle
                      br
                      | SIN DEFINIR
                  .alert.alert-primary
                    h5
                      b Eventos:
                    .row
                      .col
                        b Entrada: 
                        span(v-if="selectedDay.entradaEvt") {{selectedDay.entradaEvt.hora | zeroFill}}:{{selectedDay.entradaEvt.minuto | zeroFill}} hrs.
                        span(v-else)
                          | No definido.
                      .col
                        b Salida: 
                        span(v-if="selectedDay.salidaEvt") {{selectedDay.salidaEvt.hora | zeroFill}}:{{selectedDay.salidaEvt.minuto | zeroFill}} hrs.
                        span(v-else)
                          | No definido.
                  div(v-if="selectedDay.observaciones")
                    b Observaciones:
                    br
                    .alert.alert-secondary {{selectedDay.observaciones}}
              b-tab(:title="'Eventos ('+registros.length+')'")
                .container(v-if="selection.length === 1")
                  div(v-if="selectedDay")
                    ol(v-if="registros && registros.length > 0")
                      li(v-for="evnt in registros")
                        | {{evnt.hora | zeroFill}}:{{evnt.minuto | zeroFill}} hrs. 
                        span.badge.badge-success(v-if="evnt.id === selectedDay.entrada")
                          i.fa.fa-sign-in
                          |   Entrada
                        span.badge.badge-info(v-if="evnt.id === selectedDay.salida")
                          i.fa.fa-sign-out
                          |   Salida
                    .alert.alert-warning(v-else) Sin eventos registrados
              b-tab(title="Actualizar")
                .container
                  b-form
                    b-form-group
                      label Marcar la asistencia como
                      b-form-select(id="status" :options="statuses" required v-model="selectedDay.status")
                    b-form-group
                      label Observaciones
                      b-form-textarea(
                        id="observaciones"
                        v-model="selectedDay.observaciones"
                        placeholder="Observaciones"
                        :rows="3"
                        :max-rows="6")
                    b-form-group
                      b-button(variant="success" @click="updateAtt")
                        i.fa.fa-check
                        |  Guardar

        div(v-else)
          .card
            .card-header
              h4
                i.fa.fa-pie-chart
                |  Resumen
            table.table.table-sm
              thead
                tr
                  th Status
                  th Conteo
              tbody
                tr(v-for ="status in statuses" v-if="resumen[status] > 0")
                  td
                    AttIcon(:status="status")
                    |  {{AttStatuses[status].name}}
                  td
                    | {{resumen[status]}}
                  
</template>
<script>
  import Day from './day'
  import moment from 'moment'
  import AttIcon from '../common/AttIcon'
  moment.locale('es')
  export default {
    name: 'Calendar',
    components: {Day, AttIcon},
    props: ['selectedDate', 'userid'],
    data () {
      return {
        eventos: [],
        registros: [],
        asistencia: [],
        selectedStatus: null,
        selection: [],
        observaciones: null,
        weekdays: moment.weekdaysMin(),
        selectedDay: {},
        modalTitle: '',
        dayToUpdate: false,
        patchDay: false,
        isLoadingDayDetail: false,
        tabIndex: 0
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
        const inicio = moment({ y: this.selectedDate.year, M: this.selectedDate.month - 1, d: 1 })
        let fin = moment({ y: this.selectedDate.year, M: this.selectedDate.month - 1, d: 1 }).add(1, 'month').subtract(1, 'day')

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
      },
      months () {
        return this.$store.getters.months
      },
      AttStatuses () {
        return this.$store.getters.attStatus
      },
      statuses () {
        return Object.keys(this.AttStatuses)
      }
    },
    watch: {
      userid: function (val) {
        this.selection = []
        this.getEvents()
      },
      selectedDate: function (val) {
        this.getEvents()
      }
    },
    methods: {
      getEvents: function () {
        this.$http.get('/asistencia', {
          params: {
            userid: this.userid,
            anio: this.selectedDate.year,
            mes: this.selectedDate.month
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
      getDayDetail: function (d) {
        this.registros = []
        this.isLoadingDayDetail = true
        this.$http.get('/asistencia', {
          params: {
            userid: this.userid,
            anio: this.selectedDate.year,
            mes: this.selectedDate.month,
            dia: d
          }
        })
        .then((res) => {
          this.selectedDay = res.data.data[0] ? res.data.data[0] : {}
          this.dayToUpdate = d
          this.patchDay = res.data.data[0] || false
        })
        .finally(() => { this.isLoadingDayDetail = false })

        this.$http.get('/eventos', {
          params: {
            userid: this.userid,
            anio: this.selectedDate.year,
            mes: this.selectedDate.month,
            dia: d
          }
        }).then((res) => {
          if (res.data && res.data.data.length > 0) {
            this.$set(this, 'registros', res.data.data)
            this.$forceUpdate()
          } else {
            this.$set(this, 'registros', [])
          }
        })
      },
      updateAtt: function () {
        var toUpdate = []
        var toCreate = []
        let data = {
          userid: this.userid,
          anio: this.selectedDate.year,
          mes: this.selectedDate.month,
          dia: this.dayToUpdate,
          observaciones: this.selectedDay.observaciones,
          status: this.selectedDay.status
        }
        let method = this.patchDay ? 'patch' : 'post'
        if (this.selection.length > 1) {
          this.patchDay = false
          method = 'post'
        }

        if (!this.patchDay) {
          if (this.selection.length > 1) {
            // con la seleccion multiple se debe crear los registros faltantes y se deberá actualizar los existentes
            // se hace una separacion inicial
            this.selection.forEach(s => {
              const result = this.asistencia.find(a => a.dia === s)
              console.log(result)
              if (result) {
                toUpdate.push(result.id) // se almacena los ids de los registros a actualizar
              } else {
                toCreate.push(s) // solo se almacena los dias
              }
            })

            if (toUpdate.length > 0) {
              // se actualizan los dias que ya existen en la DB
              this.$http({
                method: 'patch',
                url: '/asistencia',
                data: {
                  ids: toUpdate,
                  status: data.status,
                  observaciones: data.observaciones
                }
              })
              .then((res) => {
                if (toCreate.length === 0) {
                  this.selection = []
                  this.getEvents()
                  this.$notify({
                    group: 'updated',
                    title: 'Información',
                    type: 'success',
                    text: 'Cambios guardados en la base de datos'
                  })
                }
              })
            }
            // se crea un array con los objetos nuevos
            const days = toCreate.map(d => { return { ...data, dia: d } })
            data = days
          } else {
            data = [data]
          }
        }

        if (this.patchDay || data.length > 0) {
          const url = '/asistencia' + (this.patchDay ? `/${this.selectedDay.id}` : '')
          this.$http({
            method,
            url: url,
            data
          })
          .then((res) => {
            this.getEvents()
            if (toCreate.length === 0) {
              this.selection = []
            } else {
              this.tabIndex = 0
            }
            this.$notify({
              group: 'updated',
              title: 'Información',
              text: 'Cambios guardados en la base de datos',
              type: 'success'
            })
          })
        }
      },
      handleDayClick: function (d) {
        console.log(d)
        if (!event.ctrlKey) {
          if (this.selection[0] !== d) {
            this.selection = []
            this.tabIndex = 0
            this.getDayDetail(d)
          }
        }
        this.toggleSelect(d)
      },
      toggleSelect: function (d) {
        if (this.selection.indexOf(d) >= 0) {
          this.selection.splice(this.selection.indexOf(d), 1)
        } else {
          this.selection.push(d)
        }
        if (this.selection.length > 1) {
          this.selection = this.selection.sort((a, b) => a > b)
          this.tabIndex = 2
        } else {
          this.tabIndex = 0
        }
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
  margin-left: auto;
  margin-bottom: 10px;
}

.weekdays {
    margin: 0 !important;
    padding: 10px 0;
    background-color: #ddd;
}

.weekdays span {
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
    background-color:grey;
    color: #fff;
  }
}

.calendar-day{
  width: 14.28571428571429%;
  border: 1px solid #eee;
  min-height: 80px;
  max-height: 110px;
  padding: 20px 0 10px 0; 
}
.calendar-day.data{
  background-color: white;
  color: #4d4d4d;
  text-align: center;
  cursor: pointer; 
  .day-label{
    width: 22px;
    height: 22px;
    margin-top: -15px;
    margin-left: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #868e96;
    border-radius: 50%;
    span{
      display: flex;
    }
    &.selected{
      background-color:teal;
      color: #fff;
    }
  }
}

.days li {
    list-style-type: none;
    display: inline-block;
    width: 13.6%;
    height: 95px;
    text-align: center;
    font-size:12px;
}
.days li.data{
  background-color: white;
  cursor: pointer;
}

.days li.empty{
  height: 0;
}

.days li .active {
    padding: 5px;
    background: #1abc9c;
    color: white !important
}
</style>
