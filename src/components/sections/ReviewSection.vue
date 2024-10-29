<script setup>
import { ref } from 'vue';
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
const reviews = ref([
  {
    avatar: '',
    name: 'qwqwww',
    date: '',
    comment: 'xsxsxsw',
  }
]);
</script>

<template>
  <div class="review">
    <h3 class="main__title">{{ title }}</h3>
    <main-slider 
      :items="reviews"
      :showNavigators="false"
    >
    </main-slider>
  </div>
</template>

<style lang="scss" scoped>

</style>