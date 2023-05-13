import { userEndpoints } from "@/utils/userEndpointsApi";
import { defineStore } from "pinia";
import { reactive } from "vue";
import type { TopTrack } from "@/model/TopTrack";
import type { TopArtist } from "@/model/TopArtist";
import type { RecentlyPlayedItem } from "@/model/RecentlyPlayed";
import type { TimeRange } from "@/model/TimeRange"
import { ref } from "vue";
import type { UserPlaylistsEndpoint, UserPlaylistItem } from "@/model/UserPlaylists";
import type { PlaylistTrack } from "@/model/PlaylistTracks";
import axios from 'axios'
import { useAuthStore } from "./auth";


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
    loading: true,
    items: <RecentlyPlayedItem[]>[],
  })

  const playlists = reactive({
    loading: false,
    playlist: <UserPlaylistsEndpoint>{}
  })

  var selectedPlaylists = reactive({
    firstPlaylist: <UserPlaylistItem>{},
    firstPlaylistReady: false,
    secondPlaylist: <UserPlaylistItem>{},
    secondPlaylistReady: false
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

  const deleteTracks = async (playlistId: string, trackUris: { uri: string }[]): Promise<Boolean> => {
    try {
      let i = 0;
      while (i < trackUris.length) {
        const bodyData = { tracks: trackUris.slice(i, i + 100) };
        await userEndpoints.delete(`/playlists/${playlistId}/tracks`, { data: bodyData });
        i += 100;
      }
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  };

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
    recentlyPlayed.loading = true
    try {
      const response = await userEndpoints.get(`/me/player/recently-played?limit=50`);
      if (recentlyPlayed.items.length != 0) {
        recentlyPlayed.items = []
      }
      recentlyPlayed.items.push(...response.data.items)
      console.log(`[useUserStore >> getRecentlyPlayed] Recently played tracks fetched:`, response.data)
    } catch (e) {
      console.error(e);
    } finally {
      recentlyPlayed.loading = false
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

  const getPlaylists = async () => {
    playlists.loading = true
    try {
      console.log(playlists.playlist)
      console.log("Fetching playlists")
      const response = await userEndpoints.get("/me/playlists?limit=50")

      playlists.playlist = { ...response.data }
      console.log("Playlist")
      console.log(playlists.playlist)
    } catch (e) {
      console.error(e)
    } finally {
      playlists.loading = false
    }
  }

  const getPlaylistTracks = async (playlistId: string): Promise<PlaylistTrack[]> => {
    let tracks = []
    let nextURL = `/playlists/${playlistId}/tracks?limit=50`

    let sleepCounter = 0
    const sleepTime = 1286

    try {
      while (nextURL) {
        if (sleepCounter !== 0 && sleepCounter % 5 === 0) {
          await new Promise(resolve => setTimeout(resolve, sleepTime))
        }
        const response = await userEndpoints.get(nextURL)
        tracks.push(...response.data.items)
        nextURL = response.data.next
        sleepCounter++
        console.log(`[useUserStore >> getPlaylistTracks] Playlist tracks fetched:`, response.data)
      }
    } catch (e) {
      console.error(e)
    }

    return tracks
  }

  return { TIME_RANGES, currentTimeRange, topArtists, topTracks, playlists, selectedPlaylists, deleteTracks, getTopArtists, getTopTracks, recentlyPlayed, getRecentlyPlayed, changeTimeRange, getPlaylists, getPlaylistTracks }
})