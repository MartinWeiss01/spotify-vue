<script setup lang="ts">
import PlaylistPicker from "@/components/deduplicator/PlaylistPicker.vue";
import PlaylistCard from "@/components/deduplicator/PlaylistCard.vue";
import type { UserPlaylistItem } from "@/model/UserPlaylists";
import type { PlaylistTrack } from "@/model/PlaylistTracks";
import type { DuplicationItems } from "@/model/Deduplicator";
import { useUserStore } from "@/stores/user";
import { onMounted, ref } from "vue";
import {
  getSimilarityLevelDescription,
  getTrackSimilarityLevel,
} from "@/utils/playlist";

const DEFAULT_MIN_SIMILARITY_LEVEL = 3;

const userStore = useUserStore();

onMounted(() => {
  userStore.getPlaylists();
});

type Alert = {
  title: string;
  description: string;
  type: "error" | "success" | "warning" | "info" | undefined;
  show: boolean;
};

const DEFAULT_ALERT: Alert = {
  title: "",
  description: "",
  type: "info",
  show: false,
};

const alert = ref(DEFAULT_ALERT);

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

const processing = ref(false);
const progressStep = ref(0);
const currentStepMessage = ref("Preparing...");
const duplicates = ref<DuplicationItems[]>([]);

function comparePlaylists(
  playlist1: PlaylistTrack[],
  playlist2: PlaylistTrack[]
): DuplicationItems[] {
  let duplicates: DuplicationItems[] = [];
  playlist1.forEach(track1 => {
    playlist2.forEach(track2 => {
      const similarityLevel = getTrackSimilarityLevel(
        track1.track,
        track2.track
      );
      if (similarityLevel > DEFAULT_MIN_SIMILARITY_LEVEL) {
        duplicates.push({
          track1,
          track2,
          track1Delete: false,
          track2Delete: false,
          similarityLevel,
        });
      }
    });
  });
  return duplicates;
}

const onFindingDuplicates = async () => {
  duplicates.value = [];
  processing.value = true;
  alert.value = DEFAULT_ALERT;
  progressStep.value = 0;

  let firstPlaylistItems: PlaylistTrack[] = [];
  currentStepMessage.value = "Fetching tracks from first playlist...";
  progressStep.value = 25;
  firstPlaylistItems = await userStore.getPlaylistTracks(
    userStore.selectedPlaylists.firstPlaylist.id
  );

  let secondPlaylistItems: PlaylistTrack[] = [];
  currentStepMessage.value = "Fetching tracks from second playlist...";
  progressStep.value = 50;
  secondPlaylistItems = await userStore.getPlaylistTracks(
    userStore.selectedPlaylists.secondPlaylist.id
  );

  currentStepMessage.value = "Finding duplicates...";
  progressStep.value = 75;
  duplicates.value = comparePlaylists(firstPlaylistItems, secondPlaylistItems);

  currentStepMessage.value = "Done!";
  progressStep.value = 100;
};

type TrackURI = {
  uri: string;
};

