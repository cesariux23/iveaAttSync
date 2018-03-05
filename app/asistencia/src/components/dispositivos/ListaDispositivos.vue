<template lang="pug">
  .container
    h1 Dispositivos en línea
    br
    table.table
      thead
        tr
          th Ubicación
          th Acciones
          th Estatus
      tbody
        tr(v-for="cz in czs" :key="cz.id")
          td {{cz.zona}}
          td
            b-button(variant="outline-primary" @click="sync(cz.id)" :disabled="!cz.online") Sincronizar
          td {{cz.mensaje}}
</template>
<script>
export default {

  name: 'listaDispositivos',
  data: () => {
    return {
      czs: [],
      ubicaciones: {}
    }
  },
  methods: {
    sync (id) {
      this.$socket.emit('reqSync', id)
    }
  },
  watch: {
    ubicaciones () {
      this.czs = []
      Object.entries(this.ubicaciones).forEach(([key, value]) => {
        this.czs.push(value)
      })
    }
  },
  created () {
    this.$socket.close()
    this.$socket.open()
    const _this = this
    this.$socket.on('connect', function () {
      _this.$socket.emit('reqZonas')
    })
    this.$socket.on('menssages', function () {
      console.log('mensaje')
    })
    this.$socket.on('reconnect', function () {
      _this.$socket.emit('reqZonas')
    })
    this.$socket.on('online', function (data) {
      _this.ubicaciones = data.coordinaciones
    })
    this.$socket.on('logSync', function (data) {
      if (data.hasOwnProperty('zona')) {
        _this.ubicaciones[data.zona].mensaje = data.mensaje
        _this.ubicaciones[data.zona].online = data.online
      }
    })
  }
}
</script>
