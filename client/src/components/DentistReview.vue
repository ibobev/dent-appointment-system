<template>
  <div id="dentist-review-content" class="container shadow mb-2">
    <h3 class="text-center mt-2">Reviews</h3>
    <div class="break-line mb-2"></div>
    <div
      class="col-sm-12 col-lg-12 mb-2"
      v-for="review of review_details"
      v-bind:key="review.id"
    >
      <p class="m-0"><b>{{ review.first_name }} {{ review.last_name }}</b> </p>
      <p class="m-0"><b>Comment:</b> {{ review.patient_comment }}</p>
      <p><b> Date:</b> {{ review.commented_on }}</p>
      <div class="break-line"></div>
    </div>
  </div>
</template>

<style scoped>
#dentist-review-content {
  background-color: #fff;
  height: 400px;
  max-height: 400px;
  border-top: 4px solid #0292f8;
  overflow-y: scroll;
}

.break-line{
  border-bottom: solid 2px #0292f8;
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