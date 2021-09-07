<template>
  <div id="global-cal-wrap">
    <div id="global-events-cal" class="m-3 shadow">
      <vue-cal
        ref="vuecal"
        :time-from="8 * 60"
        :time-to="20 * 60"
        :time-step="30"
        hide-weekends
        active-view="month"
        :disable-views="['years', 'year', 'week']"
        :cell-click-hold="false"
        :drag-to-create-event="false"
      ></vue-cal>
    </div>
  </div>
</template>

<style scoped>
#global-events-cal {
  height: 388px;
}
</style>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  name: "GlobalEventsCalendar",
  components: {
    VueCal,
  },
};
</script>