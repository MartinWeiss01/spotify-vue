<script setup lang="ts">
import MediaItem from "./MediaItem.vue";
import type { TopTrack } from "@/model/TopTrack";

const props = defineProps<{
  tracks: TopTrack[];
}>();
</script>

<template>
  <div class="relative">
    <h1 class="pl-4">Your Top Tracks</h1>
    <v-slide-group class="pt-4 custom-arrow-positions" show-arrows>
      <MediaItem
        v-for="(track, idx) in props.tracks"
        :key="track.id"
        :artwork="
          track.album?.images[0]?.url ?? '/fallbacks/no_album_image.svg'
        "
      >
        <template #description>
          <p class="mt-2">{{ idx + 1 }}. {{ track.name }}</p>
          <small>{{ track.artists[0].name }}</small>
        </template>
      </MediaItem>
    </v-slide-group>
  </div>
</template>
