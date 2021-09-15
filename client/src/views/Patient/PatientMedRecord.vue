<template>
 <div class="contaienr mt-5">
    <div class="col-md-11 col-lg-11 mb-3 mx-auto">
      <table>
        <tr class="text-center">
          <th>Dentist ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Medical Record</th>
        </tr>
        <tr v-for="dentist of dentists" v-bind:key="dentist.id" class="text-center"> 
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