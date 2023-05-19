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
  comparePlaylists,
} from "@/utils/playlist";
import DupliciteItem from "@/components/deduplicator/DupliciteItem.vue";
import PlaylistPickerPlaceholder from "@/components/deduplicator/PlaylistPickerPlaceholder.vue";
import SimilarityPicker from "@/components/deduplicator/SimilarityPicker.vue";
import DupliciteToggleAction from "@/components/deduplicator/DupliciteToggleAction.vue";

type Alert = {
  title: string;
  description: string;
  type: "error" | "success" | "warning" | "info" | undefined;
  show: boolean;
};

type TrackURI = {
  uri: string;
};

const DEFAULT_MIN_SIMILARITY_LEVEL = 3;
const DEFAULT_STEP_MESSAGE = "Preparing...";
const DEFAULT_PROGRESS_STEP = 0;
const DEFAULT_ALERT: Alert = {
  title: "",
  description: "",
  type: "info",
  show: false,
};

const userStore = useUserStore();
const alert = ref(DEFAULT_ALERT);
const processing = ref(false);
const progressStep = ref(DEFAULT_PROGRESS_STEP);
const currentStepMessage = ref(DEFAULT_STEP_MESSAGE);
const similarityLevel = ref(DEFAULT_MIN_SIMILARITY_LEVEL);
const duplicates = ref<DuplicationItems[]>([]);
const allowSelect = ref(true);

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

const updateProgress = (step: number, message: string) => {
  progressStep.value = step;
  currentStepMessage.value = message;
};

const onFindingDuplicates = async () => {
  allowSelect.value = false;
  duplicates.value = [];
  processing.value = true;
  alert.value = DEFAULT_ALERT;
  updateProgress(DEFAULT_PROGRESS_STEP, DEFAULT_STEP_MESSAGE);

  let firstPlaylistItems: PlaylistTrack[] = [];
  updateProgress(25, "Fetching tracks from first playlist...");
  firstPlaylistItems = await userStore.getPlaylistTracks(
    userStore.selectedPlaylists.firstPlaylist.id
  );

  let secondPlaylistItems: PlaylistTrack[] = [];
  updateProgress(50, "Fetching tracks from second playlist...");
  secondPlaylistItems = await userStore.getPlaylistTracks(
    userStore.selectedPlaylists.secondPlaylist.id
  );

  updateProgress(75, "Finding duplicates...");
  duplicates.value = comparePlaylists(
    firstPlaylistItems,
    secondPlaylistItems,
    similarityLevel.value
  );

  if (duplicates.value.length === 0) {
    allowSelect.value = true;
  }
  updateProgress(100, "Done!");
};

