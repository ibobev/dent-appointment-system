<template>
  <nav class="nav flex-column profile-navbar navbar-dark bg-dark py-2">
    <button
      type="button"
      class="navbar-toggler"
      @click="navCollapsed = !navCollapsed">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      class="nav flex-column navbar-collapse"
      v-bind:class="{'collapse': !navCollapsed, 'colapsed': navCollapsed}">
        <router-link to="/patient/profile">
          <i class="fas fa-user-circle fa-lg"></i>&nbsp;&nbsp;
          Profile
        </router-link>
        <router-link to="/patient/dentists">
          <i class="fas fa-user-md fa-lg"></i>&nbsp;&nbsp;
          Dentists
        </router-link>
        <router-link to="/patient/search">
          <i class="fas fa-search fa-lg"></i>&nbsp;
          Search
        </router-link>
        <router-link to="/patient/appointments">
          <i class="fas fa-calendar-alt fa-lg"></i>&nbsp;&nbsp;
          Appointments
        </router-link>
        <router-link to="/patient/medical-record">
          <i class="fas fa-file-medical fa-lg"></i>&nbsp;&nbsp;
          Record
        </router-link>
        <router-link to="/" @click="onLogout">
          <i class="fas fa-power-off fa-lg"></i>&nbsp;
          Logout
        </router-link>
    </div>
  </nav>
</template>

<style scoped>
/*.profile-navbar{
  height: 100%;
}*/

.profile-navbar button {
  margin: 0 auto;
}

.profile-navbar div.nav a {
  width: 100%;
  padding: 12px 0px 12px 15px;
  text-decoration: none;
  color: #fff;
}

.profile-navbar div.nav a:hover {
  background-color: rgba(0,0,0,0.2);
}

@media screen and (min-width: 768px) {
  .profile-navbar {
    height: 100%;
  }
  .profile-navbar button {
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
