<template>
 <div class="contaienr">
    <h2 class="text-center mt-4 mb-4">Your Dentists</h2>
    <div class="col-md-11 col-lg-11 mb-3 mx-auto">
      <table>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Medical Record</th>
        </tr>
        <tr v-for="dentist of dentists" v-bind:key="dentist.id">
          <td>{{ dentist.dentist_id }}</td>
          <td>{{ dentist.first_name }}</td>
          <td>{{ dentist.last_name }}</td>
          <td>
            <router-link
              :to="'/patient/medical-record/' + dentist.dentist_id"
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
th {
  border: 2px solid #000;
  background-color: #333232;
  color: #fff;
}

tr:nth-of-type(even) {
  background: #E3F2FD;
}
tr:nth-of-type(odd) {
  background: #90CAF9;
}

td {
  border: 2px solid #000;
}
</style>

<script>
import axios from "axios";
export default {
  name: "PatientsList",
  data() {
    return {
      dentists: [],
    };
  },
  async mounted() {
    try {
      const res = await axios.get("/api/v1/medical-records/dentists");
      this.dentists = res.data.dentistList;
      console.log(this.dentists);
    } catch (error) {
      console.log(error.toJSON());
    }
  },
};
</script>