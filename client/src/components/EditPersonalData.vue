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
          <i class="fas fa-pen fa-2x mt-2"></i>
          <input
            type="text"
            class="form-control mt-2"
            id="first-name"
            placeholder="First name"
            v-model="state.account.firstName"
          />
        </div>
        <div class="col">
          <span ></span>
        </div>
      </div>
      <div class="form-group mx-auto">
        <div class="input-group mt-2">
          <i class="fas fa-pen fa-2x mt-2"></i>
          <input
            type="text"
            class="form-control mt-2"
            id="last-name"
            placeholder="Last name"
            v-model="state.account.lastName"
          />
        </div>
        <div class="col">
          <span ></span>
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
            v-model="state.account.email"
          />
        </div>
        <span ></span>
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

span{
  color:red;
  text-align: center;
  font-size: 10px;
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
import axios from "axios";
import useValidate from "@vuelidate/core";
import {
  email,
  helpers,
} from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
  name: "EditPersonalData",
  setup() {
    const state = reactive({
      error: "",
      account: {
        firstName: "",
        lastName: "",
        email:""
      },
    });
    const rules = computed(() => {
      return {
        account: {
          email : {
            email: helpers.withMessage("Invalid email", email),
          },
        }
      };
    });
    const v$ = useValidate(rules, state);
    return {
      state,
      v$,
    };
  },
  methods: {
    onPersonalUpdateSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        axios.post("api/v1/accounts/update", this.state.account).then(
          (res) => {
            console.log(res.data);
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
  }

};
</script>
