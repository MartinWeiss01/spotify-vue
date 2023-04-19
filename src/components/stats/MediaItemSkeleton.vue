<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>
<template>
  <div>
    <h1>{{ props.title }}</h1>
    <div class="pt-10 d-flex overflow-hidden">
      <v-skeleton-loader
        v-for="i in 10"
        class="mr-4 bg-grey-darken-4"
        min-width="200"
        type="image, text"
      ></v-skeleton-loader>
    </div>
  </div>
</template>
