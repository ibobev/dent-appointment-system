<template>
  <div id="side-nav">
    <div id="side-nav-content">
      <div class="wrap-icon-link">
        <i class="fas fa-user-circle fa-lg"></i>
        <router-link to="/dentist/profile">Profile</router-link>
      </div>
      <div class="wrap-icon-link">
        <i class="fas fa-calendar-alt fa-lg"></i>
        <router-link to="/dentist/appointments">Appointments</router-link>
      </div>
      <div class="wrap-icon-link">
        <i class="fas fa-file-medical fa-lg"></i>
        <router-link to="/dentist/patients">Patients</router-link>
      </div>
      <div class="wrap-icon-link">
        <i class="fas fa-power-off fa-lg"></i>
        <router-link to="/" @click="onLogout">Logout</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
#side-nav {
  height: 100%;
  width: 150px;
  position: fixed;
  top: 55px;
  left: 0;
  background-color: black;
}

#side-nav-content {
  margin-top: 10px;
}

#side-nav a {
  padding: 15px 8px 6px 10px;
  text-decoration: none;
  font-size: 16px;
  color: #818181;
  display: block;
}

#side-nav a:hover {
  color: #f1f1f1;
}

.wrap-icon-link {
  display: flex;
  flex-direction: row;
  justify-content: left;
}

.fas {
  color: #fff;
  margin-top: 20px;
  margin-left: 10px;
}

@media only screen and (max-width: 600px) {
  #side-nav {
    height: 45px;
    width: 100%;
  }
  .wrap-icon-link {
    display: inline-flex;
    justify-content: center;
  }
  .fas {
    margin-top: 5px;
    font-size: 15px;
  }
  #side-nav a {
    padding-top: 2px;
    font-size: 12px;
  }

  #side-nav-content {
    text-align: center;
  }
}
</style>

<script>
import auth from '../auth'
export default {
  methods:{
    onLogout(){
      auth.data().deleteToken();
      this.$router.push({ path: "/" });
    }
  }
};
</script>