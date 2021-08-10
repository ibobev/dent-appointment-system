<template>
  <Navigation />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script>
import Navigation from './components/Navigation.vue'

export default{
  name: 'app',
  components: {
    Navigation
    
  }
}

</script>
