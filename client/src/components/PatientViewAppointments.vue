<template>
  <div id="patient-view-appointments">
    <div class="container mt-4">
      <div
        id="nav-appointments"
        class="col-sm-12 col-lg-12 mx-auto text-center mt-3 mb-3"
      >
        <button
          v-on:click="hideCurrent = hideCurrent=false,hideCancelled=true, hideCompleted=true"
          id="btn-current"
          class="btn-appointments-nav"
        >
          Current
        </button>
        <button
          v-on:click="hideCancelled = hideCancelled=false, hideCurrent=true, hideCompleted=true"
          id="btn-cancelled"
          class="btn-appointments-nav"
        >
          Cancelled
        </button>
        <button
          v-on:click="hideCancelled = hideCompleted=false, hideCurrent=true, hideCancelled=true"
          id="btn-cancelled"
          class="btn-appointments-nav"
        >
          Completed
        </button>
      </div>

      <div id="current" class="row" v-if="!hideCurrent">
        <h2 class="text-center">Current</h2>
        <div
          class="col-sm-12 col-lg-4 mb-4"
          v-for="appointment of inProgress"
          v-bind:key="appointment.id"
        >
          <div class="card shadow border-0 mt-3">
            <div class="card-body" id="card-top-border">
              <h4 class="card-text text-center">Appointment Details</h4>
              <div class="break-line mb-2"></div>
              <p>
                <b>Dentist:</b> {{ appointment.first_name }}
                {{ appointment.last_name }}
              </p>
              <p><b>ID:</b> {{ appointment.dentist_id }}</p>
              <p><b>Email:</b> {{ appointment.email }}</p>
              <p><b>Phone:</b> {{ appointment.phone }}</p>
              <div class="break-line mb-2"></div>
              <p><b>Appointment:</b> {{ appointment.appointment_date }}</p>
              <p><b>Address:</b> {{ appointment.city }}</p>
              <p><b>From:</b> {{ appointment.start_time }}</p>
              <p><b>To:</b> {{ appointment.end_time }}</p>
              <p><b>Status:</b> {{ appointment.status }}</p>
              <div class="break-line"></div>
            </div>
          </div>
        </div>
      </div>

      <div id="cancelled" class="row" v-if="!hideCancelled">
        <h2 class="text-center">Cancelled</h2>
        <div
          class="col-sm-12 col-lg-4 mb-4"
          v-for="appointment of cancelled"
          v-bind:key="appointment.id"
        >
          <div class="card shadow border-0 mt-3">
            <div class="card-body" id="card-top-border-red">
              <h4 class="card-text text-center">Appointment Details</h4>
              <div class="break-line-red mb-2"></div>
              <p>
                <b>Dentist:</b> {{ appointment.first_name }}
                {{ appointment.last_name }}
              </p>
              <p><b>ID:</b> {{ appointment.dentist_id }}</p>
              <p><b>Email:</b> {{ appointment.email }}</p>
              <p><b>Phone:</b> {{ appointment.phone }}</p>
              <div class="break-line-red mb-2"></div>
              <p><b>Appointment:</b> {{ appointment.appointment_date }}</p>
              <p><b>Address:</b> {{ appointment.city }}</p>
              <p><b>From:</b> {{ appointment.start_time }}</p>
              <p><b>To:</b> {{ appointment.end_time }}</p>
              <p><b>Status:</b> {{ appointment.status }}</p>
              <div class="break-line-red"></div>
            </div>
          </div>
        </div>
      </div>

      <div id="cancelled" class="row" v-if="!hideCompleted">
        <h2 class="text-center">Completed</h2>
        <div
          class="col-sm-12 col-lg-4 mb-4"
          v-for="appointment of completed"
          v-bind:key="appointment.id"
        >
          <div class="card shadow border-0 mt-3">
            <div class="card-body" id="card-top-border-green">
              <h4 class="card-text text-center">Appointment Details</h4>
              <div class="break-line-green mb-2"></div>
              <p>
                <b>Dentist:</b> {{ appointment.first_name }}
                {{ appointment.last_name }}
              </p>
              <p><b>ID:</b> {{ appointment.dentist_id }}</p>
              <p><b>Email:</b> {{ appointment.email }}</p>
              <p><b>Phone:</b> {{ appointment.phone }}</p>
              <div class="break-line-green mb-2"></div>
              <p><b>Appointment:</b> {{ appointment.appointment_date }}</p>
              <p><b>Address:</b> {{ appointment.city }}</p>
              <p><b>From:</b> {{ appointment.start_time }}</p>
              <p><b>To:</b> {{ appointment.end_time }}</p>
              <p><b>Status:</b> {{ appointment.status }}</p>
              <div class="break-line-green"></div>
              <div class="row mt-3 text-center">
              <div class="col">
                <router-link :to="'/patient/complete/' + appointment.id + '/' + appointment.dentist_id" class="btn btn-success">
                  Rate Dentist
                </router-link>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
#nav-appointments {
  width: 90%;
  background-color: #0292f8;
  color:#fff;
  border-radius: 25px;
  height: 40px;
}

.btn-appointments-nav {
  height: 40px;
  border: none;
  background-color: transparent;
  color: #fff;
}

.btn-appointments-nav:hover {
  background-color: hsla(0,0%,100%,.15);
  
}

#card-top-border {
  border-top: 4px solid #0292f8;
}

.break-line {
  width: 100%;
  border-bottom: 3px dashed #0292f8;
}

#card-top-border-red {
  border-top: 4px solid #dc3545;
}

.break-line-red {
  width: 100%;
  border-bottom: 3px dashed #dc3545;
}

#card-top-border-green{
  border-top: 4px solid #198754;
}

.break-line-green {
  border-bottom: 3px dashed #198754;
}
</style>

<script>
import axios from "axios";
export default {
  name: "PatientViewAppointments",
  data() {
    return {
      myAppointments: [],
      inProgress: [],
      cancelled: [],
      completed: [],
      hideCurrent: false,
      hideCancelled: true,
      hideCompleted: true
    };
  },
  methods: {
    correctAppointmentDate() {
      this.myAppointments.map((appointment) => {
        let correct_date = new Date(appointment.appointment_date);
        correct_date = correct_date.toLocaleDateString();
        appointment.appointment_date = correct_date;
      });
      return this.myAppointments;
    },
    currentAppointments() {
      const current = this.myAppointments.filter(
        (appointment) =>
          appointment.status === "Pending" || appointment.status === "Accepted"
      );
      return current;
    },
    cancelledAppointments() {
      const current = this.myAppointments.filter(
        (appointment) => appointment.status === "Cancelled"
      );
      return current;
    },
    completedAppointments() {
      const completed = this.myAppointments.filter(
        (appointment) => appointment.status === "Completed"
      );
      return completed;
    }
  },
  async mounted() {
    try {
      const res = await axios.get("/api/v1/appointments/history");
      this.myAppointments = res.data.p_appointments;
      this.correctAppointmentDate();
      this.inProgress = this.currentAppointments();
      this.cancelled = this.cancelledAppointments();
      this.completed = this.completedAppointments();
      //console.log(this.inProgress);
      //console.log(this.cancelled);
    } catch (error) {
      console.log(error.toJSON);
    }
  },
};
</script>