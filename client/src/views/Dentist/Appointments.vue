<template>
  <div class="container mt-3 text-center">
    <h2>Appointments Calendar</h2>
    <div class="col-md-12 col-lg-12 mb-5">
      <DentistAppointmentCalendar />
    </div>
    <div class="col-md-12 col-lg-12 mb-3">
      <DentistViewAppointmentRequests />
    </div>
  </div>
</template>

<style scoped>

</style>


<script>

import DentistViewAppointmentRequests from "../../components/DentistViewAppointmentRequests.vue";
import DentistAppointmentCalendar from "../../components/DentistAppointmentCalendar.vue";

export default {
  name: "Appointments",
  components: {
    DentistAppointmentCalendar,
    DentistViewAppointmentRequests
  },
  
};
</script>