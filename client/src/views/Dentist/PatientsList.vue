<template>
  <div class="contaienr text-center">
    <h2 class="mt-4 mb-4">Patients</h2>
    <div class="col-md-12 col-lg-12 mb-3">
      <table>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Medical Record</th>
        </tr>
        <tr v-for="patient of patients" v-bind:key="patient.id">
          <td>{{ patient.patient_id }}</td>
          <td>{{ patient.first_name }}</td>
          <td>{{ patient.last_name }}</td>
          <td>
          <router-link
            :to="'/dentist/patients/' + patient.patient_id"
            class="btn w-100"
          >
            Click to View
          </router-link>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
table {
  width: 100%;
}
th{
    border: 2px solid #000;
    background-color: #333232;
    color:#fff;
}

tr:nth-of-type(even) { 
    background: #9bd0f7; 
}
tr:nth-of-type(odd) { 
    background: #f2f2f2;; 
}

td{
    border: 2px solid #000;
}
</style>


<script>
import axios from "axios";
export default {
  name: "PatientsList",
  data() {
    return {
      patients: [],
    };
  },
  async mounted() {
    try {
      const res = await axios.get("/api/v1/medical-records/");
      this.patients = res.data.patientList;
      console.log(this.patients);
    } catch (error) {
      console.log(error.toJSON());
    }
  },
};
</script>