const cancelChanges = () => {
  alert.value = {
    title: "Cancelled",
    description: `No changes were made to the playlists.`,
    type: "info",
    show: true,
  };
  processing.value = false;
  allowSelect.value = true;
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
    let totalDeleted =
      playlist1DeleteTracks.length + playlist2DeleteTracks.length;

    if (totalDeleted === 0) {
      alert.value = {
        title: "Done!",
        description: `No changes were made to the playlists.`,
        type: "info",
        show: true,
      };
    } else {
      alert.value = {
        title: "Success!",
        description: `Changes saved successfully. The selected songs (${totalDeleted}) have been removed from the playlists.`,
        type: "success",
        show: true,
      };
    }
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
  allowSelect.value = true;
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
          variant="tonal"
        ></v-alert>
      </v-row>
    </v-container>

    <v-container>
      <v-row v-if="userStore.playlists.loading === true">
        <v-col>
          <PlaylistPickerPlaceholder />
        </v-col>
        <v-col>
          <PlaylistPickerPlaceholder />
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col>
          <PlaylistPicker
            :playlists="userStore.playlists.playlist"
            v-if="userStore.playlists.loading === false && allowSelect === true"
            @select-update="onFirstPlaylistSelect"
          >
          </PlaylistPicker>

          <PlaylistCard
            class="grey-lighten-2"
            :selected-playlist="userStore.selectedPlaylists.firstPlaylist"
            v-if="userStore.selectedPlaylists.firstPlaylistReady"
          ></PlaylistCard>
        </v-col>

        <v-col>
          <PlaylistPicker
            :playlists="userStore.playlists.playlist"
            v-if="userStore.playlists.loading === false && allowSelect === true"
            @select-update="onSecondPlaylistSelect"
          >
          </PlaylistPicker>

          <PlaylistCard
            class="grey-lighten-2"
            :selected-playlist="userStore.selectedPlaylists.secondPlaylist"
            v-if="userStore.selectedPlaylists.secondPlaylistReady"
          ></PlaylistCard>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-if="allowSelect === true">
          <SimilarityPicker
            :similarityLevel="similarityLevel"
            @update:similarityLevel="similarityLevel = $event"
          />
        </v-col>
      </v-row>

      <v-row
        v-if="userStore.playlists.loading === false && allowSelect === true"
        justify="center"
      >
        <v-btn
          id="duplicates-button"
          prepend-icon="mdi-magnify"
          @click="onFindingDuplicates"
          variant="tonal"
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

      <v-col
        v-if="userStore.playlists.loading === false && processing !== false"
      >
        <v-divider class="my-16" />
        <h2 class="text-center font-weight-semibold mb-6">
          {{ currentStepMessage }}
        </h2>

        <v-progress-linear
          v-if="processing"
          v-model="progressStep"
          color="primary"
          :indeterminate="progressStep !== 100"
        ></v-progress-linear>
      </v-col>
    </v-container>

    <v-container>
      <v-col v-if="duplicates.length > 0" class="mb-16">
        <v-col justify="center">
          <h1 class="text-center">Found Duplicates</h1>
          <p class="text-center">
            A total of {{ duplicates.length }} duplicates were found
          </p>
          <p class="text-center">
            Select which tracks you want to delete from each playlist
          </p>
        </v-col>
      </v-col>
      <v-col v-else-if="processing === true && progressStep === 100">
        <v-row justify="center" class="pb-6">
          <h1>No Duplicates Found</h1>
        </v-row>
      </v-col>

      <!-- Loop through duplications on rows  -->
      <v-col
        v-for="(duplication, index) in duplicates"
        :key="index"
        class="mb-0"
      >
        <v-row justify="center">
          <v-chip color="blue">
            <div class="d-flex align-center">
              <v-icon start icon="mdi-information-outline" />
              <span>
                Similarity Level: {{ duplication.similarityLevel }}/4
              </span>

              <v-tooltip activator="parent" location="bottom">
                {{ getSimilarityLevelDescription(duplication.similarityLevel) }}
              </v-tooltip>
            </div>
          </v-chip>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <DupliciteItem
              :playlistName="userStore.selectedPlaylists.firstPlaylist.name"
              :track="duplication.track1"
            />

            <DupliciteToggleAction v-model="duplication.track1Delete" />
          </v-col>

          <v-col cols="12" md="6">
            <DupliciteItem
              :playlistName="userStore.selectedPlaylists.secondPlaylist.name"
              :track="duplication.track2"
            />

            <DupliciteToggleAction v-model="duplication.track2Delete" />
          </v-col>
        </v-row>
        <v-divider class="my-10"></v-divider>
      </v-col>
    </v-container>

    <v-col
      v-if="
        processing === true && progressStep === 100 && duplicates.length > 0
      "
      class="mb-6"
    >
      <v-row justify="center">
        <v-btn
          @click="saveChanges"
          class="font-weight-semibold mb-4"
          color="spotify"
          size="large"
          prepend-icon="mdi-check"
        >
          Apply Changes
        </v-btn>
      </v-row>
      <v-row @click="cancelChanges" justify="center">
        <v-btn color="red" variant="text">Cancel</v-btn>
      </v-row>
    </v-col>
  </div>
</template>
