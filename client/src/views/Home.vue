<template>
  <main>
    <section class="pt-4" id="home">
        <h1>The Dentist Appointment App</h1>
        <p class="pb-4">Dentist appointments made easy</p>
    </section>
    <div class="pt-2" id="card-content">
      <div class="row">
        <div class="card mx-auto">
          <div class="card-body d-flex flex-column">
            <h3 class="card-title">Are you looking for a dentist?</h3>
            <p class="card-text">Click on Register to create a free account.</p>
            <router-link to="/register" class="btn mt-auto">Register</router-link>
          </div>
        </div>
        <div class="card mx-auto">
          <div class="card-body d-flex flex-column">
            <h3 class="card-title">Are you a dentist?</h3>
            <p class="card-text">Click on Register to create a free account.</p>
            <router-link to="/register" class="btn mt-auto">Register</router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main{
  margin-top:30px;
}
.card {
  width: 20rem;
  height: 250px;
  margin-bottom:15px;
  border-color: #0292f8;
}
#card-content{
  margin-bottom:50px;
}
.btn{
  background-color:#0292f8;
  color:#fff;
}
</style>

<script>
// @ is an alias to /src

/*export default {
  name: "Home",
  components: {},
};*/
</script>
