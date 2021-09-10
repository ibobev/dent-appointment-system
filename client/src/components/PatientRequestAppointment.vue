<template>
  <div id="request-appointment" class="card shadow rounded-0 mb-3 text-center">
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
      <h4 class="card-title mb-3">
        <i class="fas fa-calendar"></i>
        Request An Appointment
      </h4>
      <form @submit.prevent="onRequestAppointment">
        <div class="form-group text-center mb-3">
          <div class="input-group">
            <span class="input-group-text">
              <i class="fas fa-calendar-day fa-lg"></i>
            </span>
            <label class="px-2" for="appointment-date">Date:</label>
            <input
              type="date"
              id="appointment-date-start"
              v-model="state.appointment.date"
            />
            <span class="input-error" v-if="v$.appointment.date.$error">
              {{ v$.appointment.date.$errors[0].$message }}
            </span>
          </div>
        </div>
        <div class="form-group text-center mb-3">
          <div class="input-group">
            <span class="input-group-text">
              <i class="far fa-clock fa-lg"></i>
            </span>
            <label class="px-2" for="start-time">From:</label>
            <input id="start-time" type="time" step="1800" min="08:00" max="19:30" v-model="state.appointment.start" />
            <span class="input-error" v-if="v$.appointment.start.$error">
              {{ v$.appointment.start.$errors[0].$message }}
            </span>
          </div>
        </div>
        <button type="submit" class="btn">Request Appointment</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
#request-appointment {
  border-top: 4px solid #0292f8;
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

span.input-error {
  color: red;
  text-align: center;
  font-size: 10px;
  padding-top: 5px;
  padding-left: 15px;
}

.err {
  margin-left: 10px;
  margin-right: 10px;
}

.scs {
  margin-left: 10px;
  margin-right: 10px;
}
</style>

<script>
import axios from "axios";
import useValidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
  name: "RequestAppointment",
  data() {
    return {
      dentist_id : this.$route.params.id,
      dentistWork: []
    };
  },
  setup() {
    const state = reactive({
      error: "",
      success: "",
      appointment: {
        dentist:"",
        date: "",
        start: "",
        end: ""
      },
      dentist: "",
      patient: ""
    });
    const rules = computed(() => {
      return {
        appointment: {
          date: {
            required: helpers.withMessage("Date is required!", required),
          },
          start: {
            required: helpers.withMessage(
              "Appointment time is required!",
              required
            ),
          }
        },
      };
    });
    const v$ = useValidate(rules, state);
    return {
      state,
      v$,
    };
  },
  methods: {
    prepareRequestAppointment(){
      this.state.appointment.dentist = this.dentist_id;
      // Calculate Appointmet end time
      let selectedDate = new Date(this.state.appointment.date);
      let hours = this.state.appointment.start.split(':')[0];
      let minutes = this.state.appointment.start.split(':')[1];
      selectedDate.setHours(hours);
      selectedDate.setMinutes(minutes);
      let endTime = new Date(selectedDate.getTime() + 30 * 60000);
      this.state.appointment.end = endTime.getHours() + ':' + ( endTime.getMinutes() < 10 ? '0': '') + endTime.getMinutes(); //Get minutes  ternary operator checks if minutes start with single digit and if so an extra 0 is added infront thus minutes format is :00 
      //console.log(this.state.appointment.end);
    },
    checkWorkTime() {
      let flag = false;
      if(this.dentistWork.work_from < this.state.appointment.start || this.dentistWork.wrok_to > this.state.appointment.end){
        flag = true;
        this.state.error = "Please select a time interval within the selected dentist work time schedule!";
      }
      return flag;
    },
    onRequestAppointment() {
      this.v$.$validate();
      this.prepareRequestAppointment();
      let checkTime = this.checkWorkTime();
      if (!this.v$.$error && !checkTime) {
        axios.post("/api/v1/appointments", this.state.appointment).then(
          (res) => {
            this.state.success = res.data.statusmsg;
          },
          (error) => {
            if (error.response) {
              console.log(error.response);
              this.state.error = error.response.data.statusmsg;
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log(error);
            }
          }
        );
      }
    },
  },
  mounted() {
    axios.get(`/api/v1/dentists/details/${this.dentist_id}`).then(
      (res) => {
        this.dentistWork  = res.data.dentistDetails;
        console.log(this.dentistWork);
      },
      (error) => {
        if (error.request) {
          console.log(error.request);
          console.log(error.request.status);
        } else if (error.response) {
          console.log(error.response);
        } else {
          console.log(error);
        }
      }
    );
  }
};

</script>