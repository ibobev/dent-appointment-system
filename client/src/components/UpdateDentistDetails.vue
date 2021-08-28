<template>
  <div
    id="update-details"
    class="container mt-3 mb-3 shadow pt-2 pb-3 text-center"
  >
    <i class="fas fa-edit fa-2x mt-2"></i>
    <h3 class="mt-3 mb-4">Update Work Details</h3>
    <div class="row mt-4" v-if="state.error">
      <div class="col-12">
        <div class="alert alert-danger">{{ state.error }}</div>
      </div>
    </div>
    <div class="row mt-4" v-if="state.success">
      <div class="col-12">
        <div class="alert alert-success" role="alert">{{ state.success }}</div>
      </div>
    </div>
    <form @submit.prevent="onUpdateSubmit">
      <div class="form-group mx-auto">
        <div class="input-group">
          <i class="fas fa-graduation-cap fa-2x mt-2"></i>
          <select
            class="form-control mt-2"
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
      <div class="form-group mx-auto">
        <div class="input-group mt-2">
          <i class="fas fa-map-marked-alt fa-2x mt-2"></i>
          <input
            type="text"
            class="form-control mt-2"
            id="city"
            placeholder="Enter your city"
            v-model="state.dentistDetails.city"
          />
        </div>

        <span></span>
      </div>
      <div class="form-group mx-auto">
        <div class="input-group mt-2">
          <i class="fas fa-phone fa-2x mt-2"></i>

          <input
            type="text"
            class="form-control mt-2"
            id="phone"
            placeholder="Phone number"
            v-model="state.dentistDetails.phone"
          />
        </div>
        <span v-if="v$.dentistDetails.phone.$error">{{
          v$.dentistDetails.phone.$errors[0].$message
        }}</span>
      </div>
      <div class="form-group mx-auto">
        <div class="input-group mt-2">
          <i class="fas fa-scroll fa-2x mt-2"></i>
          <textarea
            name="description"
            placeholder="Enter short description here..."
            v-model="state.dentistDetails.description"
          ></textarea>
        </div>
        <span v-if="v$.dentistDetails.description.$error">{{
          v$.dentistDetails.description.$errors[0].$message
        }}</span>
      </div>

      <button type="submit" class="btn mt-3 mb-2">Update</button>
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

span {
  color: red;
  text-align: center;
  font-size: 10px;
}

textarea {
  width: 85%;
  height: 55px;
}

@media only screen and (max-width: 450px) {
  #update-details {
    width: 320px;
  }
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
            "/api/v1/dentists/update-dentist-details",
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
