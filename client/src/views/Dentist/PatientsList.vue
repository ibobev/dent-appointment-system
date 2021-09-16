<template>
  <div class="contaienr mt-4">
    <div class="col-md-11 col-lg-11 mb-3 mx-auto">
      <table>
        <tr class="text-center">
          <th>Patient ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Medical Record</th>
        </tr>
        <tr v-for="patient of patients" v-bind:key="patient.id" class="text-center">
          <td>{{ patient.patient_id }}</td>
          <td>{{ patient.first_name }}</td>
          <td>{{ patient.last_name }}</td>
          <td>
            <router-link
              :to="'/dentist/patients/' + patient.patient_id"
              class="btn"
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
th {
  background-color: #0292f8;
  color: #fff;
  
}
tr{
  background: #fff;
  border-bottom:10px solid  #f2f5f7f8;
  height:60px;
}

td {
  border-bottom:10px solid  #f2f5f7f8;
  height:80px;
}

.btn {
  background-color: #0292f8;
  color:#fff;
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