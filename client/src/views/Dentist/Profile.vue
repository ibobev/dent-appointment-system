<template>
  <main>
    <div class="container">
      <div id="account-card" class="card mb-3 shadow">
        <div class="row g-0">
          <!--<div id="img-wrap" class="col-md-5">
            
          </div>-->
          <div class="col-md-5" id="details">
            <div class="card-body">
              <h3 class="card-title">Account Details</h3>
              <p class="card-text"><b>First Name:</b> {{ firstName }}</p>
              <p class="card-text"><b>Last Name:</b> {{ lastName }}</p>
              <p class="card-text"><b>Email:</b> {{ acc_email }}</p>
              <p class="card-text"><b>Phone:</b> {{ phone }}</p>
              <p class="card-text"><b>City:</b> {{ city }}</p>
              <p class="card-text"><b>Type:</b> {{ type }}</p>
              <p id="description-content" class="card-text"><b>Description:</b> {{ description }} </p>
              <p class="card-text"><b>Rating:</b> {{ rating }}</p>            
            </div>
          </div>
        </div>
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

#account-card{
  margin-right: auto;
  margin-left:auto;
  width:97%;
  border-top:4px solid #0292f8;
}


@media only screen and (max-width: 1450px) {
  #details-content {
    flex-direction: column;
  }
}
@media only screen and (max-width: 450px) {
  #account-details {
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

export default {
  name: "Profile",
  components: {
    ChangePassword,
    UpdateDentistDetails,
    EditPersonalData,
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
      rating: ""
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
  },
  methods: {},
};
</script>
