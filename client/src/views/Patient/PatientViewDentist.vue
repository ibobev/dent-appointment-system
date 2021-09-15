<template>
  <div id="view-dentist-content" class="container mt-3">
    <div class="row">
      <div class="col-md-12 col-lg-4 mb-3">
        <ViewDentistDetails />
      </div>
      <div class="col-md-12 col-lg-8 mb-3">
        <DentistReview />
      </div>
      <div class="col-md-12 col-lg-7 mb-3">
        <AppointmentCalendar />
      </div>
      <div class="col-md-12 col-lg-5 mb-3">
        <PatientRequestAppointment />
      </div>
    </div>
  </div>
</template>

<style scoped>
#temp-content{
  border-top: 4px solid #0292f8;
  height:400px;
}

</style>

<script>
import ViewDentistDetails from "../../components/ViewDentistDetails.vue";
import AppointmentCalendar from "../../components/AppointmentCalendar.vue";
import PatientRequestAppointment from "../../components/PatientRequestAppointment.vue";
import DentistReview from "../../components/DentistReview.vue";
export default {
  name: "PatientViewDentist",
  components: {
    ViewDentistDetails,
    AppointmentCalendar,
    PatientRequestAppointment,
    DentistReview
  },
  data() {
    return {
      dentist_id : this.$route.params.id
    };
  },
};
</script>