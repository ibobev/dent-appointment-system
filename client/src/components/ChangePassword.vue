<template>
  <div class="card change-pass-card shadow rounded-0">
    <div
      class="card-header text-light"
      v-bind:class="{'bg-danger': state.error, 'bg-success': state.success}"
      v-if="state.error || state.success">
      <span v-if="state.error">{{ state.error }}</span>
      <span v-if="state.success">{{ state.success }}</span>
    </div>

    <div class="card-body">
      <h4 class="card-title mb-3">
        <i class="fas fa-key"></i>
        Change password
      </h4>

      <form @submit.prevent="onChangePasswordSubmit">
        <div class="form-group text-center">
          <div class="input-group mb-1 mt-3">
            <span class="input-group-text">
              <i class="fas fa-lock fa-lg"></i>
            </span>
            <input
              type="password"
              class="form-control"
              id="current-password"
              placeholder="Current Password"
              v-model="state.pass.oldPass"
            />
          </div>
          <span class="input-error text-center" v-if="v$.pass.oldPass.$error">
            {{ v$.pass.oldPass.$errors[0].$message }}
          </span>
        </div>

        <div class="form-group text-center">
          <div class="input-group mb-1 mt-3">
            <span class="input-group-text">
              <i class="fas fa-fingerprint fa-lg"></i>
            </span>
            <input
              type="password"
              class="form-control"
              id="new-password"
              placeholder="New Password"
              v-model="state.pass.newPass"
            />
          </div>
          <span class="input-error" v-if="v$.pass.newPass.$error">
            {{ v$.pass.newPass.$errors[0].$message }}
          </span>
        </div>

        <div class="form-group text-center">
          <div class="input-group mb-2 mt-3">
            <span class="input-group-text">
              <i class="fas fa-fingerprint fa-lg"></i>
            </span>
            <input
              type="password"
              class="form-control"
              id="confirm-password"
              placeholder="Confirm Password"
              v-model="state.pass.confirmPass"
            />
          </div>
          <span class="input-error" v-if="v$.pass.confirmPass.$error">
            {{ v$.pass.confirmPass.$errors[0].$message }}
          </span>
        </div>

        <button type="submit" class="btn mt-2">Change Password</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.change-pass-card {
  background-color: #fff;
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

span.input-error {
  color: red;
  font-size: 10px;
}

@media only screen and (max-width: 450px) {
  .fas {
    font-size: 18px;
  }
  .far {
    font-size: 18px;
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
              "Current password is required!",
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
              sameAs(state.pass.newPass)
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
      this.state.success = "";
      if (!this.v$.$error) {
        axios.put("/api/v1/accounts/change-password", this.state.pass).then(
          (res) => {
            this.state.error = "";
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
