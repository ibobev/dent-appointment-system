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
  padding-bottom: 205px;
  min-height: 100vh;
  position: relative;
}
body {
  background-color: #f2f5f7f8;
}
</style>

<script>
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";

import axios from "axios";

const token = localStorage.getItem("token") || sessionStorage.getItem("token");
if (token) {
  console.log("token ima");
  axios.defaults.headers.common["Authorization"] = `Token ${token}`;
}

export default {
  name: "app",
  components: {
    Navigation,
    Footer,
  },
  data() {
    return {
      get token() {
        return localStorage.getItem("token") || sessionStorage.getItem("token");
      },
      get role() {
        return localStorage.getItem("role") || sessionStorage.getItem("role");
      },
      setToken(token, persistant = false) {
        if (persistant) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }
        axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      },
      setRole(role, persistant = false) {
        if (persistant) {
          localStorage.setItem("role", role);
        } else {
          sessionStorage.setItem("role", role);
        }
      },
      deleteToken() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
      },
    };
  },
};
</script>
