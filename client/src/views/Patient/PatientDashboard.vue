<template>
  <div id="patient-dashboard">
    <NavigationPatient />
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
import NavigationPatient from "../../components/NavigationPatient.vue";
export default {
  name: "PatientDashboard",
  components: { NavigationPatient },
};
</script>