<template>
  <div class="row">
    <div class="col-lg-4 offset-lg-4" v-if="error.length">
      <div class="alert alert-danger">{{ error }}</div>
    </div>

    <div class="col-lg-4 offset-lg-4">
      <form @submit.prevent="onChangePassword">
        <div class="card">
          <div class="card-body">

            <div class="mb-3" v-if="!adminId">
              <label for="oldPassword">Old password</label>
              <input type="password" id="oldPassword" class="form-control" v-model="oldPassword" required />
            </div>

            <div class="mb-3">
              <label for="newPassword">New password</label>
              <input type="password" id="newPassword" class="form-control" v-model="newPassword" required />
            </div>

            <div class="mb-3">
              <label for="repNewPassword">Repeat new password</label>
              <input type="password" id="repNewPassword" class="form-control" v-model="repNewPassword" required />
            </div>

            <button type="submit" class="btn btn-success">Submit</button>

          </div>
        </div>
      </form>
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
      adminId: null,
      error: '',
      oldPassword: '',
      newPassword: '',
      repNewPassword: '',
    }; 
  },
  mounted() {
    this.adminId = parseInt(this.$route.params.adminId) || null;
    console.log(this.adminId);
  },
  methods: {
    onChangePassword: async function() {
      this.error = '';

      if (this.newPassword !== this.repNewPassword) {
        this.error = 'Passwords do not match!';
        return;
      }

      console.log(this.newPassword);

      try {
        await axios.patch('/api/v1/admins', {
          adminId: this.adminId,
          newPassword: this.newPassword,
          oldPassword: this.oldPassword
        });

        if (this.adminid) {
          this.$router.push({ path: '/admin/admins' });
          return;
        }

        this.$router.push({ path: '/admin/accounts' });
      } catch (error) {
        console.log(error.toJSON());

        if (error.response) {
          this.error = error.response.data.statusmsg || JSON.stringify(error.response.data);
        }
      }
    }, 
  },
};
</script>
