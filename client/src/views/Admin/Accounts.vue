<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-4">
        <h1>All accounts</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Registered</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="account in accounts" :key="account.id">
              <td>{{ account.id }}</td>
              <td>{{ account.first_name + ' ' + account.last_name }}</td>
              <td>{{ account.email }}</td>
              <td>{{ new Date(account.created_at) }}</td>
              <td>
                <span
                  class="badge"
                  v-bind:class="[account.status.trim() === 'Active' ? 'bg-primary' : 'bg-danger']">
                  {{ account.status }}
                </span>
              </td>
              <td>
                <button class="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
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
      accounts: []
    };
  },
  mounted() {
    axios
      .get('/api/v1/admins/accounts')
      .then(res => {
        console.log(res.data);
        this.accounts = res.data.accounts;
      }, error => {
        console.log(error.toJSON());
      });
  }
}
</script>
