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
  text-align: center;
  color: #2c3e50;
  /*margin-bottom:200px;*/
}
body{
  padding-top: 60px;
  overflow-x: hidden;
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
