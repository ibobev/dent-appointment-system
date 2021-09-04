<template>
  <div class="card personal-details-card shadow rounded-0">
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
        <i class="far fa-edit"></i>
        Edit Account Details
      </h4>

      <form @submit.prevent="onEditDetails">
        <div class="form-group text-center mb-3">
          <div class="input-group">
            <span class="input-group-text">
              <i class="fas fa-pen fa-lg"></i>
            </span>
            <input
              type="text"
              class="form-control"
              id="first-name"
              placeholder="First name"
              v-model="state.account.firstName"
            />
          </div>
          <span class="input-error" v-if="v$.account.firstName.$error">
            {{ v$.account.firstName.$errors[0].$message }}
          </span>
        </div>

        <div class="form-group text-center mb-3">
          <div class="input-group">
            <span class="input-group-text">
              <i class="fas fa-pen fa-lg"></i>
            </span>
            <input
              type="text"
              class="form-control"
              id="last-name"
              placeholder="Last name"
              v-model="state.account.lastName"
            />
          </div>
          <span class="input-error" v-if="v$.account.lastName.$error">
            {{ v$.account.lastName.$errors[0].$message }}
          </span>
        </div>

        <div class="form-group text-center mb-3">
          <div class="input-group">
            <span class="input-group-text">
              <i class="far fa-envelope fa-lg"></i>
            </span>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Enter new email"
              v-model="state.account.email"
            />
          </div>
          <span class="input-error" v-if="v$.account.email.$error">
            {{ v$.account.email.$errors[0].$message }}
          </span>
        </div>

        <button type="submit" class="btn">Update</button>
      </form>

    </div>
  </div>
</template>

<style scoped>
.personal-details-card {
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
  text-align: center;
  font-size: 10px;
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

  p {
    font-size: 12px;
  }
}
</style>

<script>
import axios from "axios";
import useValidate from "@vuelidate/core";
import { email, alpha, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
  name: "EditPersonalData",
  setup() {
    const state = reactive({
      error: "",
      success: "",
      account: {
        firstName: "",
        lastName: "",
        email: "",
      },
    });
    const rules = computed(() => {
      return {
        account: {
          firstName: {
            alpha: helpers.withMessage(
              "Name must contain alpha characters only!",
              alpha
            ),
          },
          lastName: {
            alpha: helpers.withMessage(
              "Name must contain alpha characters only!",
              alpha
            ),
          },
          email: {
            email: helpers.withMessage("Invalid email!", email),
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
    onEditDetails() {
      this.v$.$validate();
      let checkForEmptyInput = () => {
        if (
          !this.state.account.firstName &&
          !this.state.account.lastName &&
          !this.state.account.email
        ) {
          this.state.error = "Empty form submission!";
          this.state.success = "";
          return true;
        } else {
          return false;
        }
      };
      if (!this.v$.$error && !checkForEmptyInput()) {
        this.state.error = "";
        axios.put("/api/v1/accounts/update-account", this.state.account).then(
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
