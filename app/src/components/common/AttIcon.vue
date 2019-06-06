<template lang="pug">
  span
    i(:class="statusClass" :title="attStatus.name")
</template>
<script>
export default {
  name: 'AttIcon',
  props: ['status'],
  computed: {
    statusClass () {
      const values = [
        'fa fa-' + (this.status ? this.attStatus.icon ? this.attStatus.icon : 'question-circle' : 'question'),
        this.status ? this.attStatus.color ? 'text-' + this.attStatus.color : '' : ''
      ]
      return values.join(' ')
    },
    AttStatuses () {
      return this.$store.getters.attStatus
    },
    attStatus () {
      return this.AttStatuses[this.status]
    }
  },
  watch: {
    status () {
      this.$forceUpdate()
    }
  }
}
</script>
