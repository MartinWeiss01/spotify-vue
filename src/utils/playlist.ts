import type { DuplicationItems } from "@/model/Deduplicator";
import type { PlaylistTrack, Track } from "@/model/PlaylistTracks";

export function getTrackSimilarityLevel(track1: Track, track2: Track): number {
  if (track1.id === null) return 0;
  if (track1.id === track2.id) return 4;
  else if (track1.name.toLowerCase() === track2.name.toLowerCase()) {
    let sameArtistsCount = 0, level = 1;
    track1.artists.forEach(artists1 => {
      track2.artists.forEach(artists2 => {
        if (artists1.id === artists2.id) sameArtistsCount++;
      })
    });
    if (sameArtistsCount !== 0) {
      level = 2;
      if (track1.artists.length === track2.artists.length && track1.artists.length === sameArtistsCount) level = 3;
    }
    return level;
  }
  return 0;
}

export function getSimilarityLevelDescription(level: number): string {
  switch (level) {
    case 4: return "The tracks are identical";
    case 3: return "The tracks have the same artists and the same title, but different IDs";
    case 2: return "The tracks have the same title and at least one common artist";
    case 1: return "The only match is in the name";
    case 0: return "No match found";
    default: return "Unknown state";
  }
}

export function getSimilarityActionDescription(level: number): string {
  switch (level) {
    case 4: return "Searches only for exactly identical tracks";
    case 3: return "Accepts identical tracks with different Spotify track ID";
    case 2: return "Accepts tracks with the same title and at least one common artist";
    case 1: return "Accepts tracks with the same title";
    default: return "Unknown state";
  }
}

export function comparePlaylists(
  playlist1: PlaylistTrack[],
  playlist2: PlaylistTrack[],
  level: number
): DuplicationItems[] {
  let duplicates: DuplicationItems[] = [];
  playlist1.forEach(track1 => {
    playlist2.forEach(track2 => {
      const similarityLevel = getTrackSimilarityLevel(
        track1.track,
        track2.track
      );
      if (similarityLevel >= level) {
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