<template>
  <div>
    <div class="row">
      <div class="col-sm-12 px-0">
        <h1>Admin accounts</h1>
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
            <tr v-for="account in admins" :key="account.id">
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
      admins: [],
    };
  },
  async mounted() {
    try {
      const resp = await axios.get('/api/v1/admins');

      this.admins = resp.data.admins.map(admin => {
        const creationDate = (new Date(admin.created_at)).toUTCString();
        admin.creationDate = creationDate.substring(0, creationDate.lastIndexOf(' '));
        return admin;
      });
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

        this.admins = this.admins.filter(
          admin => parseInt(admin.id) !== parseInt(adminId)
        );
      } catch (error) {
        console.log(error.toJSON());
      }
    },
  },
}
</script>
