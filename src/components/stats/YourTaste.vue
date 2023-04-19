<script setup lang="ts">
const props = defineProps<{
  genres: [string, number][];
}>();
</script>

<template>
  <div>
    <h1>Your Taste</h1>
    <v-container>
      <v-row>
        <v-chip
          class="mr-2 mb-2"
          color="primary"
          label
          v-for="(genre, idx) in props.genres.slice(0, 20)"
          :key="genre"
        >
          <v-icon start icon="mdi-album"></v-icon>
          {{ idx + 1 }}. {{ genre[0] }}
        </v-chip>
      </v-row>
    </v-container>
  </div>
</template>
