<template>
  <main>
    <div class="container  text-center">
      <div class="d-flex justify-content-evenly" id="main-account-content">
        <div id="account-card" class="card container mb-3 mt-3 shadow rounded-0">
          <i class="fas fa-user-alt fa-2x mt-3"></i>
          <div class="row g-0">
            <div class="col-md-12" id="account-card-details">
              <div class="card-body">
                <h3 class="card-title mb-4">Account Details</h3>
                <p class="card-text"><b>First Name:</b> {{ firstName }}</p>
                <p class="card-text"><b>Last Name:</b> {{ lastName }}</p>
                <p class="card-text"><b>Email:</b> {{ acc_email }}</p>
                <p class="card-text"><b>Rating:</b> {{ rating }}</p>
              </div>
            </div>
          </div>
        </div>
        <EditPersonalData />
        <ChangePassword />
      </div>
    </div>
  </main>
</template>

<style scoped>
p {
  text-align: left;
}

.fas {
  color: #0292f8;
}

#account-card {
  width:390px;
  border-top: 4px solid #0292f8;
}

@media only screen and (max-width: 1401px){
  #main-account-content {
    flex-direction: column;
  }
  #account-card{
    width:390px;
    margin-left:auto;
    margin-right:auto;
  }
}

</style>

<script>
import auth from "../../auth";
import axios from "axios";
import ChangePassword from "../../components/ChangePassword.vue";
import EditPersonalData from "../../components/EditPersonalData.vue";
export default {
  name: "PatientProfile",
  components: {
    ChangePassword,
    EditPersonalData,
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
    axios.get("/api/v1/accounts/dentist-profile").then(
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
    /*axios.get("/api/v1/patients/patient-details").then(
      (res) => {
        console.log(res.data);
        const { dentist } = res.data;
        this.rating = dentist.rating;
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
    );*/
  },
  methods: {},
};
</script>