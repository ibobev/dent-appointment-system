<template>
  <main>
    <h1 class="text-center">Personal Details</h1>
    <div class="container">
      <div class="row">
        <div id="dentist-details" class="col-6">
          <p>First Name: <b>{{ firstName }}</b></p>
          <p>Last Name: <b>{{ lastName }}</b></p>
          <p>Email: <b>{{ email }}</b></p>
          <p>Phone: <b>{{ phone }}</b></p>
          <p>City: <b>{{ city }}</b></p>
          <p>Type: <b>{{ type }}</b></p>
          <p>Description: <b>{{ description }}</b></p>
        </div>

        <div id="update-details" class="col-6"></div>
      </div>
    </div>
  </main>
</template>

<style scoped>
#update-details {
  background-color: #000;
}
</style>


<script>
import auth from "../../auth";
import axios from "axios";

export default {
  name: "Profile",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
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
        this.email = account.email;
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
  
};
</script>