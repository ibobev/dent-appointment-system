<template>
  <div class="account-card card shadow rounded-0">
    <div class="card-body">
      <h4 class="card-title mb-3 text-center">
        <i class="fas fa-user-alt"></i>
        Dentist Details
      </h4>
      <p class="card-text"><b>First Name:</b> {{ dentistDetails.first_name }}</p>
      <p class="card-text"><b>Last Name:</b> {{ dentistDetails.last_name }}</p>
      <p class="card-text"><b>Email:</b> {{ dentistDetails.email }}</p>
      <p class="card-text"><b>Phone:</b> {{ dentistDetails.phone }}</p>
      <p class="card-text"><b>City:</b> {{ dentistDetails.city }}</p>
      <p class="card-text"><b>Expertise:</b> {{ dentistDetails.dentist_type }}</p>
      <p class="card-text"><b>Work Days:</b> {{ dentistDetails.work_days }}</p>
      <p class="card-text"><b>Work From:</b> {{ dentistDetails.work_from }}</p>
      <p class="card-text"><b>Work To:</b> {{ dentistDetails.work_to  }}</p>
      <p id="description-content" class="card-text">
        <b>Description:</b> {{ dentistDetails.description }}
      </p>
      <p class="card-text"><b>Rating:</b> {{ dentistDetails.rating }}</p>
    </div>
  </div>
</template>

<style scoped>

.account-card {
  border-top: 4px solid #0292f8;
  height: 455px;
  overflow-y:scroll;
}
.fas {
  color: #0292f8;
}
</style>

<script>
import axios from "axios";
export default {
  name: "ViewDentistDetails",
  data() {
    return {
      dentist_id: this.$route.params.id,
      dentistDetails: []
    };
  },
  mounted() {
    axios.get(`/api/v1/dentists/details/${this.dentist_id}`).then(
      (res) => {
        this.dentistDetails  = res.data.dentistDetails;
        console.log(this.dentistDetails);
      },
      (error) => {
        if (error.request) {
          console.log(error.request);
          console.log(error.request.status);
        } else if (error.response) {
          console.log(error.response);
        } else {
          console.log(error);
        }
      }
    );
  },
};
</script>