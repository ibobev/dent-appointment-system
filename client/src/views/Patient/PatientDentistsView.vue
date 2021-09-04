<template>
  <div class="spinner" v-if="isLoading">
    <i class="fas fa-spinner"></i>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h1>Dentists</h1>
      </div>
    </div>

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
            @click="searchTerm = ''"
          >
            <i class="fas fa-times"></i> 
          </button>
        </div>
      </div>
    </div>

    <div class="row mt-2">
      <div class="col-sm-12">
        <small class="text-muted">Filters</small>
      </div>
      <div class="col-sm-4">
        City:
        <div class="input-group input-group-sm" v-if="cityFilter && !cityFilterOn">
          <input type="text" class="form-control" :value="cityFilter" disabled/>
          <button type="button" class="btn btn-sm btn-secondary" @click="removeCityFilter">-</button>
        </div>
        <button
          type="button"
          class="btn btn-sm btn-secondary"
          @click="cityFilterOn = !cityFilterOn"
          v-if="!cityFilterOn && !cityFilter.length"
        >
          + Add
        </button>
        <div class="input-group" v-if="cityFilterOn">
          <input type="text" class="form-control" v-model="cityFilter"/>
          <button type="button" class="btn btn-sm btn-secondary" @click="addCityFilter">+</button>
        </div>
      </div>
      <div class="col-sm-4">
        rating 
      </div>
      <div class="col-sm-4">
        type 
      </div>
    </div>

    <div class="row my-3">
      <div class="col-sm-12 col-md-4 mb-4" v-for="dentist of computedDentists" v-bind:key="dentist.id">
        <div class="card shadow-sm border-0">
          <img
            :src="dentist.profilePic"
            class="card-img-top mt-2"
            alt="Dentist picture"
            height="130"
          />
          <div class="card-body">
            <h4 class="card-text">
              {{ dentist.name }}
            </h4>
            <p>City: {{dentist.city}}</p>
            <p>Email: {{dentist.email}}</p>
            <p>Type: {{dentist.dentist_type}}</p>
            <p>Description: {{dentist.description}}</p>
            <p>Rating: {{dentist.rating}}</p>
            <a href="#" class="btn btn-primary">View profile</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.spinner {
  background: rgba(0,0,0,0.7);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 100%;
  width: 83.3%;
  z-index: 9999;
  color: #fff;
}

.spinner i {
  font-size: 7rem;
  animation: spin 1.2s linear infinite;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}
</style>

<script>
import axios from 'axios';
let searchTimeout = null;

export default {
  data() {
    return {
      isLoading: true,
      searchTerm: '',
      search: null,
      dentists: [],
      cityFilterOn: false,
      cityFilter: '',
      cityFilterString: '',
    }
  },
  async mounted() {
    try {
      const req = await axios.get('/api/v1/dentists'); 
      this.dentists = req.data.dentists;
    } catch(error) {
      console.log(error.toJSON());
    }

    this.isLoading = false;
    console.log(this.dentists);
  },
  computed: {
    computedDentists() {
      // Add full name property and generate picture
      let _dentists = this.dentists.map(dentist => {
        dentist.name = `${dentist.first_name} ${dentist.last_name}`
        if (!dentist.img) {
          dentist.profilePic = `https://avatars.dicebear.com/api/open-peeps/${dentist.name}.svg`;
        }
        return dentist;
      }); 

      // City filter
      if (this.cityFilterString) {
        _dentists = _dentists.filter(dentist => dentist.city.toLowerCase() === this.cityFilterString.toLowerCase());
      }

      return _dentists;
    }
  },
  methods: {
    filterDentists: async function(term) {
      try {
        const res = await axios.get(`/api/v1/dentists?term=${term}`);
        this.dentists = res.data.dentists;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        // TODO: show error to client
      }
    },
    addCityFilter: function() {
      this.cityFilterOn = false;
      this.cityFilterString = this.cityFilter;
    },
    removeCityFilter: function() {
      this.cityFilter = '';
      this.cityFilterString = '';
    }
  },
  watch: {
    // Handle dynamic search with debounce
    searchTerm: function (newSearchTerm) {
      if (searchTimeout) {
          clearTimeout(searchTimeout);
      }
      searchTimeout = setTimeout(() => {
        // this.isLoading = true;
        console.log(newSearchTerm); 
        // NOTE: Artificial delay, probably delete
        setTimeout(() => {
          this.filterDentists(newSearchTerm);
        }, 300);
      }, 500);
    },
  }
}
</script>
