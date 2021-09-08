<template>
  <div
    class="input-group input-group-sm"
    v-if="filter"
  >
    <span class="input-group-text">&gt; &equals;</span>
    <input
      type="number"
      class="form-control"
      :value="filter"
      disabled
    />
    <button
      type="button"
      class="btn btn-outline-danger"
      @click="removeFilter"
    >
      <i class="fas fa-times"></i>
    </button>
  </div>
  <button
    type="button"
    class="btn btn-sm btn-outline-primary"
    v-if="!onFilter && !filterString"
    @click="onFilter = !onFilter"
  >
    + Add
  </button>
  <div
    class="input-group"
    v-if="onFilter"
  >
    <span class="input-group-text">&gt; &equals;</span>
    <input
      type="number"
      min="0"
      max="5"
      step="0.5"
      class="form-control"
      v-model="filterString"
      v-on:keyup.enter="filterString && addFilter()"
    />
    <button
      type="button"
      class="btn btn-primary"
      :disabled="!filterString"
      @click="addFilter"
    >
      +
    </button>
    <button
      type="button"
      class="btn btn-secondary"
      @click="closeFilterInput"
    >
      -
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
      filterString: null,
      filter: '',
    }
  },
  methods: {
    addFilter: function () {
      this.onFilter = false; 

      // Hack for limiting the fitler to 0.5-5
      if (this.filterString < 0) {
        this.filterString = 0.5;
      } else if (this.filterString > 5) {
        this.filterString = 5;
      }

      this.filter = this.filterString;

      this.$emit('onFilterSet', this.filter);
    },
    removeFilter: function () {
      this.filter = null;
      this.filterString = null;

      this.$emit('onFilterRemove');
    },
    closeFilterInput: function () {
      this.filter = null;
      this.filterString = null;
      this.onFilter = false;
    }
  },
}
</script>
