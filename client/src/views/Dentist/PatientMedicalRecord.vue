<template>
  <div class="container mt-4 mb-3">
    <div class="col-sm-12 col-lg-8 mx-auto">
      <div class="card shadow border-0">
        <div class="card-body" id="card-top-border">
          <h2 class="text-center mb-3 card-title">Medical Record</h2>
          <h3>Patient</h3>
          <div class="break-line mb-3"></div>
          <p class="card-text"><b>First Name: </b>{{ this.firstName }}</p>
          <p class="card-text"><b>Last Name: </b>{{ this.lastName }}</p>
          <div class="break-line mb-3"></div>
          <h3>Details</h3>
          <div class="break-line mb-3"></div>
          <div v-for="record of details" v-bind:key="record.id">
            <p class="card-text"><b>Appointment ID:</b> {{record.appointment_id}}</p>
            <p class="card-text"><b>Appointment Date:</b> {{record.appointment_date}}</p>
            <p class="card-text"><b>Details:</b> {{record.details}}</p>
            <div class="break-line mb-3"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#card-top-border {
  border-top: 4px solid #0292f8;
}

.break-line {
  width: 100%;
  border-bottom: 3px dashed #0292f8;
}
</style>

<script>
import axios from "axios";
export default {
  name: "PatientMedicalRecord",
  data() {
    return {
      patient_id: this.$route.params.p_id,
      details: [],
      firstName: "",
      lastName: "",
    };
  },
  async mounted() {
    try {
      const res = await axios.get(`/api/v1/medical-records/${this.patient_id}`);
      this.details = res.data.medDetails;
      this.parseAppointmentDate();
      this.firstName = this.details[0].first_name;
      this.lastName = this.details[0].last_name;
      console.log(this.details);
    } catch (error) {
      console.log(error.toJSON());
    }
  },
  methods: {
    parseAppointmentDate() {
      this.details.map((appointment) => {
        let correct_date = new Date(appointment.appointment_date);
        correct_date = correct_date.toLocaleDateString();
        appointment.appointment_date = correct_date;
      });
      return this.details;
    },
  },
};
</script>