<template>
  <div class="container text-center">
    <div class="row mt-4" v-if="state.error">
      <div class="col-6 offset-md-3">
        <div class="alert alert-danger">{{ state.error }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-6 col-lg-4 offset-md-3 offset-lg-4">
        <div id="register-page" class="container mt-3 mb-3 shadow pt-2 pb-3 text-center">
          <i class="fas fa-user-edit fa-3x mt-2"></i>
          <h3 class="mt-3 mb-4">Register</h3>
          <form @submit.prevent="onRegisterSubmit">
            <div class="form-group mx-auto">
              <div class="input-group">
                <i class="fas fa-id-card fa-2x mt-2"></i>
                <select
                  class="form-control mt-2"
                  id="roles"
                  name="role-list"
                  v-model="state.account.role"
                >
                  <option value="" selected disabled hidden>
                    Select Account Type
                  </option>
                  <option value="2">Dentist</option>
                  <option value="3">Patient</option>
                </select>
              </div>
              <span v-if="v$.account.role.$error">{{
                v$.account.role.$errors[0].$message
              }}</span>
            </div>
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

                <input
                  type="text"
                  class="form-control mt-2"
                  id="last-name"
                  placeholder="Last name"
                  v-model="state.account.lastName"
                />
              </div>
              <div class="col">
                <span class="m-3" v-if="v$.account.firstName.$error">{{
                  v$.account.firstName.$errors[0].$message
                }}</span>
                <span class="m-2" v-if="v$.account.lastName.$error">{{
                  v$.account.lastName.$errors[0].$message
                }}</span>
              </div>
            
            </div>
            <div class="form-group mx-auto">
              <div class="input-group mt-2">
                <i class="far fa-envelope fa-2x mt-2"></i>
                <input
                  type="email"
                  class="form-control mt-2"
                  id="email"
                  placeholder="Enter email"
                  v-model="state.account.email"
                />
              </div>
              <span v-if="v$.account.email.$error">{{
                v$.account.email.$errors[0].$message
              }}</span>
            </div>
            <div class="form-group mx-auto">
              <div class="input-group mt-2">
                <i class="fas fa-fingerprint fa-2x mt-2"></i>
                <input
                  type="password"
                  class="form-control mt-2"
                  id="password"
                  placeholder="Password"
                  v-model="state.account.password"
                />

                <input
                  type="password"
                  class="form-control mt-2"
                  id="password-repeat"
                  placeholder="Repeat Password"
                  v-model="state.rePassword"
                />
              </div>
              <div class="col">
              <span class="m-3" v-if="v$.account.password.$error">{{
                v$.account.password.$errors[0].$message
              }}</span>
              <span class="m-3" v-if="v$.rePassword.$error">{{
                v$.rePassword.$errors[0].$message
              }}</span>
              </div>
            </div>
            <button type="submit" class="btn mt-3 mb-2">Register</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#register-page {
  background-color: #fff;
  border-top: 4px solid #0292f8;
}
button {
  background-color: #0292f8;
  color: #fff;
  width: 50%;
}
button:hover {
  background: #5aace7;
}
.far {
  color: #0292f8;
  margin-right: 10px;
  margin-left: 10px;
}
.fas {
  color: #0292f8;
  margin-right: 10px;
  margin-left: 10px;
}

#first-name {
  margin-right: 5px;
}

#password {
  margin-right: 5px;
}
span {
  text-align: center;
  color: red;
  font-size: 10px;
}
</style>


<script>
import axios from "axios";
import useValidate from "@vuelidate/core";
import {
  required,
  email,
  alpha,
  minLength,
  sameAs,
  helpers,
} from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
  name: "Register",
  setup() {
    const state = reactive({
      type: "",
      error: "",
      account: {
        role: 3,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      rePassword: "",
    });
    const rules = computed(() => {
      return {
        account: {
          role: { required },
          email: {
            required: helpers.withMessage("Email is required", required),
            email: helpers.withMessage("Invalid email", email),
          },
          firstName: {
            required: helpers.withMessage("First name is required", required),
            alpha: helpers.withMessage("First name must contain only characters", alpha)
          },
          lastName: {
            required: helpers.withMessage("Last name is required", required),
            alpha: helpers.withMessage("Last name must must contain only characters", alpha)
          },
          password: {
            required: helpers.withMessage("Password is required", required),
            minLength: helpers.withMessage(
              "Password must be at least 5 characters",
              minLength(5)
            ),
          },
        },
        rePassword: {
          required: helpers.withMessage(
            "Repeat is required",
            required
          ),
          sameAs: helpers.withMessage(
            "Passwords must match",
            sameAs(state.account.password)
          ),
        },
      };
    });
    const v$ = useValidate(rules, state);
    return {
      state,
      v$,
    };
  },
  mounted() {
    const accountType = this.$route.params.type;
    if (accountType) {
      this.state.account.role = accountType === "patient" ? 3 : 2;
    }
  },
  methods: {
    onRegisterSubmit() {
      this.v$.$validate();
      if(!this.v$.$error){
        axios.post("/api/v1/accounts", this.state.account).then(
        (res) => {
          console.log(res.data);
          this.$router.push({ path: "/login" });
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
