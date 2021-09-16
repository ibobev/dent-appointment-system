<template>
  <div>
    <div class="line-breaker"><h2 class="text-center py-1">Comments</h2></div>
    <div id="dentist-review-content">
      <div
        class="mt-1"
        v-for="review of review_details"
        v-bind:key="review.id"
      >
        <div class="comment rounded-0 border text-justify float-left">
          <h5 class="m-2">{{ review.first_name }} {{ review.last_name }}</h5>
          <span class="m-2">{{ review.commented_on }}</span>
          <p class="m-2">{{ review.patient_comment }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#dentist-review-content {
  height: 400px;
  max-height: 400px;
  overflow-y: scroll;
}

.comment {
  background-color: #fff;
}

.line-breaker {
  /*height: 50px;*/
  background-color: #0292f8;
  color: #fff;
}

@media only screen and (max-width: 450px) {
  p {
    font-size: 12px;
  }
  h3 {
    font-size: 16px;
  }
  h6 {
    font-size: 13px;
  }
}
</style>

<script>
import axios from "axios";
export default {
  name: "DentistReview",
  data() {
    return {
      dentist_id: this.$route.params.id,
      review_details: [],
    };
  },
  methods: {
    parsePatientCommentDate() {
      this.review_details.map((review) => {
        let correct_date = new Date(review.commented_on);
        correct_date = correct_date.toLocaleDateString();
        review.commented_on = correct_date;
      });
      return this.review_details;
    },
  },
  async mounted() {
    try {
      const res = await axios.get(`/api/v1/reviews/${this.dentist_id}`);
      this.review_details = res.data.reviews;
      this.parsePatientCommentDate();
      console.log(this.review_details);
    } catch (error) {
      console.log(error.toJSON());
    }
  },
};
</script>