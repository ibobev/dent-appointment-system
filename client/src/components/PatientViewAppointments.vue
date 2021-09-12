<template>
  <div id="patient-view-appointments">
    
    <div class="row mt-4">
      <h2>In Progress</h2>
      <div
        class="col-sm-12 col-md-4 mb-4"
        v-for="appointment of inProgress"
        v-bind:key="appointment.id"
      >
        <div class="card shadow border-0">
          <div class="card-body" id="card-top-border">
            <h4 class="card-text">
              Appointment Details
            </h4>
            <div class="break-line"></div>
            <p><b>Dentist:</b> {{ appointment.first_name }} {{ appointment.last_name }}</p>
            <p><b>ID:</b> {{ appointment.dentist_id }}</p>
            <p><b>Email:</b> {{ appointment.email }}</p>
            <p><b>Phone:</b> {{appointment.phone}}</p>
            <div class="break-line"></div>
            <p><b>Appointment:</b> {{ appointment.appointment_date }}</p>
            <p><b>Address:</b> {{appointment.city}}</p>
            <p><b>From:</b> {{ appointment.start_time }}</p>
            <p><b>To:</b> {{ appointment.end_time }}</p>
            <p><b>Status:</b> {{ appointment.status }}</p>
            <div class="break-line"></div>
          </div>
        </div>
      </div>
      <h2>Cancelled</h2>
      <div
        class="col-sm-12 col-md-4 mb-4"
        v-for="appointment of cancelled"
        v-bind:key="appointment.id"
      >
        <div class="card shadow border-0">
          <div class="card-body" id="card-top-border-red">
            <h4 class="card-text">
              Appointment Details
            </h4>
            <div class="break-line-red"></div>
            <p><b>Dentist:</b> {{ appointment.first_name }} {{ appointment.last_name }}</p>
            <p><b>ID:</b> {{ appointment.dentist_id }}</p>
            <p><b>Email:</b> {{ appointment.email }}</p>
            <p><b>Phone:</b> {{appointment.phone}}</p>
            <div class="break-line-red"></div>
            <p><b>Appointment:</b> {{ appointment.appointment_date }}</p>
            <p><b>Address:</b> {{appointment.city}}</p>
            <p><b>From:</b> {{ appointment.start_time }}</p>
            <p><b>To:</b> {{ appointment.end_time }}</p>
            <p><b>Status:</b> {{ appointment.status }}</p>
            <div class="break-line-red"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

#card-top-border {
  border-top: 4px solid #0292f8;
}

.break-line{
  width:100%;
  border-bottom:3px dashed #0292f8;
}

#card-top-border-red {
  border-top: 4px solid red;
}

.break-line-red{
  width:100%;
  border-bottom:3px dashed red;
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
  },
  async mounted() {
    try {
      const res = await axios.get("/api/v1/appointments/history");
      this.myAppointments = res.data.p_appointments;
      this.correctAppointmentDate();
      this.inProgress = this.currentAppointments();
      this.cancelled = this.cancelledAppointments();
      console.log(this.inProgress);
      console.log(this.cancelled);
    } catch (error) {
      console.log(error.toJSON);
    }
  },
};
</script>