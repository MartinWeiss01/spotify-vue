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
import DupliciteItem from "@/components/deduplicator/DupliciteItem.vue";
import PlaylistPickerPlaceholder from "@/components/deduplicator/PlaylistPickerPlaceholder.vue";

const DEFAULT_MIN_SIMILARITY_LEVEL = 1;

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
      if (similarityLevel >= DEFAULT_MIN_SIMILARITY_LEVEL) {
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

      <v-row
        v-if="userStore.playlists.loading === false && processing != true"
        justify="center"
      >
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
          id="duplicates-button"
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

            <div class="d-flex justify-center mt-2">
              <v-btn-toggle v-model="duplication.track1Delete" mandatory>
                <v-btn :value="false" color="spotify" size="small">
                  <span class="text-caption text-uppercase font-weight-bold"
                    >Keep</span
                  ></v-btn
                >
                <v-btn :value="true" color="red" size="small">
                  <span class="text-caption text-uppercase font-weight-bold"
                    >Delete</span
                  ></v-btn
                >
              </v-btn-toggle>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <DupliciteItem
              :playlistName="userStore.selectedPlaylists.secondPlaylist.name"
              :track="duplication.track2"
            />

            <div class="d-flex justify-center mt-2">
              <v-btn-toggle v-model="duplication.track2Delete" mandatory>
                <v-btn :value="false" color="spotify" size="small">
                  <span class="text-caption text-uppercase font-weight-bold"
                    >Keep</span
                  ></v-btn
                >
                <v-btn :value="true" color="red" size="small">
                  <span class="text-caption text-uppercase font-weight-bold"
                    >Delete</span
                  ></v-btn
                >
              </v-btn-toggle>
            </div>
          </v-col>
        </v-row>
        <v-divider class="my-6"></v-divider>
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
        class="font-weight-semibold mb-6"
        color="spotify"
        size="large"
      >
        Apply Changes
      </v-btn>
    </v-row>
  </div>
</template>
