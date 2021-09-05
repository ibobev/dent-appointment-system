<template>
  <div class="container-fluid patient-dashboard-container p-0">
    <div class="row h-100 m-0">
      <!-- Navigation -->
      <div class="col-sm-12 col-md-2 m-0 p-0 dentist-nav">
        <NavigationDentist />
      </div>
      <!-- Content -->
      <div class="col-sm-12 col-md-10 p-0">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 991px) and (max-width: 2600px)
{
  .dentist-nav{
  min-height: 100vh;
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