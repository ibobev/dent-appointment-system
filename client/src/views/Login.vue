<template>
  <div id="login-page" class="container mt-5">
    <i class="fas fa-user-lock fa-3x mt-2"></i>
    <h3 class="mt-3 mb-4">Login</h3>
    <form class="">
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
        </div>
      </div>
      <button type="submit" class="btn mt-3 mb-2">Login</button>
    </form>
  </div>
</template>

<style scoped>
#login-page{
  padding-top:10px;
  padding-bottom:10px;
  margin-bottom: 75px;
  background-color: #f2f5f7f8;
  width:400px;
  border:1px solid #9ccff3;
  border-top: 3px solid #9ccff3;
  border-radius:4%;
  box-shadow: 10px 5px 5px #9ccff3;
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
#email{
  margin-right:15px;
}
#password{
  margin-right:15px;
}
button{
  background-color: #0292f8;
  color:#fff;
  width:50%;
}

</style>

<script>


</script>
