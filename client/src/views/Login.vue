<template>
  <div id="login-page" class="container mt-5">
    <h3 class="mt-3 mb-4">Login</h3>
    <form class="">
      <div class="form-group mx-auto">
        <label for="inputEmail">Email address</label>
        <input
          type="email"
          class="form-control mt-2 mb-3"
          id="email"
          placeholder="Enter email"
          required
        />
      </div>
      <div class="form-group mx-auto">
        <label for="inputPassword">Password</label>
        <input
          type="password"
          class="form-control mt-2 mb-3"
          id="password"
          placeholder="Password"
          required
        />
      </div>
      <button type="submit" class="btn  mt-3 mb-2">Login</button>
    </form>
  </div>
</template>

<style scoped>
#login-page{
  padding-top:10px;
  padding-bottom:10px;
  margin-bottom: 120px;
  background-color: #f2f5f7f8;
  width:400px;
  border:1px solid #9ccff3;
  border-top: 3px solid #9ccff3;
  border-radius:4%;
  box-shadow: 10px 5px 5px #9ccff3;
}

button{
  background-color: #0292f8;
  color:#fff;
}

</style>

<script>


</script>
