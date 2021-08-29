<template>
  <form class="row mt-2">
    <div class="form-group col-auto p-0">
      <input
        type="search"
        id="search-form"
        placeholder="Search"
        class="form-control"
      />
    </div>
    <div id="criteria" class="form-group col-auto">
      <select  name="criteria-list" class="form-select">
        <option selected>Select criteria</option>
        <option value="name">Name</option>
        <option value="city">City</option>
        <option value="expertise">Expertise</option>
        <option value="rating">Rating</option>
      </select>
    </div>
    <button type="button" class="btn col-auto">
      <i class="fas fa-search"></i>
    </button>
  </form>
</template>

<style scoped>

#criteria{
  padding-left:6px;
  padding-right:6px;
}

button{
  background-color: #0292f8;
  color:#fff;
  padding-left:18px;
  padding-right: 18px;
}

</style>

<script>
export default {};
</script>