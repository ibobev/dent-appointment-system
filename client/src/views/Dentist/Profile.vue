<template>
  <div class="container text-center mt-3">
    <div class="row">
      <div class="col-md-12 col-lg-4 mb-3">
        <div class="account-card card shadow rounded-0">
          <div class="card-body">
            <h4 class="card-title mb-3">
              <i class="fas fa-user-alt"></i>
              Account Details
            </h4>
            <p class="card-text"><b>First Name:</b> {{ firstName }}</p>
            <p class="card-text"><b>Last Name:</b> {{ lastName }}</p>
            <p class="card-text"><b>Email:</b> {{ acc_email }}</p>
            <p class="card-text"><b>Phone:</b> {{ phone }}</p>
            <p class="card-text"><b>City:</b> {{ city }}</p>
            <p class="card-text"><b>Expertise:</b> {{ type }}</p>
            <p class="card-text"><b>Work Days:</b> {{ work_days }}</p>
            <p class="card-text"><b>Work From:</b> {{ work_from }}</p>
            <p class="card-text"><b>Work To:</b> {{ work_to }}</p>
            <p id="description-content" class="card-text">
              <b>Description:</b> {{ description }}
            </p>
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
      <div class="col-md-12 col-lg-4 mb-3">
        <UpdateDentistDetails />
      </div>
      <div class="col-md-12 col-lg-8 mb-3">
        <UpdateWorkingHours />
      </div> 
      <div class="col-md-12 col-lg-12 mb-3">
        <DentistReview />
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  text-align: left;
}

.fas {
  color: #0292f8;
}

.account-card {
  border-top: 4px solid #0292f8;
  max-height: 310px;
  overflow-y: scroll;
}

@media only screen and (min-width: 1137px) {
  .account-card {
    max-height:283px;
  }
}
@media only screen and (max-width: 1401px) {
  #details-content {
    flex-direction: column;
  }
}

@media only screen and (max-width: 450px) {
  .fas {
    font-size: 18px;
  }

  .far {
    font-size: 18px;
  }

  h3 {
    font-size: 16px;
  }

  p {
    font-size: 12px;
  }

  input {
    height: 33px;
  }
}
</style>


<script>
import auth from "../../auth";
import axios from "axios";
import ChangePassword from "../../components/ChangePassword.vue";
import UpdateDentistDetails from "../../components/UpdateDentistDetails.vue";
import EditPersonalData from "../../components/EditPersonalData.vue";
import DentistReview from "../../components/DentistReview.vue";
import UpdateWorkingHours from "../../components/UpdateWorkingHours.vue";

export default {
  name: "Profile",
  components: {
    ChangePassword,
    UpdateDentistDetails,
    EditPersonalData,
    DentistReview,
    UpdateWorkingHours
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      acc_email: "",
      phone: "",
      city: "",
      type: "",
      description: "",
      work_days: "",
      work_from: "",
      work_to: "",
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
    axios.get("/api/v1/dentists/dentist-details").then(
      (res) => {
        console.log(res.data);
        const { dentist } = res.data;
        this.type = dentist.dentist_type;
        this.city = dentist.city;
        this.phone = dentist.phone;
        this.description = dentist.description;
        this.work_days = dentist.work_days;
        this.work_from = dentist.work_from;
        this.work_to = dentist.work_to;
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
    );
  },
  methods: {},
};
</script>
