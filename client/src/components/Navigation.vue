<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <div class="navbar-brand">DentApp</div>
        <button
          v-if="isGuest"
          class="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          v-on:click="navCollapsed = !navCollapsed"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div v-if="isGuest"
          class="navbar-collapse"
          v-bind:class="{ collapse: !navCollapsed, collapsed: navCollapsed }"
        >
          <ul class="navbar-nav">
            <li class="nav-item px-3">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item px-3">
              <router-link to="/register" class="nav-link"
                >Register</router-link
              >
            </li>
            <li class="nav-item px-3">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
nav {
  background-color: #0292f8;
}
</style>

<script>
import auth from "../auth";
export default {
  data() {
    return {
      navCollapsed: false,
      isGuest: true
    };
  },
  watch: {
    $route() {
      this.navCollapsed = false;
      if(auth.data().token) {
        this.isGuest = false;
      }else{
        this.isGuest = true;
      }
    },
  },
};
</script>
