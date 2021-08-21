<template>
  <div>
    <Navigation />
    <router-view />
    <Footer />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-bottom:205px;
  min-height:100vh;
  position:relative;
}
body{
  background-color:#f2f5f7f8;
 
}
</style>

<script>
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'

export default{
  name: 'app',
  components: {
    Navigation,
    Footer

  }
}

</script>
