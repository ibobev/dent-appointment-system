<template>
  <div class="container">
    <nav class="navbar navbar-expand navbar-light">
      <div class="container">
        <a href="#" class="navbar-brand">DentApp</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav">
            <li class="nav-item px-3">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item px-3">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
            <li class="nav-item px-3">
              <router-link to="/register" class="nav-link">Register</router-link>
            </li>
            <li class="nav-item px-3">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>

</script>
