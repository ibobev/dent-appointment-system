<template>
  <div class="row mt-4" v-if="error">
    <div class="col-6 offset-md-3">
      <div class="alert alert-danger">{{error}}</div>
    </div>
  </div>
  <div id="register-page" class="container mt-3 shadow">
    <i class="fas fa-user-edit fa-3x mt-2"></i>
    <h3 class="mt-3 mb-4">Register</h3>
    <form @submit.prevent="onRegisterSubmit">

      <div class="form-group mx-auto">
        <div class="input-group mb-3">
          <i class="fas fa-id-card fa-3x mt-1"></i>
          <select class="form-control" id="roles" name="role-list" v-model="account.role">
            <option value="" selected disabled hidden>Select Account Type</option>
            <option value="2">Dentist</option>
            <option value="3">Patient</option>
          </select>
        </div>
      </div>
      <div class="form-group mx-auto">
        <div class="input-group mb-3">
          <i class="fas fa-pen fa-3x mt-1"></i>
          <input
            type="text"
            class="form-control mt-2 mb-3"
            id="first-name"
            placeholder="First name"
            required
            v-model="account.firstName"
          />
          <input
            type="text"
            class="form-control mt-2 mb-3"
            id="last-name"
            placeholder="Last name"
            required
            v-model="account.lastName"
          />
        </div>
      </div>
      <div class="form-group mx-auto">
        <div class="input-group mb-3">
          <i class="far fa-envelope fa-3x mt-1"></i>
          <input
            type="email"
            class="form-control mt-2 mb-3"
            id="email"
            placeholder="Enter email"
            required
            v-model="account.email"
          />
        </div>
      </div>
      <div class="form-group mx-auto">
        <div class="input-group mb-3">
          <i class="fas fa-fingerprint fa-3x mt-1"></i>
          <input
            type="password"
            class="form-control mt-2 mb-3"
            id="password"
            placeholder="Password"
            required
            v-model="account.password"
          />
          <input
            type="password"
            class="form-control mt-2 mb-3"
            id="password-repeat"
            placeholder="Repeat Password"
            required
            v-model="rePassword"
          />
        </div>
      </div>
      <button type="submit" class="btn mt-3 mb-2">Register</button>
    </form>
  </div>
</template>

<style scoped>
#register-page {
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 75px;
  background-color: #fff;
  width: 400px;
  border-top: 4px solid #0292f8;
  border-radius: 4%;
}
button {
  background-color: #0292f8;
  color: #fff;
  width: 50%;
}
.far{
  color:#0292f8;
  margin-right:10px;
  margin-left:10px;
}
.fas{
  color:#0292f8;
  margin-right:10px;
  margin-left:10px;
}

#first-name{
    margin-right:10px;
}

#password{
    margin-right:10px;
}

#roles{
  height:40px;
  margin-top:8px;
}
</style>


<script>
import axios from 'axios';

export default {
  name: "Register",
  data() {
    return {
      type: '',
      error: '',
      rePassword: '',
      account: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 3,
      },
    };
  },
  mounted() {
    const accountType = this.$route.params.type;
    if (accountType) {
      this.account.role = (accountType === 'patient') ? 3 : 2;
    }
  },
  methods: {
    onRegisterSubmit() {
      if (this.rePassword !== this.account.password) {
        return this.error = 'Passwords do not match!';
      }

      axios
        .post('/api/v1/accounts', this.account)
        .then(res => {
          console.log(res.data);
          this.$router.push({ path: '/login' });
        }, error => {
          if (error.response) {
            console.log(error.response);
            this.error = error.response.data.statusmsg;
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log(error);
          }
        });
    }
  },
};
</script>
