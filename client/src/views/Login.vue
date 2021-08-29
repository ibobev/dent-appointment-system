<template>
  <div class="container text-center">
    <div class="row mt-4" v-if="state.error">
      <div class="col-md-6 offset-md-3">
        <div class="alert alert-danger">{{ state.error }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-6 col-lg-4 offset-md-3 offset-lg-4">
        <div id="login-page" class="container mt-5 shadow pt-2 pb-3 text-center">
          <i class="fas fa-user-lock fa-3x mt-2"></i>
          <h3 class="mt-3 mb-4">Login</h3>
          <form @submit.prevent="onLoginSubmit">
            <div class="form-group mx-auto">
              <div class="input-group">
                <i class="far fa-envelope fa-2x mt-2"></i>
                <input
                  type="email"
                  class="form-control mt-2"
                  id="email"
                  placeholder="Enter email"
                  v-model="state.email"
                />
              </div>
              <span v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</span>
            </div>

            <div class="form-group mx-auto">
              <div class="input-group mt-2">
                <i class="fas fa-fingerprint fa-2x mt-2"></i>
                <input
                  type="password"
                  class="form-control mt-2"
                  id="password"
                  placeholder="Password"
                  v-model="state.password"
                />
              </div>
              <span v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</span>
            </div>
            <div class="form-check" id="remember-style">
              <label class="form-check-label" for="rememberMe">
                Remember me
              </label>
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="rememberMe"
                v-model="state.rememberMe"
              />
            </div>
            <button type="submit" class="btn mt-3 mb-2">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#login-page {
  background-color: #fff;
  border-top: 4px solid #0292f8;
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

button {
  background-color: #0292f8;
  color: #fff;
  width: 50%;
}
button:hover{
  background: #5aace7;
}
span {
  text-align: center;
  color: red;
  font-size: 10px;
}

#remember-style{
  width: 140px;
  padding-top: 20px;
  margin-left:auto;
  margin-right: auto;
}
</style>

<script>
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import roles from "../roles";
import auth from "../auth";


export default {
  name: "Login",
  setup() {
    const state = reactive({
      error: "",
      email: "",
      password: "",
    });
    const rules = computed(() => {
      return {
      email: { required: helpers.withMessage("Email is required!", required) },
      password: { required: helpers.withMessage("Password is required!", required) }
      };
    });
    const v$ = useValidate(rules, state);
    return {
      state,
      v$,
    };
  },
  mounted() {
    const token = auth.data().token;
    if (token) {
      const role = parseInt(auth.data().role);
      /*console.log(role);
      console.log(typeof role);*/
      if (role === roles.DENTIST) {
        //console.log('dentist');
        this.$router.push({ path: "/dentist/profile" });
      } else if (role === roles.PATIENT) {
        //console.log('patient');
        this.$router.push({ path: "/patient/profile" });
      }
    }
  },
  methods: {
    onLoginSubmit() {
      this.v$.$validate();
      if(!this.v$.$error){
      axios
        .post("/api/v1/accounts/login", {
          email: this.state.email,
          password: this.state.password,
        })
        .then(
            (res) => {
              const { token, role } = res.data;
              auth.data().setToken(token, this.state.rememberMe);
              auth.data().setRole(role, this.state.rememberMe);
              /*console.log(role);
              console.log(token);*/
              if (role === roles.DENTIST) {
                this.$router.push({ path: "/dentist/profile" });
              } else if (role === roles.PATIENT) {
                this.$router.push({ path: "/patient/profile" });
              }
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
