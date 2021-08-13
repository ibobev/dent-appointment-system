<template>
  <div class="row mt-4" v-if="error">
    <div class="col-6 offset-md-3">
      <div class="alert alert-danger">{{error}}</div>
    </div>
  </div>
  <div id="login-page" class="container mt-5 shadow">
    <i class="fas fa-user-lock fa-3x mt-2"></i>
    <h3 class="mt-3 mb-4">Login</h3>
    <form @submit.prevent="onLoginSubmit">
      <div class="form-group mx-auto">
        <div class="input-group mb-3">
          <i class="far fa-envelope fa-3x mt-1"></i>
        <input
          type="email"
          class="form-control mt-2 mb-3"
          id="email"
          placeholder="Enter email"
          required
          v-model="email"
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
          v-model="password"
        />
        </div>
      </div>
      <button type="submit" class="btn mt-3 mb-2">Login</button>
    </form>
  </div>
</template>

<style scoped>
#login-page{
  padding-top:10px;
  padding-bottom:10px;
  margin-bottom: 75px;
  background-color: #fff;
  width:400px;
  border-top: 4px solid #0292f8;
  border-radius:4%;
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
#email{
  margin-right:15px;
}
#password{
  margin-right:15px;
}
button{
  background-color: #0292f8;
  color:#fff;
  width:50%;
}

</style>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      error: '',
      email: '',
      password: '',
    }
  },
  methods: {
    onLoginSubmit() {
      axios
        .post('/api/v1/accounts/login', { email: this.email, password: this.password })
        .then(res => {
          const token = res.data.token;
          document.cookie = `_token=${token};samesite=lax`;
          console.log(token);
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
  }
}

</script>
