<template>
  <div>

    <!-- Error alert -->
    <div class="row" v-if="error.length">
      <div class="col-sm-12 px-0">
        <div class="alert alert-danger">{{ error }}</div>
      </div>
    </div>

    <!-- Account details -->
    <div class="row">
      <div class="col-sm-12 px-0">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="row">

              <div class="col-sm-6">
                <h4>
                  {{ account.name }}
                  <span class="badge bg-info">{{ account.type }}</span>
                </h4>

                <strong>Description:</strong>
                <p class="card-text" v-if="account.details">
                  {{ account.details.description }}
                </p>
              </div>

              <div class="col-sm-3">
                <dl>
                  <dt>Status</dt>
                  <dd class="badge" v-bind:class="[account.status === 'Active' ? 'bg-success' : 'bg-danger']">
                    {{ account.status }}
                  </dd>
                  <dt>Registration date</dt>
                  <dd>{{ account.registerDate }}</dd>
                  <dt>Rating</dt>
                  <dd class="badge bg-warning">
                    {{ account.rating }}
                  </dd>
                </dl>
              </div>

              <div class="col-sm-3">
                <dl>
                  <dt>Email</dt>
                  <dd>{{ account.email }}</dd>
                </dl>

                <dl v-if="account.details">
                  <dt>Phone number</dt>
                  <dd>{{ account.details.phone }}</dd>
                  <dt>City</dt>
                  <dd>{{ account.details.city }}</dd>
                </dl>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reviews -->
    <div class="row my-4" v-for="reviewer in account.reviews" v-bind:key="reviewer.patient_id">
      <div class="col-sm-12">
        <h4>What people say?</h4>
      </div>
      <div class="col-sm-12 px-0">
        <div class="card shadow-sm">
          <div class="card-body">
            <i class="far fa-comments fa-lg"></i>
            <p class="card-text text-center text-muted fst-italic mb-2">
              {{ reviewer.patient_comment }}
            </p>
            <p class="text-center">
              <router-link :to="{ name: 'AccountView', params: { accountId: reviewer.patient_id }}">
                {{ reviewer.name }} 
              </router-link>
              <small class="fst-italic"> - {{ reviewer.commentDate }}</small>
            </p>
          </div>
        </div>
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
      account: {},
    };
  },
  mounted() {
    this.fetchAccount();
  },
  methods: {
    fetchAccount: async function() {
      const accountId = this.$route.params.accountId;

      try {
        const resp = await axios.get(`/api/v1/admins/account/${accountId}`);
        this.account = resp.data.account;

        this.account.name = `${this.account.first_name} ${this.account.last_name}`;

        const registerDate = (new Date(this.account.created_at)).toUTCString(); 
        this.account.registerDate = registerDate.substring(0, registerDate.lastIndexOf(' '));

        this.account.reviews = this.account.reviews.map(reviewer => {
          reviewer.name = `${reviewer.first_name} ${reviewer.last_name}`;

          const commentDate = (new Date(reviewer.commented_on)).toUTCString();
          reviewer.commentDate = commentDate.substring(0,commentDate.lastIndexOf(' '));

          return reviewer;
        });
      } catch (error) {
        console.log(error);
        console.log(error.toJSON());
        if (error.response) {
          this.error = error.response.data.statusmsg;
        }
      }
    }
  },
  watch: {
    $route: function() {
      this.fetchAccount();
    },
  }
}
</script>
