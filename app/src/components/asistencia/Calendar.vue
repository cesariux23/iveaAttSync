<template lang='pug'>
  .calendar-container
    h4 Registro de asistencia
    .row
      .col
        .calendar
          .row.weekdays
            span.text-uppercase(v-for="wd in weekdays") {{wd}}
          .row.days
            .calendar-day(v-for="d in dias" v-bind:class="dayClass(d)"  v-on=" d ? { 'click': () => handleDayClick(d) } : {} ")
              .day-label.position-absolute(:class="{selected: selection.indexOf(d) >= 0 }") 
                span {{d}}
              day(v-bind:eventos="asistencia | attEvent(d)")
      .col-xl-4.col-lg-3.col-md-6
        div(v-if="selection.length > 0")
          b-card
            template(slot="header")
              button.close(type="button" aria-label="Close" @click="selection = []")
                  span(aria-hidden="true") &times
              h4(v-if="selection.length == 1")
                i.fa.fa-calendar-o
                b  {{selection[0]}}
                |  de {{months[selectedDate.month - 1]}}
              h4(v-else)
                i.fa.fa-calendar-check-o
                b  {{selection.length}} 
                |  días
            .container.align-middle.text-center.text-muted(v-if="isLoadingDayDetail")
              i.fa.fa-circle-o-notch.fa-fw.fa-2x.fa-spin
              br
              span Cargando información ...
            .container(v-else)
              .text-right
                button.btn.btn-outline-primary.mr-1(@click="showModal()")
                  i.fa.fa-pencil
                button.btn.btn-outline-success.mr-1
                  i.fa.fa-refresh
                button.btn.btn-outline-danger
                  i.fa.fa-minus-circle
              div(v-if="selection.length === 1")
                .text-center
                  p(v-if="selectedDay.status")
                    att-icon.fa-2x(:status='selectedDay.status')
                    br
                    | {{selectedDay.status}}
                  p(v-else)
                    i.fa.fa-2x.fa-question-circle.text-secondary
                    br
                    | SIN DEFINIR
                div(v-if="selectedDay.observaciones")
                  hr
                  b Observaciones:
                  br
                  .border.border-light {{selectedDay.observaciones}}
                hr
                h5
                  b {{registros.length}} 
                  | Eventos:
                ol(v-if="registros && registros.length > 0")
                  li(v-for="evnt in registros")
                    | {{evnt.hora | zeroFill}}:{{evnt.minuto | zeroFill}} hrs. 
                    span(v-if="evnt.id === selectedDay.entrada")
                      i.fa.fa-arrow-right.text-success
                      |   Entrada
                    span(v-if="evnt.id === selectedDay.salida")
                      i.fa.fa-arrow-right.text-primary
                      |   Salida
                .alert.alert-warning(v-else) Sin eventos registrados
              div(v-else)
                br
                h4 Días seleccionados:
                .alert.alert-warning
                  span.mr-1(v-for="(d, i) in selection") {{d}}{{i < selection.length-1 ? ',' : '.'}}
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
        b-modal(
          id="modal-edit"
          :title="modalTitle"
          closeTitle="Cerrar"
          okTitle="Actualizar"
          cancelTitle="Cancelar"
          @ok="updateAtt")
          .container
            b-form
              b-form-group
                label Marcar como
                b-form-select(id="status" :options="statuses" required v-model="editingDay.status")
              b-form-group
                label Observaciones
                b-form-textarea(
                  id="observaciones"
                  v-model="editingDay.observaciones"
                  placeholder="Observaciones"
                  :rows="2"
                  :max-rows="6")
              div(v-if="selection.length === 1 && registros && registros.length >= 2")
                h4 Eventos 
                  button.btn.btn-light(type="button" v-if='registros.length >= 3' @click="changeIn = !changeIn")
                    span
                      i.fa.fa-refresh(:class="{'text-success': changeIn, 'text-primary': !changeIn}")
                      |  Cambiar {{changeIn ? 'Entrada' : 'Salida'}}
                .container
                  .row
                    .col-4(v-for="evnt in registros")
                      span(v-if="registros.length < 3")  {{evnt.hora | zeroFill}}:{{evnt.minuto | zeroFill}} hrs.
                      button.btn.mb-1(v-else type="button" :class='isInOrOut(evnt.id)' @click="toggleEvent(evnt)") {{evnt.hora | zeroFill}}:{{evnt.minuto | zeroFill}} hrs.                   
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
        editingDay: {},
        modalTitle: 'Editar',
        dayToUpdate: false,
        patchDay: false,
        isLoadingDayDetail: false,
        changeIn: false,
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
          this.selection = []
          this.$forceUpdate()
        })
      },
      // clases para los dias
      dayClass: function (wd) {
        return {
          data: wd >= 1,
          empty: wd === '',
          selected: this.selection.indexOf(wd) >= 0
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
        .finally(() => { this.isLoadingDayDetail = false })
      },
      updateAtt: function () {
        var toUpdate = []
        var toCreate = []
        let data = {
          userid: this.userid,
          anio: this.selectedDate.year,
          mes: this.selectedDate.month,
          dia: this.dayToUpdate,
          observaciones: this.editingDay.observaciones,
          status: this.editingDay.status
        }
        let method = this.patchDay ? 'patch' : 'post'

        if (this.patchDay && this.selection.length === 1) {
          // actualización individual
          // se agregan los ids de los eventos
          data.entrada = this.editingDay.entrada
          data.salida = this.editingDay.salida
          console.log('individual')
        }
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
          const url = '/asistencia' + (this.patchDay ? `/${this.editingDay.id}` : '')
          this.$http({
            method,
            url: url,
            data
          })
          .then((res) => {
            this.getEvents()
            if (!this.patchDay && toCreate.length === 0) {
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
        if (!event.ctrlKey) {
          const last = this.selection.length > 0 ? this.selection[0] : false
          this.selection = []
          this.tabIndex = 0
          if (last !== d) {
            this.getDayDetail(d)
            this.selection.push(d)
          }
        } else {
          if (event.altKey) {
            this.toggleSelect(d, true)
          } else {
            this.toggleSelect(d)
          }
        }
      },
      toggleSelect: function (d, range = false) {
        if (this.selection.indexOf(d) >= 0) {
          this.selection.splice(this.selection.indexOf(d), 1)
        } else {
          this.selection.push(d)
          if (this.selection.length > 1) {
            // se verifica si se va a agregar un rango
            if (range) {
              let first = this.selection[0]
              let last = d
              if (first > d) {
                last = first
                first = d
              }
              const range = []
              // se genera un rango
              while (first <= last) {
                // se valida que no sea un dia de fin de semana
                // generar dia
                const day = first++
                const date = moment().year(this.selectedDate.year).month(this.selectedDate.month - 1).date(day)
                const weekday = date.isoWeekday()
                if (weekday <= 5) {
                  range.push(day)
                }
              }
              this.selection = range
            }
          }
        }
        if (this.selection.length > 1) {
          this.selection = this.selection.sort((a, b) => a - b)
          this.tabIndex = 2
        } else {
          this.tabIndex = 0
        }
      },
      showModal () {
        this.editingDay = JSON.parse(JSON.stringify(this.selectedDay))
        this.changeIn = false
        this.modalTitle = this.selection.length > 1
          ? 'Modificar ' + this.selection.length + ' días'
          : this.selection[0] + ' de ' + this.months[this.selectedDate.month - 1]
        this.$bvModal.show('modal-edit')
      },
      isInOrOut (id) {
        if (this.editingDay.entrada === id) {
          return 'btn-outline-success'
        } else if (this.editingDay.salida === id) {
          return 'btn-outline-primary'
        } else {
          return 'btn-light'
        }
      },
      getHourEvent (event) {
        return parseInt(this.$options.filters.zeroFill(event.hora) + this.$options.filters.zeroFill(event.minuto))
      },
      toggleEvent (event) {
        const entrada = this.getHourEvent(this.editingDay.entradaEvt)
        const salida = this.getHourEvent(this.editingDay.salidaEvt)
        const selected = this.getHourEvent(event)
        if (this.changeIn && selected < salida) {
          this.editingDay.entradaEvt = event
          this.editingDay.entrada = event.id
        } else if (!this.changeIn && selected > entrada) {
          this.editingDay.salidaEvt = event
          this.editingDay.salida = event.id
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
  border: 2px solid #888;
}

.weekdays {
    margin: 0 !important;
    padding: 10px 0;
    background-color: #888;
    border-bottom: 2px solid #FF8A33;
}

.weekdays span {
    display: inline-block;
    width: 14.28571428571429%;
    color: #fff;
    text-align: center;
}

.days {
    background: #ccc;
    margin: 0 !important;
}


.calendar-day.data:hover{
  .day-label{
    background: #dfdfdf !important;
    color: #FF8A33 !important;
    font-weight: bold;
    
  }
}

.calendar-day{
  width: 14.28571428571429%;
  min-height: 75px;
  padding: 0;
  padding-top: 20px;
}
.calendar-day.data{
  border: 1px solid #ddd;
  background-color: white;
  color: #888;
  text-align: center;
  cursor: pointer;
  .day-label{
    width: 22px;
    height: 22px;
    margin-top: -18px;
    margin-left: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #868e96;
    border-radius: 50%;
    span{
      margin: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &.selected{
      background-color: #FF8A33;
      color: #ffffff;      
      font-weight: bold;
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

.card-body {
  padding: 5px;
}
</style>
