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

export interface AppState {
  podcasts: PodcastsData | null;
  setPodcasts: React.Dispatch<React.SetStateAction<PodcastsData | null>>;
  authorDetail: AuthorDetail | null;
  setAuthorDetail: React.Dispatch<React.SetStateAction<AuthorDetail | null>>;
}
