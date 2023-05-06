<script setup lang="ts">
import PlaylistPicker from "@/components/deduplicator/PlaylistPicker.vue";
import PlaylistCard from "@/components/deduplicator/PlaylistCard.vue";
import type {
  UserPlaylistItem,
  UserPlaylistsEndpoint,
} from "@/model/UserPlaylists";
import { useUserStore } from "@/stores/user";
import { onMounted, ref } from "vue";
const userStore = useUserStore();

onMounted(() => {
  userStore.getPlaylists();
});
const onFirstPlaylistSelect = (playlist: UserPlaylistItem) => {
  userStore.selectedPlaylists.firstPlaylist = playlist;
  console.log(userStore.selectedPlaylists.firstPlaylist.name);
  userStore.selectedPlaylists.firstPlaylistReady = true;
};

const onSecondPlaylistSelect = (playlist: UserPlaylistItem) => {
  userStore.selectedPlaylists.secondPlaylist = playlist;
  console.log(userStore.selectedPlaylists.secondPlaylist.name);
  userStore.selectedPlaylists.secondPlaylistReady = true;
};
</script>
<template>
  <div class="pa-4 d-flex justify-center flex-column">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <PlaylistPicker
            class="mx-5"
            :playlists="userStore.playlists.playlist"
            v-if="userStore.playlists.loading === false"
            @select-update="onFirstPlaylistSelect"
          >
          </PlaylistPicker>
          <div v-else></div>
        </v-col>

        <v-col cols="12" md="6">
          <PlaylistPicker
            class="mx-5"
            :playlists="userStore.playlists.playlist"
            v-if="userStore.playlists.loading === false"
            @select-update="onSecondPlaylistSelect"
          >
          </PlaylistPicker>
          <div v-else></div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <PlaylistCard
            class="grey-lighten-2"
            :selected-playlist="userStore.selectedPlaylists.firstPlaylist"
            v-if="userStore.selectedPlaylists.firstPlaylistReady"
          ></PlaylistCard>
          <div v-else></div>
        </v-col>
        <v-col cols="12" md="6">
          <PlaylistCard
            class="grey-lighten-2"
            :selected-playlist="userStore.selectedPlaylists.secondPlaylist"
            v-if="userStore.selectedPlaylists.secondPlaylistReady"
          ></PlaylistCard>
          <div v-else></div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
