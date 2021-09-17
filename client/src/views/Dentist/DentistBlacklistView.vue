<template>
  <div class="container">
    <div class="row mt-3">
      <div class="col-sm-12">
        <h2>Blacklisted patients</h2>
      </div>
    </div>

    <div class="row my-3">
      <div class="col-sm-12">
        <div class="input-group">
          <span class="input-group-text">
            <i class="fas fa-search"></i>
          </span>
          <input type="text" class="form-control" placeholder="Search..." v-model="search" />
          <button
            type="button"
            class="btn btn-secondary"
            v-if="search.length"
            @click="search = ''"
          >
            X
          </button>
        </div> 
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <table>
          <tr class="text-center">
            <th>Patient ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Blacklisted on</th>
            <th>Medical Record</th>
            <th width="10%"></th>
          </tr>
          <tr class="text-center" v-for="patient of filteredPatients" v-bind:key="patient.patient_id">
            <td>{{ patient.patient_id }}</td>
            <td>{{ patient.name }}</td>
            <td>{{ patient.email }}</td>
            <td>{{ patient.blacklistDate }}</td>
            <td>
              <router-link
                :to="'/dentist/patients/' + patient.patient_id"
                class="btn custom-primary"
              >
                View record
              </router-link>
            </td>
            <td>
              <button type="button" class="btn btn-block btn-secondary" @click="removeFromBlacklist(patient.patient_id)">
                Un-Blacklist
              </button>
            </td>
          </tr>
        </table>
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
  border-bottom: 10px solid #f2f5f7f8;
  height: 60px;
}

td {
  border-bottom: 10px solid #f2f5f7f8;
  height: 80px;
}

.btn.custom-primary {
  background-color: #0292f8;
  color:#fff;
}
</style>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      search: '',
      patients: [],
      filteredPatients: [],
    }
  },
  async mounted() {
    try {
      const reqResult = await axios.get('/api/v1/dentists/blacklist');

      this.patients = reqResult.data.patients.map(patient => {
        patient.name = `${patient.first_name} ${patient.last_name}`; 

        const blacklistDate = (new Date(patient.blacklist_date)).toUTCString();
        patient.blacklistDate = blacklistDate.substring(0, blacklistDate.lastIndexOf(' '));

        return patient;
      });

      this.filteredPatients = this.patients;
    } catch (error) {
      console.log(error.toJSON());
    } 
  },
  watch: {
    search: function (newSearchTerm) {
      if (!newSearchTerm.length) {
        this.filteredPatients = this.patients;
        return;
      }

      this.filteredPatients = this.patients.filter(patient => {
        return patient.name.toLocaleLowerCase().includes(newSearchTerm)
          || patient.email.toLocaleLowerCase().includes(newSearchTerm)
          || (('' + patient.patient_id) === newSearchTerm);
      });
    },
  },
  methods: {
    removeFromBlacklist: async function (patientId) {
      if (!confirm('Are you sure?')) {
        return;
      }
      try {
        await axios.delete(`/api/v1/dentists/blacklist/${patientId}`);

        this.filteredPatients = this.filteredPatients.filter(
          patient => patient.patient_id !== patientId
        );
      } catch (error) {
        console.log(error.toJSON());
      }
    },
  },
}
</script>
