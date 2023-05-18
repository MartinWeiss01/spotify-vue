<script setup lang="ts">
const props = defineProps<{
  genres: [string, number][];
}>();
</script>

<template>
  <div class="px-4">
    <h1>Your Taste</h1>
    <div v-if="props.genres.length === 0">
      <p class="mt-4">Not enough data available yet</p>
    </div>

    <v-container v-else>
      <v-row class="pt-4">
        <v-chip
          class="mr-2 mb-2"
          color="primary"
          label
          v-for="(genre, idx) in props.genres.slice(0, 20)"
          :key="idx"
        >
          <v-icon start icon="mdi-album"></v-icon>
          {{ idx + 1 }}. {{ genre[0] }}
        </v-chip>
      </v-row>
    </v-container>
  </div>
</template>
