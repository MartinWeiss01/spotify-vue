import { userEndpoints } from "@/utils/userEndpointsApi";
import { defineStore } from "pinia";
import { reactive } from "vue";
import type { TopTrack } from "@/model/TopTrack";
import { TopArtist } from "@/model/TopArtist";


export const useUserStore = defineStore("user", () => {
  const TIME_RANGES = [
    { value: "short_term", label: "4 weeks" },
    { value: "medium_term", label: "6 months" },
    { value: "long_term", label: "All time" },
  ]

  const currentTimeRange = reactive(TIME_RANGES[0])

  const topArtists = reactive({
    items: <TopArtist[]>[],
  })

  const topTracks = reactive({
    items: <TopTrack[]>[],
  })

  const getTopArtists = async () => {
    try {
      const response = await userEndpoints.get(`/me/top/artists?time_range=${currentTimeRange.value}&limit=50`);
      topArtists.items.push(...response.data.items)
      console.log(`[useUserStore >> getTopTracks] Top tracks fetched:`, response.data)
    } catch (e) {
      console.error(e);
    }
  }

  const getTopTracks = async () => {
    try {
      const response = await userEndpoints.get(`/me/top/tracks?time_range=${currentTimeRange.value}&limit=50`);
      topTracks.items.push(...response.data.items)
      console.log(`[useUserStore >> getTopTracks] Top tracks fetched:`, response.data)
    } catch (e) {
      console.error(e);
    }
  }

  return { TIME_RANGES, currentTimeRange, topArtists, topTracks, getTopArtists, getTopTracks }
})