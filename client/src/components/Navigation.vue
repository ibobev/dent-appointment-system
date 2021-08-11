<template>
  <header class="container">
    <nav class="navbar navbar-expand navbar-dark fixed-top">
      <div class="container">
        
        <router-link to="/" class=" navbar-brand nav-link">DentApp</router-link>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav">
            <li class="nav-item px-3">
              <router-link to="/" class="nav-link">Home</router-link>
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
  </header>
</template>

<style scoped>
  nav{
    background-color: #0292f8;
  }  
</style>

<script>

</script>
