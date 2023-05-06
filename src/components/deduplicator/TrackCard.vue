<script setup lang="ts">
import { PlaylistTrack } from "@/model/PlaylistTracks";
import { defineProps } from "vue";

const props = defineProps({
  track: {
    type: Object as () => PlaylistTrack,
    required: true,
  },
  trackDelete: {
    type: Boolean,
    required: true,
  },
});

const { track, trackDelete } = props;
</script>

<template>
  <v-col>
    <v-row>
      <v-col>
        <v-img
          :width="60"
          :aspect-ratio="1"
          :src="track.track.album.images[0].url"
          cover
        ></v-img>
      </v-col>
      <v-col>
        <v-row
          ><h4>{{ track.track.name }}</h4></v-row
        >
        <v-row
          ><small>{{ track.track.album.name }}</small></v-row
        >
        <v-row>
          <small>{{
            track.track.artists
              .map(artist => artist.name)
              .join(", ")
              .slice(0, -1)
          }}</small>
        </v-row>
      </v-col>
      <v-col>
        <v-btn-toggle
          v-model="trackDelete"
          divided
          elevation="4"
          mandatory
          @change="$emit('update:trackDelete', trackDelete)"
        >
          <v-btn :value="false" color="green" size="small">Keep</v-btn>
          <v-btn :value="true" color="red" size="small">Delete</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
  </v-col>
</template>
