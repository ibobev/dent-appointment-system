<template>
  <div id="patient-appointment-requests">
    <div class="container mt-4">
      <div
        id="nav-appointments"
        class="col-sm-12 col-lg-12 mx-auto text-center mt-3 mb-3"
      >
      <button
          v-on:click="hidePending = hidePending=false,hideCurrent=true,hideCancelled=true"
          id="btn-pending"
          class="btn-appointments-nav"
        >
          Pending
        </button>
        <button
          v-on:click="hideCurrent = hideCurrent=false,hideCancelled=true,hidePending=true"
          id="btn-current"
          class="btn-appointments-nav"
        >
          Current
        </button>
        <button
          v-on:click="hideCancelled = hideCancelled=false, hideCurrent=true,hidePending=true"
          id="btn-cancelled"
          class="btn-appointments-nav"
        >
          Cancelled
        </button>
      </div>
      <div id="pending" class="row" v-if="!hidePending">
        <h2 class="text-center mb-3">Appointment Requests</h2>
        <div
          class="col-sm-12 col-md-4 mb-4"
          v-for="appointment of pending"
          v-bind:key="appointment.id"
        >
          <div class="card shadow border-0">
            <div class="card-body" id="card-top-border">
              <h4 class="card-text text-center">
                Request Details
              </h4>
              <div class="break-line mb-2"></div>
              <p><b>Patient:</b> {{ appointment.first_name }} {{ appointment.last_name }} </p>
              <p><b>ID:</b> {{ appointment.patient_id }}</p>
              <p><b>Email:</b> {{ appointment.email }}</p>
              <div class="break-line mb-2"></div>
              <p><b>Appointment:</b> {{ appointment.appointment_date }}</p>
              <p><b>From:</b> {{ appointment.start_time }}</p>
              <p><b>To:</b> {{ appointment.end_time }}</p>
              <p><b>Status:</b> {{ appointment.status }}</p>
              <div class="break-line"></div>
            </div>
            <div class="row mb-3 text-center">
              <div class="col">
                <button
                  class="btn btn-success"
                  v-on:click="acceptAppointment(appointment.patient_id, appointment.id)"
                >
                  Accept
                </button>
              </div>
              <div class="col">
                <button
                  class="btn btn-danger"
                  v-on:click="rejectAppointment(appointment.patient_id, appointment.id)"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="current" class="row" v-if="!hideCurrent">
        <h2 class="text-center mb-3">Accepted Appointments</h2>
        <div
          class="col-sm-12 col-md-4 mb-4"
          v-for="appointment of current"
          v-bind:key="appointment.id"
        >
          <div class="card shadow border-0">
            <div class="card-body" id="card-top-border">
              <h4 class="card-text text-center">
                Appointment Details
              </h4>
              <div class="break-line mb-2"></div>
              <p><b>Patient:</b> {{ appointment.first_name }} {{ appointment.last_name }}</p>
              <p><b>ID:</b> {{ appointment.patient_id }}</p>
              <p><b>Email:</b> {{ appointment.email }}</p>
              <div class="break-line mb-2"></div>
              <p><b>Appointment:</b> {{ appointment.appointment_date }}</p>
              <p><b>From:</b> {{ appointment.start_time }}</p>
              <p><b>To:</b> {{ appointment.end_time }}</p>
              <p><b>Status:</b> {{ appointment.status }}</p>
              <div class="break-line"></div>
            </div>
            <div class="row mb-3 text-center">
              <div class="col">
                <router-link :to="'/dentist/complete/' + appointment.id + '/' + appointment.patient_id" class="btn btn-success">
                  Complete
                </router-link>
              </div>
              <div class="col">
                <button
                  class="btn btn-danger"
                  v-on:click="rejectAppointment(appointment.patient_id, appointment.id)"
                >
                  Revoke
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="current" class="row" v-if="!hideCancelled">
        <h2 class="text-center mb-3">Cancelled Appointments</h2>
        <div
          class="col-sm-12 col-md-4 mb-4"
          v-for="appointment of cancelled"
          v-bind:key="appointment.id"
        >
          <div class="card shadow border-0">
            <div class="card-body" id="card-top-border-red">
              <h4 class="card-text text-center">
                Cancelled Details
              </h4>
              <div class="break-line-red mb-2"></div>
              <p><b>Patient:</b>{{ appointment.first_name }} {{ appointment.last_name }} </p>
              <p><b>ID:</b> {{ appointment.patient_id }}</p>
              <p><b>Email:</b> {{ appointment.email }}</p>
              <div class="break-line-red mb-2"></div>
              <p><b>Appointment:</b> {{ appointment.appointment_date }}</p>
              <p><b>Appointment ID:</b> {{ appointment.id }}</p>
              <p><b>From:</b> {{ appointment.start_time }}</p>
              <p><b>To:</b> {{ appointment.end_time }}</p>
              <p><b>Status:</b> {{ appointment.status }}</p>
              <div class="break-line-red"></div>
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
</style>

<script>
import axios from "axios";
export default {
  name: "DentistViewAppointmentRequests",
  data() {
    return {
      appointmentDetails: [],
      pending: [],
      current: [],
      cancelled: [],
      hidePending:false,
      hideCurrent:true,
      hideCancelled:true
    };
  },
  methods: {
    parsePatientAppointmentDate() {
      this.appointmentDetails.map((patient) => {
        let correct_date = new Date(patient.appointment_date);
        correct_date = correct_date.toLocaleDateString();
        patient.appointment_date = correct_date;
      });
      return this.appointmentDetails;
    },
    getPending() {
      const pending = this.appointmentDetails.filter(
        (appointment) => appointment.status === "Pending"
      );
      return pending;
    },
    getCurrent() {
      const current = this.appointmentDetails.filter(
        (appointment) => appointment.status === "Accepted"
      );
      return current;
    },
    getCancelled() {
      const cancelled = this.appointmentDetails.filter(
        (appointment) => appointment.status === "Cancelled"
      );
      return cancelled;
    },
    async acceptAppointment(patientId, appointmentId) {
      try {
        await axios.put(`/api/v1/appointments/${appointmentId}/${patientId}`);
        this._removeFromPending(appointmentId);
      } catch (error) {
        console.log(error);
      }
    },
    async rejectAppointment(patientId, appointmentId) {
      try {
        await axios.put(`/api/v1/appointments/reject/${appointmentId}/${patientId}`);
        this._removeFromPending(appointmentId);
        this._removeFromCurrent(appointmentId);
      } catch (error) {
        console.log(error);
      }
    },
    _removeFromPending(appointmentId) {
      this.pending = this.pending.filter(appointment => parseInt(appointment.id) !== parseInt(appointmentId));
    },
    _removeFromCurrent(appointmentId) {
      this.current = this.current.filter(appointment => parseInt(appointment.id) !== parseInt(appointmentId));
    }
  },
  async mounted() {
    try {
      const res = await axios.get("/api/v1/appointments/all");
      this.appointmentDetails = res.data.allAppointments.map(a => { a.status = a.status.trim(); return a});
      this.parsePatientAppointmentDate();
      this.current = this.getCurrent();
      this.pending = this.getPending();
      this.cancelled = this.getCancelled();
    } catch (error) {
      console.log(error.toJSON());
    }
  },
};
</script>
