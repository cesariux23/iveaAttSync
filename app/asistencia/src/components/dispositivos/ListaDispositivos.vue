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
import io from 'socket.io-client'
const socket = io('http://localhost:3000/czs')

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
      socket.emit('reqSync', id)
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
    socket.close()
    socket.open()
    const _this = this
    socket.on('connect', function () {
      socket.emit('reqZonas')
    })
    socket.on('menssages', function () {
      console.log('mensaje')
    })
    socket.on('reconnect', function () {
      socket.emit('reqZonas')
    })
    socket.on('online', function (data) {
      _this.ubicaciones = data.coordinaciones
    })
    socket.on('logSync', function (data) {
      if (data.hasOwnProperty('zona')) {
        _this.ubicaciones[data.zona].mensaje = data.mensaje
        _this.ubicaciones[data.zona].online = data.online
      }
    })
  }
}
</script>
