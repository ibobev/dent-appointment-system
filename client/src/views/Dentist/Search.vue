<template>
  <main>
    <div id="search-content" class="d-flex justify-content-center"> 
    <SearchForm />
    </div>
  </main>
</template>

<style scoped>

</style>

<script>
import SearchForm from '../../components/SearchForm.vue';
export default {
  name:"Search",
  components: {
    SearchForm,
  }
};
</script>