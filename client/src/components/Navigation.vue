<template>
  <header class="container">
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
      <div class="container">
        <router-link to="/" class="navbar-brand nav-link">DentApp</router-link>
        <button
          class="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          v-on:click="navCollapsed = !navCollapsed"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
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
export default {
  data() {
    return {
      navCollapsed: false,
    };
  },
  watch: {
    $route() {
      this.navCollapsed = false;
    },
  },
};
</script>
