<template>
  <div class="container">
    <h1 class="text-center mt-2">Appointments</h1>
    <div class="row">
      <div class="col-sm-12 col-lg-12 mb-4">
        <PatientViewAppointments />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
import PatientViewAppointments from "../../components/PatientViewAppointments.vue"
export default {
  name: "PatientAppointments",
  components: {
    PatientViewAppointments
  }
};
</script>