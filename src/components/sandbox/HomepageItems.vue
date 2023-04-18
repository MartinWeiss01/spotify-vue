<script setup lang="ts">
import PlaceholderItemVue from "./PlaceholderItem.vue";
</script>

<template>
  <v-card class="mx-auto bg-blue pa-4" max-width="600">
    Template using slots
    <v-icon icon="mdi-logout"></v-icon>
    <PlaceholderItemVue class="bg-red d-flex justify-center">
      <template #title>This is H1</template>
      <template #description> This is paragraph</template>
    </PlaceholderItemVue>
  </v-card>
</template>
