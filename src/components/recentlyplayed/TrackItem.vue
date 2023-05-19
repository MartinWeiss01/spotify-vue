<script setup lang="ts">
import type { RecentlyPlayedItem } from "@/model/RecentlyPlayed";
import { getTimeAgoString } from "@/utils/dateutils";

const props = defineProps<{
  track: RecentlyPlayedItem;
}>();
</script>

<template>
  <div
    class="d-flex flex-column flex-sm-row justify-sm-space-between align-sm-center mb-2"
  >
    <div class="d-flex align-sm-center">
      <div>
        <v-img
          :width="60"
          :aspect-ratio="1"
          :src="
            track.track.album?.images[0]?.url ?? '/fallbacks/no_album_image.svg'
          "
          cover
        ></v-img>
      </div>
      <div class="d-flex flex-column ml-4">
        <span class="track-name font-weight-bold">
          {{ track.track.name }}
        </span>
        <span class="artist-name">
          {{ track.track.artists.map(artist => artist.name).join(", ") }}
        </span>
        <small
          :title="`${track.played_at.toLocaleString()} UTC`"
          class="d-flex d-sm-none"
        >
          {{ getTimeAgoString(track.played_at) }}
        </small>
      </div>
    </div>

    <div>
      <span
        :title="`${track.played_at.toLocaleString()} UTC`"
        class="d-none d-sm-flex"
      >
        {{ getTimeAgoString(track.played_at) }}
      </span>
    </div>
  </div>
</template>
