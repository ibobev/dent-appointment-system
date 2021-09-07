<template>
  <div class="card shadow rounded-0" id="update-details">
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
        <i class="fas fa-edit"></i>
        Update Work Details
      </h4>
      <form @submit.prevent="onUpdateSubmit">
        <div class="form-group text-center mb-3">
          <div class="input-group">
            <span class="input-group-text">
              <i class="fas fa-graduation-cap fa-2x"></i>
            </span>
            <select
              class="form-control"
              id="dentst-type"
              name="type-list"
              v-model="state.dentistDetails.type"
            >
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
        <div class="form-group text-center mb-3">
          <div class="input-group">
            <span class="input-group-text">
              <i class="fas fa-map-marked-alt fa-2x"></i>
            </span>
            <input
              type="text"
              class="form-control"
              id="city"
              placeholder="Enter your city"
              v-model="state.dentistDetails.city"
            />
          </div>
          <span></span>
        </div>
        <div class="form-group text-center mb-3">
          <div class="input-group">
            <span class="input-group-text">
              <i class="fas fa-phone fa-2x"></i>
            </span>
            <input
              type="text"
              class="form-control"
              id="phone"
              placeholder="Phone number"
              v-model="state.dentistDetails.phone"
            />
          </div>
          <span v-if="v$.dentistDetails.phone.$error">{{
            v$.dentistDetails.phone.$errors[0].$message
          }}</span>
        </div>
        <div class="form-group text-center mb-3">
          <div class="input-group">
            <span class="input-group-text">
              <i class="fas fa-scroll fa-2x"></i>
            </span>
            <textarea
              name="description"
              class="form-control"
              placeholder="Enter short description here..."
              v-model="state.dentistDetails.description"
            ></textarea>
          </div>
          <span v-if="v$.dentistDetails.description.$error">{{
            v$.dentistDetails.description.$errors[0].$message
          }}</span>
        </div>

        <button type="submit" class="btn">Update</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
#update-details {
  border-top: 4px solid #0292f8;
}

.fas {
  color: #0292f8;
}

.far {
  color: #0292f8;
}

button {
  background-color: #0292f8;
  color: #fff;
}

span {
  color: red;
  text-align: center;
  font-size: 10px;
}

textarea {
  width: 85%;
  height: 55px;
}

.err{
  margin-left:10px;
  margin-right: 10px;
}
.scs{
  margin-left:10px;
  margin-right: 10px;
}

@media only screen and (max-width: 450px) {
  .fas {
    font-size: 18px;
  }
  .far {
    font-size: 18px;
  }
  input {
    height: 33px;
  }
  textarea {
    height: 40px;
  }
  h3 {
    font-size: 16px;
  }

  p {
    font-size: 12px;
  }
  select {
    height: 33px;
  }
}
</style>

<script>
import axios from "axios";
import useValidate from "@vuelidate/core";
import { helpers, alphaNum, maxLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
  name: "UpdateDentistDetails",
  setup() {
    const state = reactive({
      error: "",
      success: "",
      dentistDetails: {
        type: "",
        city: "",
        phone: "",
        description: "",
      },
    });
    const rules = computed(() => {
      return {
        dentistDetails: {
          phone: {
            alphaNum: helpers.withMessage(
              "Phone must contain numbers and occasionally letters!",
              alphaNum
            ),
          },
          description: {
            maxValue: helpers.withMessage(
              "Description max character limit(255) exceeded!",
              maxLength(255)
            ),
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
  methods: {
    onUpdateSubmit() {
      this.v$.$validate();
      let checkForEmptyInput = () => {
        if (
          !this.state.dentistDetails.type &&
          !this.state.dentistDetails.city &&
          !this.state.dentistDetails.phone &&
          !this.state.dentistDetails.description
        ) {
          this.state.error = "Empty form submission!";
          this.state.success = "";
          return true;
        } else {
          console.log(this.state.dentistDetails);
          return false;
        }
      };
      if (!this.v$.$error && !checkForEmptyInput()) {
        this.state.error = "";
        axios
          .put(
            "/api/v1/dentists/details",
            this.state.dentistDetails
          )
          .then(
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
};
</script>
