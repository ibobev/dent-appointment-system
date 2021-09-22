<template>
  <div class="row mb-3">
    <nav class="nav bg-dark">
      <li class="nav-item">
        <router-link
          to="/admin/accounts"
          class="nav-link"
          v-bind:class="{'active': $route.name === 'Accounts'}"
        >
          Accounts
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/admin/admins"
          class="nav-link"
          v-bind:class="{'active': $route.name === 'AdminsView'}"
        >
          Admins
        </router-link>
      </li>
      <li class="nav-item ms-auto dropdown">
        <a href="#" class="nav-link" data-bs-toggle="dropdown" role="button" aria-expanded="false">
          <i class="fas fa-user-circle"></i>
          Profile
          <i class="fas fa-chevron-down fa-xs"></i>
        </a>
        <ul class="dropdown-menu">
          <li>
            <router-link :to="{ name: 'AdminPassword', params: { adminId: null } }" class="dropdown-item">
              <i class="fas fa-key"></i>
              Change password
            </router-link>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="logout()">
              <i class="fas fa-sign-out-alt"></i>
              Logout
            </a>
          </li>
        </ul>
      </li>
      <li class="nav-item">
        <router-link to="/admin/new" class="nav-link bg-success new-admin-btn">+ New admin</router-link>
      </li>
    </nav>
  </div>
</template>

<style scoped>
.nav {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

.nav li.nav-item a {
  color: #fff;
}

.nav li a:hover,
.nav li a.active {
  border-bottom-left-radius: 6px;
  background-color: rgba(0,0,0,0.3);
}

.nav li.nav-item ul.dropdown-menu li a {
  color: #000;
  border-radius: 0;
}

.nav li.nav-item ul.dropdown-menu li a:hover {
  background-color: rgba(0,0,0,0.1);
}

.nav-item .nav-link.new-admin-btn {
  margin-right: -12px;
  border-bottom-right-radius: 6px;
}

.nav-item .nav-link.new-admin-btn:hover {
  border-bottom-left-radius: 0;
  background-color: #439a43 !important;
}
</style>

<script>
import auth from '@/auth';

export default {
  name: 'AdminNavigation',
  methods: {
    logout: function() {
      auth.data().deleteToken();
      this.$router.push({ path: '/login' });
    },
  },
};
</script>
