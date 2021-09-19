<template>
  <div>
    <div class="row">
      <div class="col-sm-12 px-0">
        <h1>Admin accounts</h1>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-sm-12 px-0">
        <div class="input-group">
          <span class="input-group-text">
            <i class="fas fa-search"></i>
          </span>
          <input type="text" class="form-control" placeholder="Search" v-model="search" />
        </div>
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
            <tr v-for="account in filteredAdmins" :key="account.id">
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
                      <a class="dropdown-item text-danger" href="#" @click="onDelete(account.id)">
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
      admins: [],
      filteredAdmins: [],
    };
  },
  async mounted() {
    try {
      const resp = await axios.get('/api/v1/admins');

      this.admins = resp.data.admins.map(admin => {
        admin.name = `${admin.first_name} ${admin.last_name}`;
        const creationDate = (new Date(admin.created_at)).toUTCString();
        admin.creationDate = creationDate.substring(0, creationDate.lastIndexOf(' '));
        return admin;
      });

      this.filteredAdmins = this.admins;
    } catch (error) {
      console.log(error.toJSON());
    }
  },
  methods: {
    onDelete: async function (adminId) {
      if (!confirm('Are you sure?')) {
        return;
      }

      try {
        await axios.delete(`/api/v1/admins/${adminId}`);

        this.filteredAdmins = this.filteredAdmins.filter(
          admin => parseInt(admin.id) !== parseInt(adminId)
        );
      } catch (error) {
        console.log(error.toJSON());
      }
    },
    async suspendAccount(accountId) {
      try {
        await axios.post('/api/v1/admins/accounts/suspend', { accountId })

        const suspendedAccount = this.filteredAdmins.find(account => account.id === accountId);
        suspendedAccount.status = 'Suspended';
      } catch (error) {
        console.log(error.toJSON);
      }
    },
    async unsuspendAccount(accountId) {
      try {
        await axios.post('/api/v1/admins/accounts/unsuspend', { accountId })

        const suspendedAccount = this.filteredAdmins.find(account => account.id === accountId);
        suspendedAccount.status = 'Active';
      } catch (error) {
        console.log(error.toJSON);
      }
    }
  },
  watch: {
    search: function(searchTerm) {
      if (searchTerm.length === 0) {
        this.filteredAdmins = this.admins;
        return;
      }

      this.filteredAdmins = this.filteredAdmins.filter(admin => {
        return admin.name.toLocaleLowerCase().includes(searchTerm)
          || admin.email.toLocaleLowerCase().includes(searchTerm);
      });
    },
  },
}
</script>
