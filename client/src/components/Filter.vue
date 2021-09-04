<template>
  <div
    class="input-group input-group-sm"
    v-if="filter.length"
  >
    <input
      type="text"
      class="form-control"
      :value="filter"
      disabled
    />
    <button
      type="button"
      class="btn btn-secondary"
      @click="removeFilter"
    >
      -
    </button>
  </div>
  <button
    type="button"
    class="btn btn-sm btn-outline-secondary"
    v-if="!onFilter && !filterString.length"
    @click="onFilter = !onFilter"
  >
    + Add
  </button>
  <div
    class="input-group"
    v-if="onFilter"
  >
    <input
      type="text"
      class="form-control"
      v-model="filterString"
      v-on:keyup.enter="filterString.length && addFilter()"
    />
    <button
      type="button"
      class="btn btn-secondary"
      :disabled="!filterString.length"
      @click="addFilter"
    >
      +
    </button>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  name: 'Filter',
  emits: [
    'onFilterSet',
    'onFilterRemove',
  ],
  data() {
    return {
      onFilter: false,
      filterString: '',
      filter: '',
    }
  },
  methods: {
    addFilter: function () {
      this.onFilter = false; 
      this.filter = this.filterString;

      this.$emit('onFilterSet', this.filter);
    },
    removeFilter: function () {
      this.filter = '';
      this.filterString = '';

      this.$emit('onFilterRemove');
    }
  },
}
</script>
