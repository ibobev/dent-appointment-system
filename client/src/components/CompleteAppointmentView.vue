<template>
  <div id="appointment-details" class="col">
    <div
      v-for="appointment of details"
      v-bind:key="appointment.id"
    >
      <div class="card shadow border-0">
        <div class="card-body" id="card-top-border">
          <h4 class="card-text text-center">Appointment Details</h4>
          <div class="break-line mb-2"></div>
          <p>
            <b>Patient:</b> {{ appointment.first_name }} {{ appointment.last_name }}
          </p>
          <p><b>ID:</b> {{ appointment.patient_id }}</p>
          <p><b>Email:</b> {{ appointment.email }}</p>
          <div class="break-line mb-2"></div>
          <p><b>Appointment:</b> {{ appointment.appointment_date }}</p>
          <p><b>From:</b> {{ appointment.start_time }}</p>
          <p><b>To:</b> {{ appointment.end_time }}</p>
          <p><b>Status:</b> {{ appointment.status }}</p>
          <div class="break-line"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

#card-top-border {
  border-top: 4px solid #0292f8;
}

.break-line {
  width: 100%;
  border-bottom: 3px dashed #0292f8;
}
</style>

<script>
import axios from "axios";
export default {
  name: "CompleteAppointmentView",
  data() {
    return {
      appointment_id: this.$route.params.a_id,
      details: [],
    };
  },
  methods: {
    parseAppointmentDate() {
      this.details.map((appointment) => {
        let correct_date = new Date(appointment.appointment_date);
        correct_date = correct_date.toLocaleDateString();
        appointment.appointment_date = correct_date;
      });
      return this.details;
    },
  },
  async mounted() {
    try {
      const res = await axios.get(
        `/api/v1/appointments/${this.appointment_id}`
      );
      this.details = res.data.appointmentDetails;
      this.parseAppointmentDate();
      //console.log(this.details);
    } catch (error) {
      console.log(error.toJSON());
    }
  },
};
</script>