<template>
  <div class="card shadow rounded-0" id="update-working-hours">
    <div class="row mt-4 err" v-if="state.error">
      <div class="col-12">
        <div class="alert alert-danger">{{ state.error }}</div>
      </div>
    </div>
    <div class="row mt-4 scs" v-if="state.success">
      <div class="col-12">
        <div class="alert alert-success" role="alert">{{ state.success }}</div>
      </div>
    </div>
    <div class="card-body">
      <h4 class="card-title mb-4">
        <i class="fas fa-calendar-week"></i>
        Update Work Schedule
      </h4>
      <form @submit.prevent="onWorkHoursSubmit">
        <div class="form-group text-center form-data">
          <div class="input-group mb-3" id="checkList">
            <span class="input-group-text">
              <i class="fas fa-calendar-day fa-lg"></i>
            </span>
            <label class=" px-2" for="work-days">Work Days:</label>
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
              <label class="px-2" for="start-time">From:</label>
              <input id="start-time" type="time" v-model="state.work.start">
            <span class="input-error" v-if="v$.work.start.$error">
            {{ v$.work.start.$errors[0].$message }}
          </span>
            </div>
          </div>

          <div class="form-group text-center mb-3">
            <div class="input-group">
              <span class="input-group-text">
                <i class="fas fa-clock fa-lg"></i>
              </span>
              <label class="px-3" for="end-time">To:</label>
              <input id="end-time" type="time" v-model="state.work.end">
              <span class="input-error" v-if="v$.work.end.$error">
            {{ v$.work.end.$errors[0].$message }}
          </span>
            </div>
          </div>

        </div>
          <button type="submit" class="btn mt-3">Update</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
#update-working-hours{
  border-top: 4px solid #0292f8;
}

button {
  background-color: #0292f8;
  color: #fff;
}

.form-data{
  border:2px solid #e6e6e6;
  padding-top: 15px;
  padding-right:5px;
  padding-left:5px;
  padding-bottom: 2px;
}

.fas {
  color: #0292f8;
}

.far {
  color: #0292f8;
}

span.input-error {
  color: red;
  text-align: center;
  font-size: 10px;
  padding-top:5px;
  padding-left:15px;
}

.err{
  margin-left:10px;
  margin-right: 10px;
}

.scs{
  margin-left:10px;
  margin-right: 10px;
}

</style>

<script>
//import axios from "axios";
import useValidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
  name: "UpdateWorkingHours",
  setup() {
    const state = reactive({
      error: "",
      success: "",
      work:{
        days:"",
        start:"",
        end:""
      },
    });
    const rules = computed(() => {
      return {
        work: {
          start: {
            required: helpers.withMessage("Starting hour is required!", required),
          },
          end: {
            required: helpers.withMessage("Ending hour is required!", required),
          },
        },
      };
    });
    const v$ = useValidate(rules, state);
    return{
      state,
      v$,
    };
  },
  methods: {
    getCheckedDays(){
      let checkForm = document.getElementById('checkList');
      let checkedBoxes = checkForm.querySelectorAll('input[type="checkbox"]');
      let result = [];

      checkedBoxes.forEach(item => {
        if(item.checked){
          result.push(item.value);
        }
      });
      result = result.toString();
      return result;
    },
    onWorkHoursSubmit(){
      this.v$.$validate();
      let flag = true; // if flag is true days string is empty thus this is an error
      let days = this.getCheckedDays();

      if (!days) {
        this.state.error = "Select at least one work day!";
      } else {
        flag = false;
      }

      if(!this.v$.error && !flag){
        console.log('ok');
      }
      

      
    }
  }
};
</script>