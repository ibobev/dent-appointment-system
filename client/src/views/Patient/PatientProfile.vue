<template>
  <div class="container-fluid pt-3">
    <div class="row">
      <div class="col-md-12 col-lg-12 mb-3">
        <GlobalEventsCalendar />
      </div>
      <div class="col-md-12 col-lg-4 mb-3">
        <div class="card account-card shadow rounded-0">
          <div class="card-body">
            <h3 class="card-title mb-3">
              <i class="fas fa-user-alt"></i>
              Account Details
            </h3>
            <p class="card-text"><b>First Name:</b> {{ firstName }}</p>
            <p class="card-text"><b>Last Name:</b> {{ lastName }}</p>
            <p class="card-text"><b>Email:</b> {{ acc_email }}</p>
            <p class="card-text"><b>Rating:</b> {{ rating }}</p>
          </div>
        </div>
      </div>
      
      <div class="col-md-12 col-lg-4 mb-3">
        <EditPersonalData />
      </div>

      <div class="col-md-12 col-lg-4 mb-3">
        <ChangePassword />
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.fas {
  color: #0292f8;
}

.account-card {
  border-top: 4px solid #0292f8;
}
</style>

<script>
import auth from "../../auth";
import axios from "axios";
import ChangePassword from "../../components/ChangePassword.vue";
import EditPersonalData from "../../components/EditPersonalData.vue";
import GlobalEventsCalendar from "../../components/GlobalEventsCalendar.vue";
export default {
  name: "PatientProfile",
  components: {
    ChangePassword,
    EditPersonalData,
    GlobalEventsCalendar
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      acc_email: "",
      rating: "",
    };
  },
  mounted() {
    axios.get("/api/v1/accounts/profile").then(
      (res) => {
        console.log(res.data);
        const { account } = res.data;
        this.firstName = account.first_name;
        this.lastName = account.last_name;
        this.acc_email = account.email;
      },
      (error) => {
        if (error.request) {
          console.log("req");
          console.log(error.request);
          console.log(error.request.status);
          if (error.request.status === 401 || error.request.status === 403) {
            auth.data().deleteToken();
            this.$router.push({ path: "/login" });
          }
        } else if (error.response) {
          console.log("res");
          console.log(error.response);
        } else {
          console.log(error);
        }
      }
    );
  },
  methods: {},
};
</script>
