<template lang="pug">
  nav.navbar.navbar-light.bg-light.border-bottom
    b-button(variant="light" @click="toggleShowSideNav" title='Mostrar menú')
      i.fa(:class="{ 'fa-arrow-left': showSideNav, 'fa-list': !showSideNav }")
    .div(v-if="empleado")
      span.fa.fa-user-o.user-icon
      b.text-uppercase  {{empleado.nombre}}
    b(v-else) Detalle de asitencia
    form.form-inline
      b-button-toolbar
        b-button-group
          b-button(variant="light" @click="goToMonth(month - 1)" title="Anterior")
            i.fa.fa-chevron-left
          b-button.current-month.text-center(variant="light")
            i.fa.fa-calendar-o
            span.text-capitalize  {{monthTitle}}
          b-button(variant="light" @click="goToMonth(month + 1)" title="Siguiente")
            i.fa.fa-chevron-right
</template>
<script>
export default {
  name: 'TitleNav',
  props: ['showSideNav', 'selectedDate', 'empleado'],
  methods: {
    toggleShowSideNav () {
      this.$emit('toggleShowSideNav')
    },
    goToMonth (month) {
      // validate year value
      if (month < 1) {
        this.$emit('goToMonth', this.year - 1, 12)
      } else if (month > 12) {
        this.$emit('goToMonth', this.year + 1, 1)
      } else {
        this.$emit('goToMonth', this.year, month)
      }
    }
  },
  computed: {
    months () {
      return this.$store.getters.months
    },
    year () {
      return this.selectedDate.year
    },
    month () {
      return this.selectedDate.month
    },
    monthTitle () {
      return this.months[this.month - 1] + ' ' + this.year
    }
  }
}
</script>
<style lang="less" scoped>
  .current-month {
    width: 180px;
  }
  .user-icon {
    color:orangered;
  }
</style>


