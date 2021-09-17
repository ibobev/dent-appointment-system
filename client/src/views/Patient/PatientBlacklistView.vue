<template>
  <div class="container">

    <div class="row">
      <div class="col-sm-12">
        <h2>Blacklisted dentists</h2>
      </div>
    </div>

    <!-- Search -->
    <div class="row">
      <div class="col-sm-12">
        <div class="input-group">
          <span class="input-group-text">
            <i class="fas fa-search"></i>
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Search..."
            v-model="searchTerm"
          />
          <button
            type="button"
            class="btn btn-outline-secondary"
            v-if="searchTerm.length"
            @click="searchTerm = ''"
          >
            <i class="fas fa-times"></i> 
          </button>
        </div>
      </div>
    </div>


    <!-- Filters -->
    <div class="row mt-2">
      <div class="col-sm-12">
        <small class="text-muted">Filters</small>
      </div>

      <div class="col-sm-4">
        City:
        <Filter
          @onFilterSet="onCityFilterSet"
          @onFilterRemove="onCityFilterRemove"
        />
      </div>

      <div class="col-sm-4">
        Type:
        <DentistTypeFilter
          @onFilterSet="onDentistTypeFilterSet"
          @onFilterRemove="onDentistTypeFilterRemove"
        />
      </div>

      <div class="col-sm-4">
        Rating:
        <RatingFilter
          @onFilterSet="onRatingFilterSet"
          @onFilterRemove="onRatingFilterRemove"
        />
      </div>
    </div>

    <!-- Dentists list -->
    <div class="row my-3">
      <div class="col-md-12 col-lg-6" v-for="dentist of computedDentists" :key="dentist.dentist_id">
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-sm-4">
              <img :src="dentist.profilePic" class="img-fluid rounded-start" alt="Dentist profile picture">
            </div>
            <div class="col-sm-8">
              <div class="card-body">
                <p class="mb-1 text-muted">
                  Blackilsted on: <br> {{ dentist.blacklistDate }}
                </p>
                <h4 class="card-title"> {{ dentist.name }} </h4>
                <p class="mb-1">Email: <strong>{{ dentist.email }}</strong></p>
                <p class="mb-1">City: <strong>{{ dentist.city }}</strong></p>
                <p class="mb-1">Phone: <strong>{{ dentist.phone }}</strong></p>
                <p class="mb-1">Type: <strong>{{ dentist.dentist_type }}</strong></p>
                <h5>Reason for blacklisting:</h5>
                <p class="card-text">{{ dentist.reason }}</p>
                <button type="button" class="btn btn-sm btn-primary" @click="removeFromBlacklist(dentist.dentist_id)">
                  Un-blacklist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scope>
</style>

<script>
import Filter from '@/components/Filter';
import DentistTypeFilter from '@/components/DentistTypeFilter';
import RatingFilter from '@/components/RatingFilter';
import axios from 'axios';

export default {
  components: {
    Filter,
    DentistTypeFilter,
    RatingFilter,
  },
  data() {
    return {
      dentists: [],
      searchTerm: '',
      search: null,
      cityFilter: '',
      dentistTypeFilter: '',
      ratingFilter: null,
      searchTimeout: null,
    } 
  },
  async mounted() {
    try {
      let apiResp = await axios.get('/api/v1/patients/blacklist'); 
      this.dentists = apiResp.data.dentists;
      console.log(apiResp.data);
    } catch (error) {
      console.log(error);
    } 
  },
  computed: {
    computedDentists() {
      // Add full name property and generate picture
      let _dentists = this.dentists.map(dentist => {
        dentist.name = `${dentist.first_name} ${dentist.last_name}`

        const blacklistDate = (new Date(dentist.blacklist_date)).toUTCString()
        dentist.blacklistDate = blacklistDate.substring(0, blacklistDate.lastIndexOf(' '));

        if (!dentist.img) {
          dentist.profilePic = `https://avatars.dicebear.com/api/open-peeps/${dentist.name}.svg`;
        }

        return dentist;
      }); 

      // Apply city filter if any
      if (this.cityFilter) {
        _dentists = _dentists.filter(dentist => dentist.city && dentist.city.toLowerCase() === this.cityFilter.toLowerCase());
      }

      // Apply dentist type filter if any
      if (this.dentistTypeFilter) {
        _dentists = _dentists.filter(dentist => dentist.dentist_type && dentist.dentist_type.toLowerCase() === this.dentistTypeFilter.toLowerCase());
      }

      // Apply rating filter if any
      if (this.ratingFilter) {
        _dentists = _dentists.filter(dentist => dentist.rating && dentist.rating >= this.ratingFilter);
      }

      // Filtered dentists
      return _dentists;
    }
  },
  watch: {
    // Handle dynamic search with debounce
    searchTerm: function (newSearchTerm) {
      if (this.searchTimeout) {
          clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        console.log(newSearchTerm); 
        // NOTE: Artificial delay, probably delete
        setTimeout(() => {
          this.filterDentists(newSearchTerm);
        }, 300);
      }, 500);
    },
  },
  methods: {
    filterDentists: async function(term) {
      try {
        const res = await axios.get(`/api/v1/patients/blacklist?term=${term}`);
        this.dentists = res.data.dentists;
      } catch (error) {
        console.log(error);
        // TODO: show error to client
      }
    },
    onCityFilterSet: function (cityFilterValue) {
      this.cityFilter = cityFilterValue;
    },
    onCityFilterRemove: function () {
      this.cityFilter = '';
    },
    onDentistTypeFilterSet: function (dentistTypeFilterValue) {
      this.dentistTypeFilter = dentistTypeFilterValue;
    },
    onDentistTypeFilterRemove: function () {
      this.dentistTypeFilter = '';
    },
    onRatingFilterSet: function (ratingFilter) {
      this.ratingFilter = ratingFilter;
    },
    onRatingFilterRemove: function () {
      this.ratingFilter = null;
    },
    removeFromBlacklist: async function (dentistId) {
      if (!confirm('Are you sure?')) {
        return;
      }

      try {
        await axios.delete(`/api/v1/patients/blacklist/${dentistId}`);

        // Remove from list
        this.dentists = this.dentists.filter(
          dentist => dentist.dentist_id !== dentistId
        );
      } catch (error) {
        console.log(error.toJSON());
      }
    },
  },
}

</script>
