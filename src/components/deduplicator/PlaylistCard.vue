<script setup lang="ts">
import type { UserPlaylistItem } from "@/model/UserPlaylists";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const props = defineProps<{
  selectedPlaylist: UserPlaylistItem;
}>();
</script>

<template>
  <div class="d-flex mb-6">
    <v-card class="mx-auto pa-4 bg-grey-darken-4" max-width="220">
      <v-img
        :src="
          selectedPlaylist?.images[0]?.url ?? '/fallbacks/no_playlist_image.svg'
        "
        width="200"
        aspect-ratio="1/1"
        cover
      />
      <h4 class="mt-3">{{ selectedPlaylist.name }}</h4>
      <p>{{ selectedPlaylist.tracks.total }} tracks</p>
      <small>by {{ selectedPlaylist.owner.display_name }}</small>
      <v-divider class="my-3"></v-divider>
      <v-container>
        <v-row justify="space-between">
          <v-chip color="blue" label>
            <v-icon start icon="mdi-account-circle-outline"></v-icon>
            {{
              selectedPlaylist.owner.id === authStore.user.id
                ? "Owned"
                : "Following"
            }}
          </v-chip>
          <v-chip color="pink" label>
            <v-icon start icon="mdi-earth"></v-icon>
            {{ selectedPlaylist.public ? "Public" : "Private" }}
          </v-chip>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
