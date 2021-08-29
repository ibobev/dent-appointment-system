<template>
  <main>
    <div class="container text-center">
      <div class="d-flex justify-content-evenly" id="main-account-content">
        <div id="account-card" class="card mb-3 shadow rounded-0">
          <i class="fas fa-user-alt fa-2x mt-3"></i>
          <div class="row g-0">
            <div class="col-md-12" id="account-card-details">
              <div class="card-body">
                <h3 class="card-title">Account Details</h3>
                <p class="card-text"><b>First Name:</b> {{ firstName }}</p>
                <p class="card-text"><b>Last Name:</b> {{ lastName }}</p>
                <p class="card-text"><b>Email:</b> {{ acc_email }}</p>
                <p class="card-text"><b>Phone:</b> {{ phone }}</p>
                <p class="card-text"><b>City:</b> {{ city }}</p>
                <p class="card-text"><b>Expertise:</b> {{ type }}</p>
                <p id="description-content" class="card-text">
                  <b>Description:</b> {{ description }}
                </p>
                <p class="card-text"><b>Rating:</b> {{ rating }}</p>
              </div>
            </div>
          </div>
        </div>
        <DentistReview />
      </div>
      <div class="d-flex justify-content-evenly" id="details-content">
        <UpdateDentistDetails />
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
  width:47%;
  border-top: 4px solid #0292f8;
  margin-left:20px;
  margin-right:20px;
  overflow-y: scroll;
  max-height: 460px;
}

@media only screen and (max-width: 1450px) {
  #account-card {
    width:49%;
    margin-right:auto;
    margin-left:10px;
    
  }
}

@media only screen and (max-width: 1401px){
  #details-content {
    flex-direction: column;
  }
  #main-account-content {
    flex-direction: column;
  }
  #account-card{
    width:390px;
    margin-left:auto;
    margin-right:auto;
  }

}

@media only screen and (max-width: 450px) {
  #account-card {
    width: 320px;
  }

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

export default {
  name: "Profile",
  components: {
    ChangePassword,
    UpdateDentistDetails,
    EditPersonalData,
    DentistReview
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
