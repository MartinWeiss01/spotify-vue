<script setup lang="ts">
import MediaItem from "./MediaItem.vue";
import type { TopArtist } from "@/model/TopArtist";

const props = defineProps<{
  artists: TopArtist[];
}>();
</script>

<template>
  <div>
    <h1>Your Top Artists</h1>
    <v-slide-group class="pt-10 custom-arrow-positions" show-arrows>
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
