<template>
  <router-view></router-view>
</template>

<script>
export default {
  mounted() {
    this.$router.push({ path: '/admin/login' });
  }
};
</script>

<style>
</style>