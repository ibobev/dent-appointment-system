<template>
  <div>
    <div class="spinner" v-if="isLoading">
    <i class="fas fa-spinner"></i>
  </div>
  <div class="container mt-4">

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
        Type
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
            <p>
              Description:<br>
              <small class="text-muted">{{dentist.description}}</small>
            </p>
            <p>
              Rating:
              <span class="badge bg-warning fs-6">{{dentist.rating}}</span>
            </p>
            <router-link :to="'/patient/dentists/' + dentist.id" class="btn btn-sm btn-primary">View Profile</router-link>
            <button
              type="button"
              class="btn btn-sm btn-secondary ms-2"
              @click="currentlyBlacklisting= dentist.id; showBlacklistModal = !showBlacklistModal; blacklistReason = ''"
            >
              Blacklist
            </button>
          </div>
        </div>
      </div>

      <!-- Blacklist modal -->
      <div class="modal fade" v-bind:class="{'d-block show': showBlacklistModal}" style="background: rgba(0,0,0,0.35)">
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Blackist reason</h5>
              <button type="button" class="btn-close" aria-label="Close" @click="showBlacklistModal = false; currentlyBlacklisting = null; blacklistReason = ''"></button>
            </div>

            <div class="modal-body">
              <label for="blacklistReason">Reason for the blacklist</label>
              <textarea class="form-control" id="blacklistReason" v-model="blacklistReason"></textarea>
              <p class="text-muted">
                <small>By blacklisting, you will no longer see this dentists.</small>
              </p>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showBlacklistModal = false; currentlyBlacklisting = null">Close</button>
              <button
                type="button"
                class="btn btn-primary"
                v-bind:class="{'disabled': !blacklistReason.length}"
                @click="blacklistDentist"
              >
                Send
              </button>
            </div>

          </div>
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
import Filter from '@/components/Filter';
import DentistTypeFilter from '@/components/DentistTypeFilter';
import RatingFilter from '@/components/RatingFilter';

let searchTimeout = null;

export default {
  components: {
    Filter,
    DentistTypeFilter,
    RatingFilter,
  },
  data() {
    return {
      showError: false,
      isLoading: true,
      searchTerm: '',
      search: null,
      dentists: [],
      cityFilter: '',
      dentistTypeFilter: '',
      ratingFilter: null,
      showBlacklistModal: false,
      blacklistReason: '',
      currentlyBlacklisting: null,
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
    blacklistDentist: async function() {
      try {
        await axios.post('/api/v1/blacklist/dentist', { dentistId: this.currentlyBlacklisting, reason: this.blacklistReason });
      } catch (error) {
        console.log(error);
        // TODO: Show error to client
      }

      // Close the modal
      this.blacklistReason = '';
      this.showBlacklistModal = false;

      // Remove the dentist from the rest
      this.dentists = this.dentists.filter(d => d.id !== this.currentlyBlacklisting);

      this.currentlyBlacklisting = null;
    },
  },
  watch: {
    // Handle dynamic search with debounce
    searchTerm: function (newSearchTerm) {
      if (searchTimeout) {
          clearTimeout(searchTimeout);
      }
      searchTimeout = setTimeout(() => {
        this.isLoading = true;
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
