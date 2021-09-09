<template>
  <div id="global-cal-wrap">
    <div id="global-events-cal" class="mb-2 shadow">
      <vue-cal
        style="height: 388px"
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

<style>
.vuecal__cell--today {
  background-color: #d4ecfd;
}
.vuecal__now-line {
  color: #06c;
}
.vuecal__cell-events-count {
  background-color: #0292f8;
}
.vuecal__menu {
  background-color: #0292f8;
  color: #fff;
}
.vuecal__title-bar {
  background-color: #9bd0f7;
  color: rgba(0, 0, 0, 0.8);
}
.vuecal__view-btn--active {
  color: #fff;
}
.vuecal__event {
  background-color: #d4ecfd;
  color: #000;
  overflow-y:scroll;
}
button {
  color: rgba(0, 0, 0, 0.8);
}
</style>

<script>
import axios from "axios";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  name: "GlobalEventsCalendar",
  components: {
    VueCal,
  },
  data(){
    return{
      events: [],
    }
  },
  methods: {
    parseEvents() {
      this.events.map((event) => {
        let correct_date =  new Date(event.event_date);
        correct_date = new Date(correct_date.getTime() - (correct_date.getTimezoneOffset() * 60000)).toISOString();
        //console.log(correct_date);
        event.start = `${correct_date.split('T')[0]} ${event.event_start}`;
        event.end = `${correct_date.split('T')[0]} ${event.event_end}`;
        event.title = `${event.title}`;
        event.content = `${event.description}`;
      });
      return this.events;
    },
  },
  async mounted() {
    try {
      const res = await axios.get("/api/v1/events");
      this.events = res.data.globalEvents;
      this.parseEvents();
      //console.log(this.events);
    } catch (error) {
      console.log(error.toJSON());
    }
  },
};
</script>