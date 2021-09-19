<template>
  <div>

    <div class="row">
      <div class="col-sm-12 col-md-4 ps-0">
        <h1>All accounts</h1>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-12 px-0">
        <div class="input-group">
          <span class="input-group-text">
            <i class="fas fa-search"></i>
          </span>
          <input type="text" class="form-control" v-model="search" />
        </div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-sm-12 px-0">
        <div class="btn-group" role="group">
          <input type="radio" class="btn-check" name="btnfilter" id="all" autocomplete="off" checked @click="filteredAccounts = accounts">
          <label class="btn btn-outline-primary" for="all">All</label>
          <input type="radio" class="btn-check" name="btnfilter" id="dentists" autocomplete="off" @click="showDentists()">
          <label class="btn btn-outline-primary" for="dentists">Dentists</label>
          <input type="radio" class="btn-check" name="btnfilter" id="patients" autocomplete="off" @click="showPatients()">
          <label class="btn btn-outline-primary" for="patients">Patients</label>
        </div>
      </div>
    </div>

    <div class="row mb-2">
      <div class="col-sm-12 px-0">
        <p class="mb-0 text-muted">Showing {{ filteredAccounts.length }} results</p>
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
              <th>Type</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="account in filteredAccounts" :key="account.id">
              <td>{{ account.id }}</td>
              <td>{{ account.name }}</td>
              <td>{{ account.email }}</td>
              <td>{{ account.creationDate }}</td>
              <td>
                <span class="badge" v-bind:class="[account.type === 'Dentist' ? 'bg-info' : 'bg-secondary']">
                  {{ account.type }}
                </span>
              </td>
              <td>
                <span
                  class="badge"
                  v-bind:class="[account.status.trim() === 'Active' ? 'bg-success' : 'bg-danger']">
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
      search: '',
      accounts: [],
      filteredAccounts: [],
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
          account.type = account.role_id === 2 ? 'Dentist' : 'Patient';

          const creationDate = (new Date(account.created_at)).toUTCString();
          account.creationDate = creationDate.substring(0, creationDate.lastIndexOf(' '));

          return account;
        });

        this.filteredAccounts = this.accounts;
      }, error => {
        console.log(error.toJSON());
      });
  },
  methods: {
    async suspendAccount(accountId) {
      try {
        await axios.post('/api/v1/admins/accounts/suspend', { accountId });

        const suspendedAccount = this.filteredAccounts.find(account => account.id === accountId);
        suspendedAccount.status = 'Suspended';
      } catch (error) {
        console.log(error.toJSON());
        // TODO: Display error
      }
    },
    async unsuspendAccount(accountId) {
      try {
        await axios.post('/api/v1/admins/accounts/unsuspend', { accountId })

        const suspendedAccount = this.filteredAccounts.find(account => account.id === accountId);
        suspendedAccount.status = 'Active';
      } catch (error) {
        console.log(error.toJSON());
        // TODO: Display error
      }
    },
    showDentists() {
      this.filteredAccounts = this.accounts.filter(account => account.type === 'Dentist');
    },
    showPatients() {
      this.filteredAccounts = this.accounts.filter(account => account.type === 'Patient');
    },
  },
  watch: {
    search: function(newTerm) {
      if (!newTerm.length) {
        this.filteredAccounts = this.accounts;
        return;
      }

      this.filteredAccounts = this.filteredAccounts.filter(account => {
        return account.name.toLocaleLowerCase().includes(newTerm)
          || account.email.toLocaleLowerCase().includes(newTerm);
      });
    },
  },
}
</script>
