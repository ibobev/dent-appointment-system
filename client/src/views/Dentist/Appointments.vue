<template>
  <div class="container mt-4">
    <div class="col-md-12 col-lg-9 mb-5 mx-auto">
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