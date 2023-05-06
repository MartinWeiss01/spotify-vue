export interface Playlist {
  href: string;
  items: PlaylistTrack[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}

export interface PlaylistTrack {
  added_at: Date;
  added_by: AddedBy;
  is_local: boolean;
  primary_color: null;
  track: Track;
  video_thumbnail: VideoThumbnail;
}

export interface AddedBy {
  external_urls: ExternalUrls;
  href: null | string;
  id: null | string;
  type: AddedByType;
  uri: null | string;
  name?: string;
}

export interface ExternalUrls {
  spotify?: string;
}

export enum AddedByType {
  Artist = "artist",
  User = "user",
}

export interface Track {
  album: Album;
  artists: AddedBy[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  episode?: boolean;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: null | string;
  id: null | string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: null | string;
  track?: boolean;
  track_number: number;
  type: TrackType;
  uri: string;
}

export interface Album {
  album_group?: AlbumGroup;
  album_type: AlbumGroup | null;
  artists: AddedBy[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: null | string;
  id: null | string;
  images: Image[];
  name: string;
  release_date: Date | null;
  release_date_precision: ReleaseDatePrecision | null;
  total_tracks?: number;
  type: AlbumGroup;
  uri: null | string;
}

export enum AlbumGroup {
  Album = "album",
  Single = "single",
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export enum ReleaseDatePrecision {
  Day = "day",
}

export interface ExternalIDS {
  isrc?: string;
}

export enum TrackType {
  Track = "track",
}

export interface VideoThumbnail {
  url: null;
}
