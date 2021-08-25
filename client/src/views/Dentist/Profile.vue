<template>
  <main>
    <h1 class="text-center mb-3">Profile</h1>
    <div class="container">
      <div class="d-flex justify-content-evenly" id="details-content">
        <div
          id="account-details"
          class="container mt-3 mb-3 shadow pt-2 pb-3 text-center"
        >
          <i class="fas fa-user-check fa-2x mt-2 mb-3"></i>
          <h3>Account Details</h3>
          <p>
            First Name: <b>{{ firstName }}</b>
          </p>
          <p>
            Last Name: <b>{{ lastName }}</b>
          </p>
          <p>
            Email: <b>{{ acc_email }}</b>
          </p>
          <p>
            Phone: <b>{{ phone }}</b>
          </p>
          <p>
            City: <b>{{ city }}</b>
          </p>
          <p>
            Type: <b>{{ type }}</b>
          </p>
          <p>
            Description: <b>{{ description }}</b>
          </p>
        </div>
        <UpdateDentistDetails />
      </div>
      <div class="d-flex justify-content-evenly" id="details-content">
        <EditPersonalData />
        <ChangePassword />
      </div>
    </div>
  </main>
</template>

<style>
#account-details {
  border-top: 4px solid #0292f8;
  background-color: #fff;
  width: 390px;
}
p{
  text-align: left;
}

.fas {
  color: #0292f8;
}

@media only screen and (max-width: 1450px) {
  #details-content {
    flex-direction: column;
  }
}
@media only screen and (max-width: 450px){
  #account-details{
    width: 320px;
  }

  .fas{
    font-size:18px;
  }

  .far{
    font-size:18px;
  }

  h3{
    font-size:16px;
  }

  p{
    font-size:12px;
  }

  input{
    height:33px;
  }

  #dentist-type{
    height:33px;
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
