<template>
  <div id="dentist-global-events" class="container mt-4">
    <div class="row">
      <div class="col-md-12 col-lg-7 mb-3 mx-auto">
        <GlobalEventsCalendar />
      </div>
      <div class="col-md-12 col-lg-7 mb-3 mx-auto">
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