<template>
  <div class="d-flex flex-column min-vh-100" >
    <Navigation />
    <router-view />
    <Footer />
  </div>
</template>

<style>
body {
  background-color: #f2f5f7f8;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>

<script>
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";
import axios from "axios";

export default {
  name: "app",
  components: {
    Navigation,
    Footer,
  },
  mounted() {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
    }
  },
};
</script>
