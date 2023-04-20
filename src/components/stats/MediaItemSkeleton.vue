<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>
<template>
  <div>
    <h1 class="ml-4">{{ props.title }}</h1>
    <div class="pt-4 d-flex overflow-hidden">
      <v-skeleton-loader
        v-for="i in 10"
        class="ml-4 bg-grey-darken-4"
        min-width="200"
        type="image, text"
      ></v-skeleton-loader>
    </div>
  </div>
</template>
