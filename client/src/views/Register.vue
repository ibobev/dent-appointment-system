<template>
  <div id="register-page" class="container mt-5 shadow">
    <i class="fas fa-user-edit fa-3x mt-2"></i>
    <h3 class="mt-3 mb-4">Register</h3>
    <form class="">
      <div class="form-group mx-auto">
        <div class="input-group mb-3">
          <i class="fas fa-pen fa-3x mt-1"></i>
          <input
            type="text"
            class="form-control mt-2 mb-3"
            id="first-name"
            placeholder="First name"
            required
          />
          <input
            type="text"
            class="form-control mt-2 mb-3"
            id="last-name"
            placeholder="Last name"
            required
          />
        </div>
      </div>
      <div class="form-group mx-auto">
        <div class="input-group mb-3">
          <i class="far fa-envelope fa-3x mt-1"></i>
          <input
            type="email"
            class="form-control mt-2 mb-3"
            id="email"
            placeholder="Enter email"
            required
          />
        </div>
      </div>
      <div class="form-group mx-auto">
        <div class="input-group mb-3">
          <i class="fas fa-fingerprint fa-3x mt-1"></i>
          <input
            type="password"
            class="form-control mt-2 mb-3"
            id="password"
            placeholder="Password"
            required
          />
          <input
            type="password"
            class="form-control mt-2 mb-3"
            id="password-repeat"
            placeholder="Repeat Password"
            required
          />
        </div>
      </div>
      <button type="submit" class="btn mt-3 mb-2">Register</button>
    </form>
  </div>
</template>

<style scoped>
#register-page {
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 75px;
  background-color: #fff;
  width: 400px;
  border-top: 4px solid #0292f8;
  border-radius: 4%;
}
button {
  background-color: #0292f8;
  color: #fff;
  width: 50%;
}
.far{
  color:#0292f8;
  margin-right:10px;
  margin-left:10px;
}
.fas{
  color:#0292f8;
  margin-right:10px;
  margin-left:10px;
}

#first-name{
    margin-right:10px;
}

#password{
    margin-right:10px;
}
</style>


<script>
export default {
  name: "Register",

  methods: {},
};
</script>
