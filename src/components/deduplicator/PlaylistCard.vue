<template>
  <div class="d-flex mb-6">
    <v-card class="mx-auto pa-4 bg-grey-lighten-5" max-width="220">
      <v-img
        :src="selectedPlaylist.images[0].url"
        width="200"
        aspect-ratio="1/1"
        cover
      ></v-img>
      <h4>{{ selectedPlaylist.name }}</h4>
      <span>Owner:{{ selectedPlaylist.owner.display_name }}</span
      ><br />
      <span> Public:{{ selectedPlaylist.public ? "Yes" : "No" }}</span>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { UserPlaylistItem } from "@/model/UserPlaylists";

const props = defineProps<{
  selectedPlaylist: UserPlaylistItem;
}>();
const print = () => {
  console.log(props.selectedPlaylist?.name);
};
</script>
