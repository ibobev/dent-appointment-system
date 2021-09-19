<template>
  <div>
    <!-- Title -->
    <div class="row">
      <div class="col-lg-4 offset-lg-4">
        <h1 class="text-center">Register new admin</h1>
      </div>
    </div>

    <!-- Error alert -->
    <div class="row" v-if="error.length">
      <div class="col-lg-4 offset-lg-4">
        <div class="alert alert-danger">{{ error }}</div>
      </div>
    </div>

    <!-- Form -->
    <div class="row my-3">

      <div class="col-lg-4 offset-lg-4">
        <form @submit.prevent="onRegister()">
          <div class="card">
            <div class="card-body">

              <div class="mb-3">
                <label for="firstName">First name</label>
                <input type="text" id="firstName" class="form-control" v-model="firstName" required />
              </div>

              <div class="mb-3">
                <label for="lastName">Last name</label>
                <input type="text" id="lastName" class="form-control" v-model="lastName" required />
              </div>

              <div class="mb-3">
                <label for="email">Email</label>
                <input type="email" id="email" class="form-control" v-model="email" required />
              </div>

              <div class="mb-3">
                <label for="password">Password</label>
                <input type="password" id="password" class="form-control" v-model="password" required />
              </div>

              <input type="submit" class="btn btn-primary" value="Register" />

            </div>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<style scoped>
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      error: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  },
  methods: {
    onRegister: async function () {
      const reqBody = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      };

      try {
        await axios.post('/api/v1/admins', reqBody);
        this.$router.push({ path: "/admin/admins" });
      } catch (error) {
        console.log(error.toJSON());
        if (error.response) {
          this.error = error.response.data.statusmsg;
        }
      }
    },
  },
}
</script>
