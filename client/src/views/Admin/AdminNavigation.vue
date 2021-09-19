<template>
  <div class="row mb-3">
    <nav class="nav bg-dark">
      <li class="nav-item">
        <a class="nav-link active" href="#">Accounts</a>
      </li>
      <li class="nav-item">
        <router-link to="/admin/admins" class="nav-link">Admins</router-link>
      </li>
      <li class="nav-item ms-auto">
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

.nav li a {
  color: #fff;
}

.nav li a:hover,
.nav li a.active {
  border-bottom-left-radius: 6px;
  background-color: rgba(0,0,0,0.3);
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
export default {
  name: 'AdminNavigation',
  mounted() {
    console.log('hafadsf');
  }
};
</script>
