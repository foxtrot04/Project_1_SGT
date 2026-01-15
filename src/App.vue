<template>
  <div id="app">
    <Index />
  </div>
</template>

<script>
import Index from './pages/index.vue'

export default {
  name: 'App',
  components: {
    Index
  }
}
</script>

<style lang="scss">
@import './assets/styles/global.scss';
</style>