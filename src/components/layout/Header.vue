<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { reactive } from "vue";

const authStore = useAuthStore();
const user = reactive(authStore.user);

const nav = [
  {
    label: "Stats",
    to: { name: "stats" },
    icon: "mdi-chart-bar",
  },
  {
    label: "Recently Played",
    to: { name: "recentlyplayed" },
    icon: "mdi-history",
  },
  {
    label: "Deduplicator",
    to: { name: "deduplicator" },
    icon: "mdi-playlist-music-outline",
  },
];
</script>

<template>
  <header v-if="user.isLoggedIn" class="bg-grey-darken-4 py-4">
    <v-container>
      <v-row class="justify-space-between px-4 px-md-0">
        <div class="d-flex align-center">
          <div class="d-flex align-center">
            <img src="/logo-circle-full.svg" height="36" class="mr-2" />
            <h3>Spotify Stats</h3>
          </div>
          <nav class="d-none d-md-flex h-100 ml-4">
            <v-toolbar-items>
              <v-btn
                flat
                v-for="link in nav"
                :key="link.label"
                :to="link.to"
                class="rounded"
              >
                <v-icon :icon="link.icon" class="mr-2" />{{ link.label }}
              </v-btn>
            </v-toolbar-items>
          </nav>
        </div>

        <div class="d-flex align-center">
          <div class="d-flex align-center">
            <div class="d-flex align-center cursor-pointer">
              <div class="d-flex align-center">
                <div class="d-flex align-center cursor-pointer">
                  <v-img
                    width="30"
                    height="100%"
                    cover
                    class="rounded-xl"
                    :src="user?.image || 'https://placehold.co/500x500?text=UU'"
                  ></v-img>
                  <p
                    class="d-none d-sm-flex text-grey-darken-1 font-weight-bold ml-2"
                  >
                    {{ user?.name }}
                    <v-icon icon="mdi-menu-down"></v-icon>
                  </p>

                  <v-menu activator="parent">
                    <v-list class="bg-grey-darken-3 mt-3">
                      <v-list-item
                        v-for="link in nav"
                        :key="link.label"
                        :to="link.to"
                        class="d-flex d-md-none"
                      >
                        <v-list-item-title>
                          <v-icon :icon="link.icon" class="mr-2" />
                          {{ link.label }}
                        </v-list-item-title>
                      </v-list-item>

                      <v-list-item @click="authStore.logout()">
                        <v-list-item-title>
                          <v-icon icon="mdi-logout" class="mr-2"></v-icon>
                          <span>Sign out</span>
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-row>
    </v-container>
  </header>

  <header v-else class="bg-grey-darken-4 py-4">
    <v-container>
      <v-row justify="center">
        <div class="d-flex align-center">
          <img src="/logo-circle-full.svg" height="36" class="mr-2" />
          <h3>Spotify Stats</h3>
        </div>
      </v-row>
    </v-container>
  </header>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
