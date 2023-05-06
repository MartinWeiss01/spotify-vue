import { Track } from "@/model/PlaylistTracks";

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
    case 2: return "The tracks have the same title and at least one common artist, but different IDs";
    case 1: return "The only match is in the name";
    case 0: return "No match found";
    default: return "Unknown state";
  }
}