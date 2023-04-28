export interface UserPlaylistsEndpoint {
  href: string;
  items: UserPlaylistItem[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}

export interface UserPlaylistItem {
  collaborative: boolean;
  description: string;
  externalUrls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primaryColor: null;
  public: boolean;
  snapshotID: string;
  tracks: Tracks;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  height: number | null;
  url: string;
  width: number | null;
}

export interface Owner {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface Tracks {
  href: string;
  total: number;
}

