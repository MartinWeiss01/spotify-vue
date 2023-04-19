<script setup lang="ts">
import ItemWithArtwork from "./ItemWithArtwork.vue";
import { TopTrack } from "@/model/TopTrack";

const props = defineProps<{
  tracks: TopTrack[];
}>();
</script>

<template>
  <div>
    <h1>Your Top Tracks</h1>
    <v-slide-group class="pt-10 custom-arrow-positions" show-arrows>
      <ItemWithArtwork
        v-for="(track, idx) in props.tracks"
        :key="track.id"
        :artwork="track.album.images[0].url"
      >
        <template #description>
          <p class="mt-2">{{ idx + 1 }}. {{ track.name }}</p>
          <small>{{ track.artists[0].name }}</small>
        </template>
      </ItemWithArtwork>
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
