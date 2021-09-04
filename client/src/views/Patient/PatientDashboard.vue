<template>
  <div class="container-fluid patient-dashboard-container p-0">
    <div class="row h-100 m-0">
      <!-- Navigation -->
      <div class="col-sm-12 col-md-2 m-0 p-0">
        <NavigationPatient />
      </div>
      <!-- Content -->
      <div class="col-sm-12 col-md-10 p-0">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
@media screen and (min-width: 768px) {
  .patient-dashboard-container {
    min-height: 100vh;
    height: 100vh;
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
