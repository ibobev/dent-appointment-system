<template>
  <div id="complete-appointment-container">
    <h2 class="text-center mt-4">Complete Appointment</h2>
    
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  name: "CompleteAppointment",
  data() {
    return {
      appointment_id: this.$route.params.a_id,
      patient_id: this.$route.params.p_id
    };
  },
};
</script>