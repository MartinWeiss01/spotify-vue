<script setup lang="ts">
import LoadingSpinner from "../LoadingSpinner.vue";
</script>

<template>
  <div class="pl-4">
    <h1>Your Taste</h1>
    <div class="pt-4 d-flex justify-space-between overflow-hidden">
      <v-skeleton-loader
        v-for="i in 10"
        class="mr-2 mb-2 bg-grey-darken-4"
        min-width="150"
        max-height="50"
        type="chip"
        theme="chip"
      ></v-skeleton-loader>
    </div>
  </div>
</template>
