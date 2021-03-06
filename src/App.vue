<template>
  <div id="app">
    <router-view></router-view>
    <main-tabber></main-tabber>
  </div>
</template>

<script>
import MainTabber from './components/content/mainTabbar'

export default {
  name: 'App',
  components: {
    MainTabber
  }
}
</script>

<style>
  @import "./assets/css/base.css"
</style>
