<template lang='pug'>
  .events-container
    .empleado-list-container(:class="{ open: showSideNav }")
      empleado-list( v-on:selectedEmp="updateSelected" :selectedDate="selectedDate")
    .details-container.w-100(:class="{ open: showSideNav }")
      title-nav(:showSideNav="showSideNav" :empleado="empleado" :selectedDate="selectedDate" @toggleShowSideNav="toggleShowSideNav" @goToMonth="goToMonth")
      router-view(:empleado="empleado")
</template>
<script>
import empleadoList from './EmpleadoList'
import titleNav from './TitleNav'

export default {
  name: 'Asistencia',
  components: {
    titleNav,
    empleadoList
  },
  methods: {
    updateSelected: function (emp) {
      this.empleado = emp
    },
    mesAnterior: function () {
      if (this.info.mesActual === 1) {
        this.info.mesActual = 12
        this.info.anio--
      } else {
        this.info.mesActual--
      }
    },
    mesSiguiente: function () {
      if (this.info.mesActual === 12) {
        this.info.mesActual = 1
        this.info.anio++
      } else {
        this.info.mesActual++
      }
    },
    toggleShowSideNav: function () {
      this.showSideNav = !this.showSideNav
    },
    goToMonth: function (year, month, id = null) {
      let name = this.$router.currentRoute.name
      let params = {year, month}
      if (id === null) {
        if (this.$router.currentRoute.params.id !== null) {
          params.id = this.$router.currentRoute.params.id
        }
      } else {
        params.id = id
      }
      console.log(params)

      return this.$router.push({
        name,
        params
      })
    },
    getEmpleado: function () {
      this.$http.get('/empleados/' + this.userid)
      .then((res) => {
        this.empleado = res.data.data
        this.$forceUpdate()
      })
    }
  },
  data () {
    return {
      empleado: {},
      showSideNav: true
    }
  },
  computed: {
    year () {
      return parseInt(this.$route.params.year)
    },
    month () {
      return parseInt(this.$route.params.month)
    },
    userid () {
      return parseInt(this.$route.params.id)
    },
    selectedDate () {
      return {
        year: this.year,
        month: this.month
      }
    }
  },
  watch: {
    userid: function () {
      this.getEmpleado()
    }

  },
  created () {
    this.getEmpleado()
  }
}
</script>
<style lang="less" scoped>
@sidebar: 400px;

.events-container {
  display: flex;
  .empleados {
    position: fixed;
    overflow-y: hidden;
  }
  .details-container {
    transition: all 0.2s ease-in-out;
    &.open{
      margin-left: @sidebar;
    }
  }

  .eventos{
    overflow-y: auto;
    transition: all 0.2s ease-in-out;
  }

  .empleado-list-container {
    flex: 1 0 auto;
    position: absolute;
    width: @sidebar;
    margin-left: -@sidebar;
    transition: all 0.2s ease-in-out;
    &.open{
      margin-left:0;
    }
  }
}
</style>
