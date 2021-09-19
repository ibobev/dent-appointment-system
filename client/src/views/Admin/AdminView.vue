<template>
  <div class="container">
    <!-- Navigation -->
    <AdminNavigation />
    <!-- Nested views -->
    <router-view></router-view>
  </div>
</template>

<style scoped>
</style>

<script>
import AdminNavigation from './AdminNavigation.vue';

export default {
  components: { AdminNavigation },
};
</script>

