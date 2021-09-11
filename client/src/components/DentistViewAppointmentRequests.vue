<template>
  <div id="patient-appointment-requests">
    <h2>Patient Appointment Requests</h2>
    <div class="row mt-4">
      <div
        class="col-sm-12 col-md-4 mb-4"
        v-for="patient of pendingDetails"
        v-bind:key="patient.id"
      >
        <div class="card shadow border-0">
          <div class="card-body" id="card-top-border">
            <h4 class="card-text">
              {{ patient.first_name }} {{ patient.last_name }}
            </h4>
            <p>ID: {{ patient.patient_id }}</p>
            <p>Email: {{ patient.email }}</p>
            <p>Appointment: {{ patient.appointment_date }}</p>
            <p>From: {{ patient.start_time }}</p>
            <p>To: {{ patient.end_time }}</p>
            <p>Status: {{ patient.status }}</p>
          </div>
          <div class="row mb-2">
            <div class="col">
              <button
                class="btn btn-success mb-2"
                v-on:click="acceptAppointment(patient.patient_id, patient.id)"
              >
                Accept
              </button>
            </div>
            <div class="col">
              <button
                class="btn btn-danger"
                v-on:click="rejectAppointment(patient.patient_id, patient.id)"
              >
                Reject
              </button>
            </div>
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
</style>

<script>
import axios from "axios";
export default {
  name: "DentistViewAppointmentRequests",
  data() {
    return {
      pendingDetails: [],
    };
  },
  methods: {
    parsePatientAppointmentDate() {
      this.pendingDetails.map((patient) => {
        let correct_date = new Date(patient.appointment_date);
        correct_date = correct_date.toLocaleDateString();
        patient.appointment_date = correct_date;
      });
      return this.pendingDetails;
    },
    acceptAppointment(patient_id, a_id) {
      try {
        axios.put(`/api/v1/appointments/${a_id}/${patient_id}`);
      } catch (error) {
        console.log(error);
      }
      window.location.reload();
    },
    rejectAppointment(patient_id, a_id) {
      console.log(a_id);
      try {
        axios.put(`/api/v1/appointments/reject/${a_id}/${patient_id}`);
      } catch (error) {
        console.log(error);
      }
      window.location.reload();
    },
  },
  async mounted() {
    try {
      const res = await axios.get("/api/v1/appointments/pending");
      this.pendingDetails = res.data.pending;
      this.parsePatientAppointmentDate();
      console.log(this.pendingDetails);
    } catch (error) {
      console.log(error.toJSON());
    }
  },
};
</script>