const saveChanges = async () => {
  console.log("Saving changes...");
  const playlist1DeleteTracks: TrackURI[] = [];
  const playlist2DeleteTracks: TrackURI[] = [];

  duplicates.value.forEach(duplicate => {
    if (duplicate.track1Delete) {
      playlist1DeleteTracks.push({
        uri: duplicate.track1.track.uri,
      });
    }

    if (duplicate.track2Delete) {
      playlist2DeleteTracks.push({
        uri: duplicate.track2.track.uri,
      });
    }
  });

  const playlist1Deleted = await userStore.deleteTracks(
    userStore.selectedPlaylists.firstPlaylist.id,
    playlist1DeleteTracks
  );

  const playlist2Deleted = await userStore.deleteTracks(
    userStore.selectedPlaylists.secondPlaylist.id,
    playlist2DeleteTracks
  );

  if (playlist1Deleted && playlist2Deleted) {
    alert.value = {
      title: "Success!",
      description: `Changes saved successfully. The selected songs (${
        playlist1DeleteTracks.length + playlist2DeleteTracks.length
      }) have been removed from the playlists.`,
      type: "success",
      show: true,
    };
  } else {
    alert.value = {
      title: "Something went wrong!",
      description:
        "There was a problem deleting the songs from the playlists. Please try again later.",
      type: "error",
      show: true,
    };
  }

  processing.value = false;
};
</script>
<template>
  <div class="pa-4 d-flex justify-center flex-column">
    <v-container v-if="alert.show">
      <v-row justify="center">
        <v-alert
          max-width="860"
          :type="alert.type"
          :title="alert.title"
          :text="alert.description"
        ></v-alert>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col>
          <PlaylistPicker
            :playlists="userStore.playlists.playlist"
            v-if="userStore.playlists.loading === false && processing != true"
            @select-update="onFirstPlaylistSelect"
          >
          </PlaylistPicker>
          <div v-else></div>

          <PlaylistCard
            class="grey-lighten-2"
            :selected-playlist="userStore.selectedPlaylists.firstPlaylist"
            v-if="userStore.selectedPlaylists.firstPlaylistReady"
          ></PlaylistCard>
          <div v-else></div>
        </v-col>

        <v-col>
          <PlaylistPicker
            :playlists="userStore.playlists.playlist"
            v-if="userStore.playlists.loading === false && processing != true"
            @select-update="onSecondPlaylistSelect"
          >
          </PlaylistPicker>
          <div v-else></div>

          <PlaylistCard
            class="grey-lighten-2"
            :selected-playlist="userStore.selectedPlaylists.secondPlaylist"
            v-if="userStore.selectedPlaylists.secondPlaylistReady"
          ></PlaylistCard>
          <div v-else></div>
        </v-col>
      </v-row>

      <v-row v-if="processing != true" justify="center">
        <v-btn
          @click="onFindingDuplicates"
          class="text-none font-weight-semibold"
          variant="tonal"
          elevation="4"
          :disabled="
            userStore.selectedPlaylists.firstPlaylistReady === false ||
            userStore.selectedPlaylists.secondPlaylistReady === false ||
            userStore.selectedPlaylists.firstPlaylist.id ===
              userStore.selectedPlaylists.secondPlaylist.id
          "
        >
          Find Duplicates
        </v-btn>
      </v-row>

      <v-col v-else>
        <h2 class="text-center font-weight-semibold mb-6">
          {{ currentStepMessage }}
        </h2>

        <v-progress-linear
          v-if="processing"
          v-model="progressStep"
          color="primary"
        ></v-progress-linear>
      </v-col>
    </v-container>

    <v-container>
      <v-col v-if="duplicates.length > 0" class="mb-16">
        <v-row justify="center">
          <h1>Found Duplicates</h1>
        </v-row>
        <v-row justify="center">
          <p>A total of {{ duplicates.length }} duplicates were found</p>
        </v-row>
        <v-row justify="center">
          <p>Select which tracks you want to delete from each playlist</p>
        </v-row>
      </v-col>
      <v-col
        v-else-if="
          processing === true && progressStep === 100 && duplicates.length === 0
        "
      >
        <v-row justify="center" class="pb-6">
          <h1>No Duplicates Found</h1>
        </v-row>
      </v-col>
      <!-- Loop through duplications on rows  -->
      <v-col
        v-for="(duplication, index) in duplicates"
        :key="index"
        class="mb-4"
      >
        <v-row justify="center">
          <span
            >Similarity Level: {{ duplication.similarityLevel }}/4
            <small
              >({{
                getSimilarityLevelDescription(duplication.similarityLevel)
              }})</small
            ></span
          >
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-row>
              <span>
                Playlist: {{ userStore.selectedPlaylists.firstPlaylist.name }}
              </span>
            </v-row>

            <v-row>
              <v-col>
                <v-img
                  :width="60"
                  :aspect-ratio="1"
                  :src="duplication.track1.track.album.images[0].url"
                  cover
                ></v-img>
              </v-col>

              <v-col>
                <v-row>
                  <h4>{{ duplication.track1.track.name }}</h4>
                </v-row>
                <v-row>
                  <small>{{ duplication.track1.track.album.name }}</small>
                </v-row>
                <v-row>
                  <small>
                    {{
                      duplication.track1.track.artists
                        .map(artist => artist.name)
                        .join(", ")
                    }}
                  </small>
                </v-row>
              </v-col>

              <v-col>
                <v-btn-toggle
                  v-model="duplication.track1Delete"
                  divided
                  elevation="4"
                  mandatory
                >
                  <v-btn :value="false" color="green" size="small">
                    Keep
                  </v-btn>
                  <v-btn :value="true" color="red" size="small"> Delete </v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="6">
            <v-row>
              <span>
                Playlist: {{ userStore.selectedPlaylists.secondPlaylist.name }}
              </span>
            </v-row>

            <v-row>
              <v-col>
                <v-img
                  :width="60"
                  :aspect-ratio="1"
                  :src="duplication.track2.track.album.images[0].url"
                  cover
                ></v-img>
              </v-col>

              <v-col>
                <v-row>
                  <h4>{{ duplication.track2.track.name }}</h4>
                </v-row>
                <v-row>
                  <small>{{ duplication.track2.track.album.name }}</small>
                </v-row>
                <v-row>
                  <small>
                    {{
                      duplication.track2.track.artists
                        .map(artist => artist.name)
                        .join(", ")
                    }}
                  </small>
                </v-row>
              </v-col>

              <v-col>
                <v-btn-toggle
                  v-model="duplication.track2Delete"
                  divided
                  elevation="4"
                >
                  <v-btn :value="false" color="green" size="small">
                    Keep
                  </v-btn>
                  <v-btn :value="true" color="red" size="small"> Delete </v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider class="my-3"></v-divider>
      </v-col>
    </v-container>

    <v-row
      v-if="
        processing === true && progressStep === 100 && duplicates.length > 0
      "
      justify="center"
    >
      <v-btn
        @click="saveChanges"
        class="text-none font-weight-semibold mb-6"
        color="primary"
        elevation="4"
      >
        Apply
      </v-btn>
    </v-row>
  </div>
</template>
