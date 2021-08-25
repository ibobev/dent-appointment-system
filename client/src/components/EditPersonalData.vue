<template>
  <div
    id="personal-details"
    class="container mt-3 mb-3 shadow pt-2 pb-3 text-center"
  >
    <i class="far fa-edit fa-2x mt-2"></i>
    <h3 class="mt-3 mb-4">Edit Account Details</h3>
    <form @submit.prevent="onPersonalUpdateSubmit">
      <div class="form-group mx-auto">
        <div class="input-group mt-2">
          <i class="fas fa-pen-fancy fa-2x mt-2"></i>
          <input
            type="text"
            class="form-control mt-2"
            id="first-name"
            placeholder="First name"
          />
        </div>
        <div class="col">
          <span></span>
        </div>
      </div>
      <div class="form-group mx-auto">
        <div class="input-group mt-2">
          <i class="fas fa-pen-fancy fa-2x mt-2"></i>
          <input
            type="text"
            class="form-control mt-2"
            id="last-name"
            placeholder="Last name"
          />
        </div>
        <div class="col">
          <span></span>
        </div>
      </div>

      <div class="form-group mx-auto">
        <div class="input-group mt-2">
          <i class="far fa-envelope fa-2x mt-2"></i>
          <input
            type="email"
            class="form-control mt-2"
            id="email"
            placeholder="Enter new email"
          />
        </div>
        <span></span>
      </div>

      <button type="submit" class="btn mt-3 mb-2">
        Update
      </button>
    </form>
  </div>
</template>

<style scoped>
#personal-details {
  width: 390px;
  background-color: #fff;
  border-top: 4px solid #0292f8;
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
  #personal-details{
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
  name: "EditPersonalData",
};
</script>
