export interface Cursors {
    after: string;
    before: string;
  }
  
export interface ExternalUrl {
    spotify: string;
  }
  
export interface ExternalIds {
    isrc: string;
    ean: string;
    upc: string;
  }
  
export interface Image {
    url: string;
    height: number;
    width: number;
  }
  
export interface Artist {
    external_urls: ExternalUrl;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }
  
export interface Album {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrl;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions: {
      reason: string;
    };
    type: string;
    uri: string;
    copyrights: {
      text: string;
      type: string;
    }[];
    external_ids: ExternalIds;
    genres: string[];
    label: string;
    popularity: number;
    album_group: string;
    artists: Artist[];
  }
  
export interface Track {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIds;
    external_urls: ExternalUrl;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: any;
    restrictions: {
      reason: string;
    };
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
  }
  
  export interface Context {
    type: string;
    href: string;
    external_urls: ExternalUrl;
    uri: string;
  }
  
  export interface Item {
    track: Track;
    played_at: string;
    context: Context;
  }
  
  export  interface ApiResponse {
    href: string;
    limit: number;
    next: string;
    cursors: Cursors;
    total: number;
    items: Item[];
  }