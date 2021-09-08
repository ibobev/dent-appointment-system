<template>
  <div
    id="add-global-events"
    class="card shadow rounded-0 mb-3 text-center"
  >
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
        <i class="fas fa-calendar"></i>
        Add Global Event
      </h4>
      <form @submit.prevent="onAddGlobalEvent">
        <div class="form-group text-center mb-3">
          <div class="input-group">
            <span class="input-group-text">
              <i class="fas fa-heading fa-lg"></i>
            </span>
            <input
              type="text"
              class="form-control"
              id="title"
              placeholder="Event Title"
              v-model="state.event.title"
            />
          </div>
          <span class="input-error" v-if="v$.event.title.$error">
            {{ v$.event.title.$errors[0].$message }}
          </span>
        </div>
        <div class="form-group text-center mb-3">
          <div class="input-group">
            <span class="input-group-text">
              <i class="fas fa-calendar-day fa-lg"></i>
            </span>
            <label class="px-2" for="event-date">Date:</label>
            <input type="date" id="event-date-start" v-model="state.event.date"/>
            <span class="input-error" v-if="v$.event.date.$error">
              {{ v$.event.date.$errors[0].$message }}
            </span>
          </div>
        </div>
        <div class="form-group text-center mb-3">
          <div class="input-group">
            <span class="input-group-text">
              <i class="far fa-clock fa-lg"></i>
            </span>
            <label class="px-2" for="start-time">From:</label>
            <input id="start-time" type="time" v-model="state.event.start"/>
            <span class="input-error" v-if="v$.event.start.$error">
              {{ v$.event.start.$errors[0].$message }}
            </span>
          </div>
        </div>
        <div class="form-group text-center mb-3">
          <div class="input-group">
            <span class="input-group-text">
              <i class="fas fa-clock fa-lg"></i>
            </span>
            <label class="px-3" for="end-time">To:</label>
            <input id="end-time" type="time" v-model="state.event.end" />
            <span class="input-error" v-if="v$.event.end.$error">
              {{ v$.event.end.$errors[0].$message }}
            </span>
          </div>
        </div>
        <div class="form-group text-center mb-3">
          <div class="input-group">
            <span class="input-group-text">
              <i class="fas fa-scroll fa-md"></i>
            </span>
            <textarea
              name="description"
              class="form-control"
              placeholder="Enter event description here..."
              v-model="state.event.description"
            ></textarea>
          </div>
          <span class="input-error" v-if="v$.event.description.$error">
            {{ v$.event.description.$errors[0].$message }}
          </span>
        </div>
        <button type="submit" class="btn">Add Event</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
#add-global-events {
  border-top: 4px solid #0292f8;
}

button {
  background-color: #0292f8;
  color: #fff;
}

.fas {
  color: #0292f8;
}

.far {
  color: #0292f8;
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
  name: "AddGlobalEvent",
  setup() {
    const state = reactive({
      error: "",
      success: "",
      event: {
        title: "",
        description: "",
        date: "",
        start: "",
        end: "",
      },
    });
    const rules = computed(() => {
      return {
        event: {
          title: {
            required: helpers.withMessage("Title is required!", required),
          },
          description: {
            maxValue: helpers.withMessage(
              "Description max character limit(255) exceeded!",
              maxLength(255)
            ),
            required: helpers.withMessage("Description is required", required),
          },
          date: {
            required: helpers.withMessage("Date is required!", required),
          },
          start: {
            required: helpers.withMessage(
              "Starting time is required!",
              required
            ),
          },
          end: {
            required: helpers.withMessage("Ending time is required!", required),
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
    onAddGlobalEvent() {
      this.v$.$validate();
      if (!this.v$.$error) {
        axios.post("/api/v1/events", this.state.event).then(
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