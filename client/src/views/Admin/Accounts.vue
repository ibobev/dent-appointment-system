<template>
  <div>
    <div class="row">
      <div class="col-sm-12 col-md-4 ps-0">
        <h1>All accounts</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 px-0">
        <table class="table table-striped border">
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
              <td>{{ account.name }}</td>
              <td>{{ account.email }}</td>
              <td>{{ account.creationDate }}</td>
              <td>
                <span
                  class="badge"
                  v-bind:class="[account.status.trim() === 'Active' ? 'bg-primary' : 'bg-danger']">
                  {{ account.status }}
                </span>
              </td>
              <td>
                <div class="dropdown">
                  <button class="btn btn-outline-primary btn-sm dropdown-toggle" type="button" id="accountOptionsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fas fa-cog"></i>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="accountOptionsDropdown">
                    <li>
                      <a class="dropdown-item" href="#" @click="suspendAccount(account.id)">
                        <i class="far fa-hand-paper"></i>&nbsp;
                        Suspend
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" @click="unsuspendAccount(account.id)">
                        <i class="fas fa-hand-sparkles"></i>
                        Unsuspend
                      </a>
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                      <a class="dropdown-item text-danger" href="#">
                        <i class="fas fa-trash-alt"></i>&nbsp;
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
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

        this.accounts = this.accounts.map(account => {
          account.name = `${account.first_name} ${account.last_name}`;
          const creationDate = (new Date(account.created_at)).toUTCString();
          account.creationDate = creationDate.substring(0, creationDate.lastIndexOf(' '));

          return account;
        });
      }, error => {
        console.log(error.toJSON());
      });
  },
  methods: {
    suspendAccount(accountId) {
      console.log(`suspend: ${accountId}`);
      axios
        .post('/api/v1/admins/accounts/suspend', { accountId })
        .then(res => {
          console.log(res.data);
          const suspendedAccount = this.accounts.find(account => account.id === accountId);
          if (suspendedAccount) {
            suspendedAccount.status = 'Suspended';
          }
        }, error => {
          console.lg(error);
          // TODO: Display error
        });
    },
    unsuspendAccount(accountId) {
      console.log(`unsuspend: ${accountId}`);
      axios
        .post('/api/v1/admins/accounts/unsuspend', { accountId })
        .then(res => {
          console.log(res.data);
          const suspendedAccount = this.accounts.find(account => account.id === accountId);
          if (suspendedAccount) {
            suspendedAccount.status = 'Active';
          }
        }, error => {
          console.lg(error);
          // TODO: Display error
        });
    }
  }
}
</script>
