<template>
  <div id="change-pass" class="container mt-3 mb-3 shadow pt-2 pb-3 text-center">
    <i class="fas fa-key fa-2x mt-2"></i>
    <h3 class="mt-3 mb-4">Change Your Password</h3>
    <form @submit.prevent="onChangePasswordSubmit">
      <div class="form-group mx-auto">
        <div class="input-group mt-2">
          <i class="fas fa-lock fa-2x mt-2"></i>
          <input
            type="password"
            class="form-control mt-2"
            id="current-password"
            placeholder="Current Password"
          />
        </div>
        <span></span>
      </div>

      <div class="form-group mx-auto">
        <div class="input-group mt-2">
          <i class="fas fa-fingerprint fa-2x mt-2"></i>
          <input
            type="password"
            class="form-control mt-2"
            id="new-password"
            placeholder="New Password"
          />
        </div>
        <span></span>
      </div>

      <div class="form-group mx-auto">
        <div class="input-group mt-2">
          <i class="fas fa-fingerprint fa-2x mt-2"></i>
          <input
            type="password"
            class="form-control mt-2"
            id="confirm-password"
            placeholder="Confirm Password"
          />
        </div>
        <span></span>
      </div>
      <button type="submit" class="btn mt-3 mb-2">Change Password</button>
    </form>
  </div>
</template>

<style scoped>
#change-pass {
  background-color: #fff;
  border-top: 4px solid #0292f8;
  width: 390px;
}
.fas {
  margin-left: 5px;
  margin-right: 10px;
  color: #0292f8;
}

.far {
  margin-left: 5px;
  margin-right: 10px;
  color: #0292f8;
}

button {
  background-color: #0292f8;
  color: #fff;
  width: 60%;
}

@media only screen and (max-width: 450px){
  #change-pass{
    width: 320px;
  }
  .fas{
    font-size:18px;
  }
  .far{
    font-size:18px;
  }
  input{
    height:33px;
  }
  h3{
    font-size:16px;
  }

  p{
    font-size:12px;
  }
}

</style>

<script>
export default {
  name: "ChangePassword",
};
</script>
