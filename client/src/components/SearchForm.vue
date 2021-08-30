<template>
  <div id="form-wrap">
    <form @submit.prevent="onSearch" class="row mt-2 mb-2">
      <div class="form-group col-auto p-0">
        <input
          type="search"
          id="search-form"
          placeholder="Search"
          class="form-control"
          v-model="state.searchQuery"
        />
      </div>

      <div id="criteria" class="form-group col-auto">
        <select
          name="criteria-list"
          class="form-select"
          v-model="state.criteria"
        >
          <option value="" selected disabled hidden>Select criteria</option>
          <option value="name">Name</option>
          <option value="city">City</option>
          <option value="expertise">Expertise</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <button type="submit" class="btn col-auto">
        <i class="fas fa-search"></i>
      </button>
    </form>
    <div class="row mx-auto">
      <div class="col">
        <span v-if="v$.searchQuery.$error">{{
          v$.searchQuery.$errors[0].$message
        }}</span>
      </div>
      <div class="col">
        <span v-if="v$.criteria.$error">{{
          v$.criteria.$errors[0].$message
        }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
#criteria {
  padding-left: 6px;
  padding-right: 6px;
}

button {
  background-color: #0292f8;
  color: #fff;
  padding-left: 18px;
  padding-right: 18px;
  height: 24;
}

span {
  color: red;
  text-align: center;
  font-size: 10px;
}
</style>

<script>
//import axios from "axios";
import useValidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
  name: "SearchForm",
  setup() {
    const state = reactive({
      error: "",
      searchQuery: "",
      criteria: "",
    });
    const rules = computed(() => {
      return {
        searchQuery: {
          required: helpers.withMessage("Search input is required!", required),
        },
        criteria: {
          required: helpers.withMessage("Criteria is required!", required),
        },
      };
    });
    const v$ = useValidate(rules, state);
    return {
      state,
      v$,
    };
  },
  methods: {
    onSearch() {
      this.v$.$validate();
      if (!this.v$.$error) {
        //axios
        
      }
    },
  },
};
</script>
