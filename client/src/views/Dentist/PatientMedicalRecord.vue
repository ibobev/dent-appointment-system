<template>
  <div class="container mt-4 mb-3">
    <div class="col-sm-12 col-lg-8 mx-auto">
      <div class="card shadow rounded-0">
        <div class="card-header">
          <h2 class="text-center mt-2">Medical Record</h2>
        </div>
        <div class="card-body p-0">
          <table class="text-center">
            <tr>
              <th>Patient ID</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
            <tr>
              <td>{{ this.patient_id }}</td>
              <td>{{ this.firstName }}</td>
              <td>{{ this.lastName }}</td>
            </tr>
          </table>

          <h2 class="text-center mt-2 py-3" id="header-border">
            Appointment Details
          </h2>
          <table class="text-center">
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Details</th>
            </tr>
            <tr v-for="record of details" v-bind:key="record.id">
              <td>{{ record.appointment_id }}</td>
              <td>{{ record.appointment_date }}</td>
              <td>{{ record.details }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
table {
  width: 100%;
}
th {
  background-color: #0292f8;
  color: #fff;
}
tr {
  background: #fff;
  height: 50px;
}

td {
  background: #fff;
  height: 60px;
}

#header-border {
  border-top: 15px solid #f2f5f7f8;
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