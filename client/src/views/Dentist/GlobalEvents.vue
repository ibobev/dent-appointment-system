<template>
  <div id="dentist-global-events" class="container">
    <div class="row">
      <h2 class="text-center mt-3">Global Events Calendar</h2>
      <div class="col-md-12 col-lg-6">
        <GlobalEventsCalendar />
      </div>
      <div class="col-md-12 col-lg-6">
        <AddGlobalEvent />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
import GlobalEventsCalendar from "../../components/GlobalEventsCalendar.vue";
import AddGlobalEvent from "../../components/AddGlobalEvent.vue";

export default {
  name: "GlobalEvents",
  components: {
    GlobalEventsCalendar,
    AddGlobalEvent,
  },
};
</script>