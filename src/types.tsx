import { Key, ReactNode } from "react";

export interface Author {
  name: { label: string };
  uri: { label: string };
}
export interface AuthorDetail {
  author: string;
  title: string;
  description: string;
  image: string;
}

export interface Image {
  label: string;
  attributes: { height: string };
}

export interface Entry {
  "im:name": { label: string };
  "im:image": Image[];
  summary: { label: string };
  "im:price": {
    label: string;
    attributes: { amount: string; currency: string };
  };
  "im:contentType": { attributes: { term: string; label: string } };
  rights: { label: string };
  title: { label: string };
  link: { attributes: { rel: string; type: string; href: string } };
  id: { label: string; attributes: { "im:id": string } };
  "im:artist": { label: string; attributes?: { href: string } };
  category: { attributes: { term: string; scheme: string; label: string } };
  "im:releaseDate": { label: string; attributes: { label: string } };
}

export interface Feed {
  author: Author;
  entry: Entry[];
  updated: { label: string };
  rights: { label: string };
  title: { label: string };
  icon: { label: string };
  link: { attributes: { rel: string; type: string; href: string } }[];
  id: { label: string };
}

export interface PodcastsData {
  length: number;
  feed: Feed;
}

export interface CardProductProps {
  title: string;
  autor: string;
  image: string;
}

export interface PodcastDetailObj {
  episodes: Episode[];
  artistId: number;
  artistName: string;
  artistViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  artworkUrl600: string;
  collectionCensoredName: string;
  collectionExplicitness: string;
  collectionHdPrice: number;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  collectionViewUrl: string;
  contentAdvisoryRating: string;
  country: string;
  currency: string;
  feedUrl: string;
  genreIds: string[];
  genres: string[];
  kind: string;
  primaryGenreName: string;
  releaseDate: string;
  trackCensoredName: string;
  trackCount: number;
  trackExplicitness: string;
  trackId: number;
  trackName: string;
  trackPrice: number;
  trackTimeMillis: number;
  trackViewUrl: string;
  wrapperType: string;
}

export type PodcastDetails = PodcastDetailObj[];

export interface CardDetailProps {
  title: string;
  author: string;
  description: string;
  episodes: number;
  podcastDetail: PodcastDetails;
  image?: string;
  onClickEpisodeProp: (pod: string) => void;
}

export interface HomePageProps {
  isLoading: boolean;
  filteredPodcasts: Entry[];
  filterValue: string;
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLinkClick: (podcast: Entry) => void;
}

export interface Episode {
  trackTimeMillis(trackTimeMillis: any): import("react").ReactNode;
  collectionName: ReactNode;
  collectionId: Key | null | undefined;
  title: string;
  releaseDate: string;
  duration: number;
}

export interface EpisodeDetail {
  title: string | null;
  description: string | null;
  enclosure: string | null;
}
export interface CardEpisodeProps {
  title: string;
  author: string;
  description: string;
  titleEpisode: string;
  image: string;
  descriptionEpisode: string;
  audio: any;
}
export interface AppState {
  podcasts: PodcastsData | null;
  setPodcasts: React.Dispatch<React.SetStateAction<PodcastsData | null>>;
  authorDetail: AuthorDetail | null;
  setAuthorDetail: React.Dispatch<React.SetStateAction<AuthorDetail | null>>;
  podcastDetail: PodcastDetails | null;
  setPodcastDetail: React.Dispatch<React.SetStateAction<PodcastDetails | null>>;
  episodeDetail: EpisodeDetail | null;
  setEpisodeDetail: React.Dispatch<React.SetStateAction<EpisodeDetail | null>>;
}

// export interface PodcastDetail {
//   title: string;
//   author: string;
//   description: string;
//   image: string;
//   episodes: Episode[];
// }
