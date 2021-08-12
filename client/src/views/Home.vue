<template>
  <main>
    <section class="pt-4" id="home">
      <h1>The Dentist Appointment App</h1>
      <p class="pb-4">Dentist appointments made easy</p>
    </section>
    <div class="pt-2" id="card-content">
      <div class="row">
        <div class="card mx-auto shadow">
          <div class="row g-0">
            <div class="col-md-4">
              <img
                src="../assets/patient.png"
                class="user-style-img"
                alt="patient"
              />
            </div>
            <div class="col-md-8">
              <div class="card-body d-flex flex-column">
                <h3 class="card-title">Are you looking for a dentist?</h3>
                <p class="card-text">
                  Click on Register to create a free account.
                </p>
                <router-link to="/register" class="btn mt-auto"
                  >Register</router-link
                >
              </div>
            </div>
          </div>
        </div>
        <div class="card mx-auto shadow">
            <div class="row g-0">
            <div class="col-md-4">
              <img
                src="../assets/dental-care.png"
                class="user-style-img"
                alt="dentist"
              />
            </div>
            <div class="col-md-8 ">
              <div class="card-body d-flex flex-column">
                <h3 class="card-title">Are you a dentist?</h3>
                <p class="card-text">
                  Click on Register to create a free account.
                </p>
                <router-link to="/register" class="btn mt-auto"
                  >Register</router-link
                >
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
  </main>
</template>

<style scoped>
#home {
  padding-bottom: 40px;
}
.card {
  width: 25rem;
  margin-bottom: 15px;
}
.user-style-img{
  margin-top:40px;
  
}
#card-content {
  margin-bottom: 80px;
}
.btn {
  background-color: #0292f8;
  color: #fff;
}
</style>

<script>
// @ is an alias to /src

/*export default {
  name: "Home",
  components: {},
};*/
</script>
