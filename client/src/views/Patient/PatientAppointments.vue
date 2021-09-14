<template>
  <div class="container">
    <h2 class="text-center mt-3">Appointments</h2>
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