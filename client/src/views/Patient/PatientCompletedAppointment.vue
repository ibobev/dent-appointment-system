<template>
  <div class="container mt-3">
    <h2 class="text-center mb-3">Dentist Review</h2>
    <div class="row">
      <div class="col-sm-12 col-lg-7 card shadow rounded-0 mb-4 mx-auto" id="card-top-border">
        <div v-for="appointment of details" v-bind:key="appointment.id">
            <div class="card-body">
              <h4 class="card-text text-center">Appointment Details</h4>
              <div class="break-line mb-2"></div>
              <p>
                <b>Dentist:</b> {{ appointment.first_name }}
                {{ appointment.last_name }}
              </p>
              <p><b>ID:</b> {{ appointment.dentist_id }}</p>
              <p><b>Email:</b> {{ appointment.email }}</p>
              <div class="break-line mb-2"></div>
              <p><b>Appointment:</b> {{ appointment.appointment_date }}</p>
              <p><b>From:</b> {{ appointment.start_time }}</p>
              <p><b>To:</b> {{ appointment.end_time }}</p>
              <p><b>Status:</b> {{ appointment.status }}</p>
              <div class="break-line"></div>
            </div>
        </div>
      </div>

      <div class="col-sm-12 col-lg-7 card shadow rounded-0 mb-4 mx-auto" id="review-dentist-form">
        <div class="row mt-4 err " v-if="state.error">
          <div class="col-12">
            <div class="alert alert-danger text-center">{{ state.error }}</div>
          </div>
        </div>
        <div class="row mt-4 scs" v-if="state.success">
          <div class="col-12">
            <div class="alert alert-success text-center" role="alert">
              {{ state.success }}
            </div>
          </div>
        </div>
        <div class="card-body">
          <h4 class="card-title text-center mb-3">
            <i class="fas fa-check-square"></i>
            Review
          </h4>
          <form @submit.prevent="onCompleteReviewSubmit">
            <div class="form-group mb-3">
              <label><b>Dentist Review</b></label>
              <div class="input-group">
                <span class="input-group-text">
                  <i class="fas fa-scroll fa-md"></i>
                </span>
                <textarea
                  name="description"
                  class="form-control"
                  placeholder="Enter medical record details..."
                  v-model="state.dentist_review.details"
                ></textarea>
              </div>
              <span class="input-error" v-if="v$.dentist_review.details.$error">
                {{ v$.dentist_review.details.$errors[0].$message }}
              </span>
            </div>
            <div class="form-group mb-3">
              <label><b>Dentist Rating</b></label>
              <div class="input-group">
                <span class="input-group-text">
                  <i class="fas fa-star fa-md"></i>
                </span>
                <select
                  class="form-control"
                  id="patient-rating"
                  v-model="state.rating.dentist_rating"
                >
                  <option value="" selected disabled hidden>
                    Rate Dentist
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <span class="input-error" v-if="v$.rating.dentist_rating.$error">
                {{ v$.rating.dentist_rating.$errors[0].$message }}
              </span>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-success">
                Complete Dentist Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#card-top-border {
  border-top: 4px solid #0292f8;
}

.break-line {
  width: 100%;
  border-bottom: 3px dashed #0292f8;
}

#review-dentist-form{
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
  name: "PatientCompletedAppointment",
  data() {
    return {
      appointment_id: this.$route.params.a_id,
      dentist_id: this.$route.params.d_id,
      details: [],
    };
  },
  methods: {
    parseAppointmentDate() {
      this.details.map((appointment) => {
        let correct_date = new Date(appointment.appointment_date);
        correct_date = correct_date.toLocaleDateString();
        appointment.appointment_date = correct_date;
      });
      return this.details;
    },
     prepareReview() {
      this.state.dentist_review.dentist_id = parseInt(this.dentist_id);
      this.state.dentist_review.appointment_id = parseInt(this.appointment_id);
    },
    prepareRating() {
      this.state.rating.dentist_rating = parseInt(this.state.rating.dentist_rating);
      this.state.rating.dentist = parseInt(this.dentist_id);
      this.state.rating.appointment_id = parseInt(this.appointment_id);
    },
    onCompleteReviewSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.prepareReview();
        this.prepareRating();
        axios.post("/api/v1/reviews", this.state.dentist_review).then(
          (res) => {
            console.log(res.data.statusmsg);
            this.state.success = res.data.statusmsg;
          },
          (error) => {
            if (error.response) {
              console.log(error.response);
              this.state.error = error.response.data.statusmsg;
              this.state.success = "";
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log(error);
            }
          }
        );
        axios.post("/api/v1/ratings/dentist", this.state.rating).then(
          (res) => {
            console.log(res.data.statusmsg);
            this.state.success = res.data.statusmsg;
          },
          (error) => {
            if (error.response) {
              console.log(error.response);
              this.state.error = error.response.data.statusmsg;
              this.state.success = "";
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
  async mounted() {
    try {
      const res = await axios.get(
        `/api/v1/appointments/patient/${this.appointment_id}`
      );
      this.details = res.data.appointmentDetails;
      this.parseAppointmentDate();
      console.log(this.details);
    } catch (error) {
      console.log(error.toJSON());
    }
  },
  setup() {
    const state = reactive({
      error: "",
      success: "",
      dentist_review: {
        details: "",
        dentist_id: "",
        appointment_id: "",
      },
      rating: {
        dentist: "",
        dentist_rating: "",
        appointment_id: "",
      },
    });
    const rules = computed(() => {
      return {
        dentist_review: {
          details: {
            maxValue: helpers.withMessage(
              "Max character limit(255) exceeded!",
              maxLength(255)
            ),
            required: helpers.withMessage(
              "Review details are required!",
              required
            ),
          },
        },
        rating: {
          dentist_rating: {
            required: helpers.withMessage("Rating is required!", required),
          },
        },
      };
    });
    const v$ = useValidate(rules, state);
    return {
      state,
      v$,
    };
  },
};
</script>