<template>
  <div id="complete-appointment-container" class="container">
    <h2 class="text-center mt-4 mb-4">Complete Appointment</h2>
    <div class="row">
      <div class="col-sm-12 col-lg-7 mb-4 mx-auto">
        <CompleteAppointmentView />
      </div>
      <div class="col-sm-12 col-lg-7 mb-3 mx-auto">
        <CompleteAppointmentForm />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
import CompleteAppointmentView from "../../components/CompleteAppointmentView.vue";
import CompleteAppointmentForm from "../../components/CompleteAppointmentForm.vue";
export default {
  name: "CompleteAppointment",
  data() {
    return {
      appointment_id: this.$route.params.a_id,
      patient_id: this.$route.params.p_id,
    };
  },
  components: {
    CompleteAppointmentView,
    CompleteAppointmentForm,
  },
};
</script>