<template>
  <div class="card shadow rounded-0" id="update-working-hours">
    <div class="card-body">
      <h4 class="card-title mb-3">
        <i class="fas fa-calendar-week"></i>
        Update Work Schedule
      </h4>
      <form @submit.prevent="onWorkHoursSubmit">
        <div class="form-group text-center">
          <div class="input-group mb-3">
            <span class="input-group-text">
              <i class="fas fa-calendar-day fa-lg"></i>
            </span>
            <label class=" px-2" for="work-days">Working Days:</label>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                value="Monday"
                
              />
              <label class="form-check-label">Monday</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                
                value="Tuesday"
              />
              <label class="form-check-label">Tuesday</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                
                value="Wednesday"
              />
              <label class="form-check-label">Wednesday</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                
                value="Thursday"
              />
              <label class="form-check-label">Thursday</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                
                value="Friday"
              />
              <label class="form-check-label">Friday</label>
            </div>
          </div>
          
          <div class="form-group text-center mb-3">
            <div class="input-group">
              <span class="input-group-text">
                <i class="far fa-clock fa-lg"></i>
              </span>
              <label class="px-2" for="start-time">Working From:</label>
              <input id="start-time" type="time">
            </div>
          </div>

          <div class="form-group text-center mb-3">
            <div class="input-group">
              <span class="input-group-text">
                <i class="fas fa-clock fa-lg"></i>
              </span>
              <label class="px-2" for="end-time">Working To:</label>
              <input id="end-time" type="time">
            </div>
          </div>

        </div>
          <button type="submit" class="btn">Update</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
#update-working-hours{
  border-top: 4px solid #0292f8;
  height:260px;
  max-height: 415px;
}

button {
  background-color: #0292f8;
  color: #fff;
}

.fas {
  color: #0292f8;
}

.far {
  color: #0292f8;
}

</style>

<script>
export default {
  name: "UpdateWorkingHours",
};
</script>