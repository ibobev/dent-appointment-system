<template>
  <div id="dentist-dashboard">
    <NavigationDentist />
    <router-view />
  </div>
</template>

<style scoped>
main {
  margin-top: 15px;
  margin-left: 155px;
}

@media only screen and (max-width: 600px) {
  main {
    margin-left: 0;
    margin-top: 55px;
  }
}
</style>

<script>
import NavigationDentist from "/src/components/NavigationDentist.vue";

export default {
  name: "DentistDashboard",
  components: {
    NavigationDentist,
  },
};
</script>