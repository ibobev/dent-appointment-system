<template>
  <div id="complete-form" class="card shadow rounded-0 mb-3">
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
      <h4 class="card-title text-center mb-3">
        <i class="fas fa-calendar-check"></i>
        Complete Appointment
      </h4>
      <form @submit.prevent="onCompleteAppointmentSubmit">
        <div class="form-group mb-3">
          <label><b>Medical Record</b></label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="fas fa-scroll fa-md"></i>
            </span>
            <textarea
              name="description"
              class="form-control"
              placeholder="Enter medical record details..."
              v-model="state.medical_record.details"
            ></textarea>
          </div>
          <span class="input-error" v-if="v$.medical_record.details.$error">
            {{ v$.medical_record.details.$errors[0].$message }}
          </span>
        </div>
        <div class="form-group mb-3">
          <label><b>Patient Rating</b></label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="fas fa-star fa-md"></i>
            </span>
            <select class="form-control" id="patient-rating" v-model="state.rating.patient_rating">
              <option value="" selected disabled hidden>Rate Patient</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <span class="input-error" v-if="v$.rating.patient_rating.$error">
            {{ v$.rating.patient_rating.$errors[0].$message }}
          </span>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-success">
            Complete Appointment
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

#complete-form {
  border-top: 4px solid #198754;
}

.fas {
  color: #198754;
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
import { helpers, required, maxLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
  name: "CompleteAppointmentForm",
  data () {
    return {
      appointment_id: this.$route.params.a_id,
      patient_id: this.$route.params.p_id,
    };
  },
  setup() {
    const state = reactive({
      error: "",
      success: "",
      medical_record: {
        details: "",
        patient_id: "",
        appointment_id: ""
      },
      rating: {
        patient: "",
        patient_rating: ""
      }
    });
    const rules = computed(() => {
      return {
        medical_record: {
          details: {
            maxValue: helpers.withMessage(
              "Max character limit(255) exceeded!",
              maxLength(255)
            ),
            required: helpers.withMessage("Medical record details are required!", required),
          },
        },
        rating: {
          patient_rating: {
            required: helpers.withMessage("Rating is required!", required),
          }
        }
      };
    });
    const v$ = useValidate(rules, state);
    return {
      state,
      v$
    };
  },
  methods: {
    prepareMedicalRecord() {
      this.state.medical_record.patient_id = parseInt(this.patient_id);
      this.state.medical_record.appointment_id = parseInt(this.appointment_id);
    },
    prepareRating() {
      this.state.rating.patient_rating = parseInt(this.state.rating.patient_rating);
      this.state.rating.patient = parseInt(this.patient_id);
    },
    onCompleteAppointmentSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.prepareMedicalRecord();
        this.prepareRating();
        axios.put(`/api/v1/appointments/complete/${this.appointment_id}`).then(
          (res) => {
            console.log(res.data.statusmsg);
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
        axios.post("/api/v1/medical-records", this.state.medical_record).then(
          (res) => {
            console.log(res.data.statusmsg);
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
        axios.post("/api/v1/ratings/patient", this.state.rating).then(
          (res) => {
            console.log(res.data.statusmsg);
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
        this.$router.push({ path: "/dentist/appointments" });
      }
    },
  }
};
</script>