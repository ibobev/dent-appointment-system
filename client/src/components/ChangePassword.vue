<template>
  <div
    id="change-pass"
    class="container mt-3 mb-3 shadow pt-2 pb-3 text-center"
  >
    <i class="fas fa-key fa-2x mt-2"></i>
    <h3 class="mt-3 mb-4">Change Your Password</h3>
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
    <form @submit.prevent="onChangePasswordSubmit">
      <div class="form-group mx-auto">
        <div class="input-group mt-2">
          <i class="fas fa-lock fa-2x mt-2"></i>
          <input
            type="password"
            class="form-control mt-2"
            id="current-password"
            placeholder="Current Password"
            v-model="state.pass.oldPass"
          />
        </div>
        <span v-if="v$.pass.oldPass.$error">{{
          v$.pass.oldPass.$errors[0].$message
        }}</span>
      </div>

      <div class="form-group mx-auto">
        <div class="input-group mt-2">
          <i class="fas fa-fingerprint fa-2x mt-2"></i>
          <input
            type="password"
            class="form-control mt-2"
            id="new-password"
            placeholder="New Password"
            v-model="state.pass.newPass"
          />
        </div>
        <span v-if="v$.pass.newPass.$error">{{
          v$.pass.newPass.$errors[0].$message
        }}</span>
      </div>

      <div class="form-group mx-auto">
        <div class="input-group mt-2">
          <i class="fas fa-fingerprint fa-2x mt-2"></i>
          <input
            type="password"
            class="form-control mt-2"
            id="confirm-password"
            placeholder="Confirm Password"
            v-model="state.pass.confirmPass"
          />
        </div>
        <span v-if="v$.pass.confirmPass.$error">{{
          v$.pass.confirmPass.$errors[0].$message
        }}</span>
      </div>
      <button type="submit" class="btn mt-3 mb-2">Change Password</button>
    </form>
  </div>
</template>

<style scoped>
#change-pass {
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

@media only screen and (max-width: 450px) {
  #change-pass {
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
  h3 {
    font-size: 16px;
  }

  p {
    font-size: 12px;
  }
}
</style>

<script>
import axios from "axios";
import useValidate from "@vuelidate/core";
import { helpers, minLength, sameAs, required } from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
  name: "ChangePassword",
  setup() {
    const state = reactive({
      error: "",
      success: "",
      pass: {
        oldPass: "",
        newPass: "",
        confirmPass: "",
      },
    });
    const rules = computed(() => {
      return {
        pass: {
          oldPass: {
            required: helpers.withMessage(
              "Old password is required!",
              required
            ),
          },
          newPass: {
            minLength: helpers.withMessage(
              "Password must be at least 5 characters!",
              minLength(5)
            ),
            required: helpers.withMessage(
              "New password input is required!",
              required
            ),
          },
          confirmPass: {
            minLength: helpers.withMessage(
              "Password must be at least 5 characters!",
              minLength(5)
            ),
            required: helpers.withMessage(
              "Confirm password input is required!",
              required
            ),
            sameAs: helpers.withMessage(
              "Passwords must match!",
              sameAs(state.newPass)
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
    onChangePasswordSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        axios.put("/api/v1/accounts/change-password", this.state.pass).then(
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
