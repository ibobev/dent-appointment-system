<template>
  <div id="update-details" class="container mt-3 mb-3 shadow pt-2 pb-3 text-center">
    <i class="fas fa-edit fa-2x mt-2"></i>
    <h3 class="mt-3 mb-4">Update Work Details</h3>
    <form @submit.prevent="onUpdateSubmit">
      <div class="form-group mx-auto">
        <div class="input-group">
          <i class="fas fa-graduation-cap fa-2x mt-2"></i>
          <select class="form-control mt-2" id="roles" name="role-list">
            <option value="" selected disabled hidden>
              Select your expertise
            </option>
            <option value="Dentist">Dentist</option>
            <option value="Orthodontist">Orthodontist</option>
            <option value="Periodontist">Periodontist</option>
            <option value="Endodontist">Endodontist</option>
            <option value="Pedodontist">Pedodontist</option>
            <option value="Prosthodontists">Prosthodontists</option>
          </select>
        </div>
        <span></span>
      </div>
      <div class="form-group mx-auto">
        <div class="input-group mt-2">
          <i class="fas fa-map-marked-alt fa-2x mt-2"></i>
          <input
            type="text"
            class="form-control mt-2"
            id="city"
            placeholder="Enter your city"
          />
        </div>
        <div class="col">
          <span></span>
        </div>
      </div>
      <div class="form-group mx-auto">
        <div class="input-group mt-2">
          <i class="fas fa-phone fa-2x mt-2"></i>

          <input
            type="text"
            class="form-control mt-2"
            id="phone"
            placeholder="Phone number"
          />
        </div>
        <div class="col">
          <span></span>
        </div>
      </div>
      <div class="form-group mx-auto">
        <div class="input-group mt-2">
          <i class="fas fa-scroll fa-2x mt-2"></i>
          <textarea
            name="description"
            placeholder="Enter short description here..."
          ></textarea>
        </div>
        <div class="col">
          <span></span>
        </div>
      </div>

      <button type="submit" class="btn mt-3 mb-2">Update Work Details</button>
    </form>
  </div>
</template>

<style scoped>
#update-details {
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

textarea {
  width: 85%;
  height: 55px;
}
</style>

<script>
export default {
  name: "UpdateDentistDetails",
};
</script>
