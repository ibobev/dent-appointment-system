<template>
  <nav class="nav flex-column dentist-navbar navbar-dark bg-dark py-2">
    <button
      type="button"
      class="navbar-toggler"
      @click="navCollapsed = !navCollapsed"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      class="nav flex-column navbar-collapse"
      id="side-nav"
      v-bind:class="{ collapse: !navCollapsed, colapsed: navCollapsed }"
    >
      <router-link to="/dentist/profile">
        <i class="fas fa-user-circle fa-lg"></i>&nbsp;&nbsp;
        Profile
      </router-link>
      <router-link to="/dentist/appointments">
        <i class="fas fa-calendar-alt fa-lg"></i>&nbsp;&nbsp;
        Appointments
      </router-link>
      <router-link to="/dentist/events">
          <i class="fas fa-calendar fa-lg"></i>&nbsp;&nbsp;
          Global Events
        </router-link>
      <router-link to="/dentist/patients">
        <i class="fas fa-file-medical fa-lg"></i>&nbsp;&nbsp;
        Patients
      </router-link>
      <router-link to="/" @click="onLogout">
        <i class="fas fa-power-off fa-lg"></i>&nbsp;&nbsp;
        Logout
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
.dentist-navbar button {
  margin: 0 auto;
}

.dentist-navbar div.nav a {
  width: 100%;
  padding: 12px 0px 12px 15px;
  text-decoration: none;
  color: #fff;
}

.dentist-navbar div.nav a:hover {
  background-color: rgba(0,0,0,0.2);
}

@media screen and (min-width: 768px) {
  .dentist-navbar {
    height: 100%;
  }
  .dentist-navbar button {
    display: none;
  }
}

.fas {
  color: #fff;
}

</style>

<script>
import auth from "../auth";
export default {
  data() {
    return { navCollapsed: true, }; 
  },
  methods: {
    onLogout() {
      auth.data().deleteToken();
      this.$router.push({ path: "/" });
    },
  },
};
</script>