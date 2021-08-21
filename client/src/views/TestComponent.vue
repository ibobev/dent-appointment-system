<template>
  Test
  <button @click="onSend()">Send</button>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    onSend() {
      console.log(this);
      axios.get('/api/v1/test')
        .then(res => {
          console.log(res);
        }, err => {
          console.log(err);
        })
    },
  },
};
</script>

<style>
</style>