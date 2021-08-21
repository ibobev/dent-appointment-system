<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <div class="card my-4">
          <div class="card-body">
            <h3>Login</h3>
            <form @submit.prevent="onLogin">
              <div class="mb-3">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  required
                  v-model="email"
                />
              </div>
              <div class="mb-3">
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  required
                  v-model="password"
                />
              </div>
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    onLogin() {
      axios
        .post("/api/v1/admin/login", {
          email: this.email,
          password: this.password,
        })
        .then(
          (res) => {
            const token = res.data.token;
            document.cookie = `a_token=${token}`;
          },
          (error) => {
            if (error.response) {
              this.error = error.response.data.statusmsg;
            } else if (error.request) {
              console.error(error.request.data);
            } else {
              console.error(error);
            }
          }
        );
    },
  },
};
</script>

<style>
</style>