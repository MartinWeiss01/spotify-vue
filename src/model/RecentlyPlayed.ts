export interface RecentlyPlayedEndpoint {
  items: RecentlyPlayedItem[];
  next: string;
  cursors: Cursors;
  limit: number;
  href: string;
}

export interface Cursors {
  after: string;
  before: string;
}

export interface RecentlyPlayedItem {
  track: Track;
  played_at: Date;
  context: Context | null;
}

export interface Context {
  type: ContextType;
  externalUrls: ExternalUrls;
  href: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export enum ContextType {
  Album = "album",
  Artist = "artist",
  Playlist = "playlist",
}

export interface Track {
  album: Album;
  artists: Artist[];
  availableMarkets: string[];
  discNumber: number;
  durationMS: number;
  explicit: boolean;
  externalIDS: ExternalIDS;
  externalUrls: ExternalUrls;
  href: string;
  id: string;
  isLocal: boolean;
  name: string;
  popularity: number;
  previewURL: string;
  trackNumber: number;
  type: TrackType;
  uri: string;
}

export interface Album {
  albumGroup: AlbumGroupEnum;
  albumType: AlbumGroupEnum;
  artists: Artist[];
  availableMarkets: string[];
  externalUrls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  releaseDate: string;
  releaseDatePrecision: ReleaseDatePrecision;
  totalTracks: number;
  type: ContextType;
  uri: string;
}

export enum AlbumGroupEnum {
  Album = "album",
  Compilation = "compilation",
  Single = "single",
}

export interface Artist {
  externalUrls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: ContextType;
  uri: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export enum ReleaseDatePrecision {
  Day = "day",
  Year = "year",
}

export interface ExternalIDS {
  isrc: string;
}

export enum TrackType {
  Track = "track",
}
