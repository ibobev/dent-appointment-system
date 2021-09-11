<template>
  <div id="dentist-appointments">
    <div id="calendar-appointment" class="shadow">
      <vue-cal
        :time-from="8 * 60"
        :time-to="20 * 60"
        :time-step="30"
        hide-weekends
        active-view="month"
        :events="events"
        :disable-views="['years', 'year', 'week']"
        :cell-click-hold="false"
        :drag-to-create-event="false"
      >
      </vue-cal>
    </div>
  </div>
</template>

<style scoped>
#calendar-appointment {
  height: 500px;
}
</style>

<script>
import axios from "axios";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
export default {
  name: "DentistAppointmentCalendar",
  components: {
    VueCal,
  },
  data() {
    return {
      events: [],
    };
  },
  async mounted() {
    try {
      const res = await axios.get("/api/v1/appointments");
      this.events = res.data.dentistAppointments;
      this.parseEvents();
      //console.log(this.events);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    parseEvents() {
      this.events.map((event) => {
        let correct_date = new Date(event.appointment_date);
        correct_date = new Date(
          correct_date.getTime() - correct_date.getTimezoneOffset() * 60000
        ).toISOString();
        //console.log(correct_date);
        event.start = `${correct_date.split("T")[0]} ${event.start_time}`;
        event.end = `${correct_date.split("T")[0]} ${event.end_time}`;
        event.title = `${event.title}`;
      });
      return this.events;
    },
  },
};
</script>