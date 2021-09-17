<template>
  <div class="contaienr mt-4">
    <div class="col-md-11 col-lg-11 mb-3 mx-auto">
      <table>
        <tr class="text-center">
          <th>Patient ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Medical Record</th>
          <th width="10%"></th>
        </tr>
        <tr v-for="patient of patients" v-bind:key="patient.id" class="text-center">
          <td>{{ patient.patient_id }}</td>
          <td>{{ patient.first_name }}</td>
          <td>{{ patient.last_name }}</td>
          <td>
            <router-link
              :to="'/dentist/patients/' + patient.patient_id"
              class="btn custom-primary"
            >
              View record
            </router-link>
          </td>
          <td col="1">
            <button type="button" class="btn btn-block btn-secondary" @click="currentBlacklistPatient = patient.patient_id; showBlacklistModal = true">
              Blacklist
            </button>
          </td>
        </tr>
      </table>
    </div>

      <!-- Blacklist modal -->
    <div class="modal fade" v-bind:class="{'d-block show': showBlacklistModal}" style="background: rgba(0,0,0,0.35)">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Blackist reason</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="showBlacklistModal = false; blacklistReason = ''; currentBlacklistPatient = null;"></button>
          </div>

          <div class="modal-body">
            <label for="blacklistReason">Reason for the blacklist</label>
            <textarea class="form-control" id="blacklistReason" v-model="blacklistReason"></textarea>
            <p class="text-muted">
              <small>By blacklisting, you will no longer receive requests from this patient.</small>
            </p>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="showBlacklistModal = false; blacklistReason = ''; currentBlacklistPatient = null;"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              v-bind:class="{'disabled': !blacklistReason.length}"
              @click="blacklistPatient"
            >
              Send
            </button>
          </div>

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
tr{
  background: #fff;
  border-bottom:10px solid  #f2f5f7f8;
  height:60px;
}

td {
  border-bottom:10px solid  #f2f5f7f8;
  height:80px;
}

.btn.custom-primary {
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
      showBlacklistModal: false,
      currentBlacklistPatient: null,
      blacklistReason: '',
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
  methods: {
    blacklistPatient: async function() {
      try {
        await axios.post('/api/v1/blacklist/patient', { patientId: this.currentBlacklistPatient, reason: this.blacklistReason });

        this.patients = this.patients.filter(
          patient => parseInt(patient.patient_id) !== parseInt(this.currentBlacklistPatient)
        );
      } catch (error) {
        console.log(error.toJSON());
      }

      this.blacklistReason = '';
      this.showBlacklistModal = false;
      this.currentBlacklistPatient = null;
    },
  },
};
</script>
