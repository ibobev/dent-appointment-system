<template>
  <div id="dentist-review-content" class="shadow mb-3">
    <h3 class="text-center mt-3">What People Say About You</h3>
    <div class="comment-content">
      <h6>Patient Name</h6>
      <p>
        Patient Comment Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Explicabo sit perspiciatis repudiandae unde velit? Ratione
        voluptatem omnis sed id rem officia vel quas? Neque earum magnam optio
        recusandae libero exercitationem!
      </p>
    </div>
    <div class="comment-content">
      <h6>Patient Name</h6>
      <p>
        Patient Comment Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Iste quam natus ducimus! Eveniet et ad quam maiores id nesciunt
        doloremque sapiente, officiis, dolorem quod aliquid vero, at debitis
        amet deleniti?
      </p>
    </div>
    <div class="comment-content">
      <h6>Patient Name</h6>
      <p>
        Patient Comment Lorem ipsum dolor sit amet consectetur adipisicing elit.
        In aut delectus iusto? Omnis non corporis dolores deleniti illum nostrum
        aliquam explicabo, autem odit obcaecati, officia praesentium ad! Minus,
        dicta atque.
      </p>
    </div>
    <div class="comment-content">
      <h6>Patient Name</h6>
      <p>
        Patient Comment Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Eligendi consequatur neque aliquam nam voluptatum. Minima ducimus
        accusamus reprehenderit explicabo optio voluptatum, sint sapiente
        laudantium saepe nostrum sequi. Ad, doloremque ipsa.
      </p>
    </div>
    <div class="comment-content">
      <h6>Patient Name</h6>
      <p>
        Patient Comment Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quo dolorum porro fuga expedita distinctio tenetur ea accusamus rem
        eveniet aut voluptatum architecto laborum facere, dolorem provident quam
        temporibus! Nesciunt, amet.
      </p>
    </div>
    <div class="comment-content">
      <h6>Patient Name</h6>
      <p>
        Patient Comment Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Non dignissimos esse excepturi vero est deleniti magni nobis, ex,
        earum saepe quis quam itaque neque molestiae officiis in quos. Deserunt,
        fugit!
      </p>
    </div>
  </div>
</template>

<style scoped>
#dentist-review-content {
  background-color: #fff;
  width: 100%;
  margin-left: 20px;
  margin-right: 15px;
  max-height: 460px;
  border-top: 4px solid #0292f8;
  overflow-y: scroll;
}

.comment-content {
  margin-left: 20px;
  display: inline-block;
}
h6 {
  font-weight: bold;
}

@media only screen and (max-width: 1401px) {
  #dentist-review-content {
    width: 390px;
    margin-left: auto;
    margin-right: auto;
  }
}

@media only screen and (max-width: 450px) {
  #dentist-review-content {
    width: 320px;
  }
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
export default {
  name: "DentistReview",
};
</script>