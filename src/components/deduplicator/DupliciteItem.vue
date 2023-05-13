<script setup lang="ts">
import type { PlaylistTrack } from "@/model/PlaylistTracks";

const props = defineProps<{
  playlistName: string;
  track: PlaylistTrack;
}>();
</script>

<template>
  <div class="d-flex flex-column">
    <span class="text-subtitle-2">Playlist: {{ playlistName }}</span>
    <div class="d-flex my-1">
      <div>
        <v-img
          :width="60"
          :aspect-ratio="1"
          :src="
            track.track.album?.images[0]?.url ?? '/fallbacks/no_album_image.svg'
          "
          cover
        />
      </div>

      <div class="d-flex flex-column ml-4">
        <span class="text-subtitle-2">{{ track.track.name }}</span>
        <span class="text-caption">{{ track.track.album.name }}</span>
        <small>
          {{ track.track.artists.map(artist => artist.name).join(", ") }}
        </small>
      </div>
    </div>
  </div>
</template>
