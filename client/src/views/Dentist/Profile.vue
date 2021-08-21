<template>
  <main>
    <h1 class="text-center">Profile</h1>
    <p>Name: {{nameStr}}</p>
    <p>Email: {{email}}</p>
  </main>
</template>

<style scoped>
</style>


<script>
import App from '@/App';
import axios from "axios";

export default {
  name: "Profile",
  data() {
    return {
      nameStr: "",
      email: "",
    };
  },
  mounted() {
    axios.get("/api/v1/accounts/dentist").then(
      (res) => {
        console.log(res.data);
        const { dentist } = res.data;
        this.nameStr = dentist.first_name + ' ' + dentist.last_name;
        this.email = dentist.email;
      },
      (error) => {
        if (error.request) {
          console.log("req");
          console.log(error.request);
          console.log(error.request.status);
          if (error.request.status === 401 || error.request.status === 403) {
            App.data().deleteToken();
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