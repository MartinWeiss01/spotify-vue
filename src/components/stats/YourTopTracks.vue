<script setup lang="ts">
import MediaItem from "./MediaItem.vue";
import type { TopTrack } from "@/model/TopTrack";

const props = defineProps<{
  tracks: TopTrack[];
}>();
</script>

<template>
  <div>
    <h1>Your Top Tracks</h1>
    <v-slide-group class="pt-10 custom-arrow-positions" show-arrows>
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

<style>
.custom-arrow-positions {
  position: relative;
}

.custom-arrow-positions .v-slide-group__prev {
  position: absolute;
  top: 0px;
  right: 4rem;
}
.custom-arrow-positions .v-slide-group__next {
  position: absolute;
  top: 0px;
  right: 0;
}
</style>
