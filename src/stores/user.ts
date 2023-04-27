import { userEndpoints } from "@/utils/userEndpointsApi";
import { defineStore } from "pinia";
import { reactive } from "vue";
import type { TopTrack } from "@/model/TopTrack";
import type { TopArtist } from "@/model/TopArtist";
import type { RecentlyPlayedItem } from "@/model/RecentlyPlayed";
import type { TimeRange } from "@/model/TimeRange"
import { ref } from "vue";

type TopGenres = [string, number]

export const useUserStore = defineStore("user", () => {
  const TIME_RANGES: TimeRange[] = [
    { value: "short_term", label: "4 weeks" },
    { value: "medium_term", label: "6 months" },
    { value: "long_term", label: "All time" },
  ]

  const currentTimeRange = ref(TIME_RANGES[0].value)

  const topArtists = reactive({
    loading: true,
    parsingGenres: true,
    items: <TopArtist[]>[],
    genres: <TopGenres[]>[],
  })

  const topTracks = reactive({
    loading: true,
    items: <TopTrack[]>[],
  })

  const recentlyPlayed = reactive({
    items: <RecentlyPlayedItem[]>[],
  })

  const getTopArtists = async () => {
    topArtists.loading = true
    topArtists.parsingGenres = true
    try {
      const response = await userEndpoints.get(`/me/top/artists?time_range=${currentTimeRange.value}&limit=50`);
      if (topArtists.items.length != 0) {
        topArtists.items = []
        topArtists.genres = []
      }
      topArtists.items.push(...response.data.items)
      parseUserTaste()
      console.log(`[useUserStore >> getTopArtists] Top artists fetched:`, response.data)
    } catch (e) {
      console.error(e);
      topArtists.parsingGenres = false
    } finally {
      topArtists.loading = false
    }
  }

  const getTopTracks = async () => {
    topTracks.loading = true
    try {
      const response = await userEndpoints.get(`/me/top/tracks?time_range=${currentTimeRange.value}&limit=50`);
      if (topTracks.items.length != 0) {
        topTracks.items = []
      }
      topTracks.items.push(...response.data.items)
      console.log(`[useUserStore >> getTopTracks] Top tracks fetched:`, response.data)
    } catch (e) {
      console.error(e);
    } finally {
      topTracks.loading = false
    }
  }

  const getRecentlyPlayed = async () => {
    try {
      const response = await userEndpoints.get(`/me/player/recently-played?limit=50`);
      recentlyPlayed.items.push(...response.data.items)
      console.log(`[useUserStore >> getRecentlyPlayed] Recently played fetched`, response.data)
    } catch (e) {
      console.error
    }

  }



  const parseUserTaste = async () => {
    const genres = topArtists.items.flatMap(el => el.genres)
    const countedGenres = genres.reduce((acc, el) => {
      acc[el] = (acc[el] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)

    topArtists.genres.push(...Object.entries(countedGenres).sort((a, b) => b[1] - a[1]))
    topArtists.parsingGenres = false
  }

  const changeTimeRange = (timeRange: TimeRange) => {
    currentTimeRange.value = timeRange.value
    getTopArtists()
    getTopTracks()
  }

  return { TIME_RANGES, currentTimeRange, topArtists, topTracks, recentlyPlayed, getTopArtists, getTopTracks, changeTimeRange, getRecentlyPlayed }
})