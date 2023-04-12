<script setup lang="ts">
import PlaceholderItemVue from "./PlaceholderItem.vue";
</script>

<template>
  <v-card class="mx-auto card-bg pa-4" max-width="600">
    Template using slots
    <v-icon icon="mdi-logout"></v-icon>
    <PlaceholderItemVue class="white-bg d-flex justify-center">
      <template #title>This is H1</template>
      <template #description> This is paragraph</template>
    </PlaceholderItemVue>
  </v-card>
</template>

<style scoped>
.card-bg {
  background-color: #1d7efa;
}

.white-bg {
  background-color: white;
}
</style>
