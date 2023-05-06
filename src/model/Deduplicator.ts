import type { PlaylistTrack } from "./PlaylistTracks";

export interface DuplicationItems {
  track1: PlaylistTrack;
  track2: PlaylistTrack;
  track1Delete: boolean;
  track2Delete: boolean;
  similarityLevel: number;
}