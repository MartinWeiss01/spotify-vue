<script setup lang="ts">
import MediaItem from "./MediaItem.vue";
import type { TopArtist } from "@/model/TopArtist";

const props = defineProps<{
  artists: TopArtist[];
}>();
</script>

<template>
  <div class="relative">
    <h1 class="pl-4">Your Top Artists</h1>
    <v-container v-if="props.artists.length === 0">
      <p>Not enough data available yet</p>
    </v-container>

    <v-slide-group v-else class="pt-4 custom-arrow-positions" show-arrows>
      <MediaItem
        v-for="(artist, idx) in props.artists"
        :key="artist.id"
        :artwork="artist.images[0]?.url ?? '/fallbacks/no_artist_image.svg'"
      >
        <template #description>
          <p class="mt-2">{{ idx + 1 }}. {{ artist.name }}</p>
        </template>
      </MediaItem>
    </v-slide-group>
  </div>
</template>
