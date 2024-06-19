"use client";
import React, {
  createContext,
  useEffect,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";
import { fetchPodcasts } from "@/services";
import {
  AppState,
  PodcastsData,
  AuthorDetail,
  PodcastDetails,
  EpisodeDetail,
} from "@/types";

const Context = createContext<AppState | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [podcasts, setPodcasts] = useState<PodcastsData | null>(null);
  const [authorDetail, setAuthorDetail] = useState<AuthorDetail | null>(null);
  const [podcastDetail, setPodcastDetail] = useState<PodcastDetails | null>(
    null
  );
  const [episodeDetail, setEpisodeDetail] = useState<EpisodeDetail | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPodcasts();
      setPodcasts(data);
    };

    fetchData();
  }, []);

  return (
    <Context.Provider
      value={{
        podcasts,
        setPodcasts,
        authorDetail,
        setAuthorDetail,
        podcastDetail,
        setPodcastDetail,
        episodeDetail,
        setEpisodeDetail,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useAppContext debe ser usado dentro de un AppProvider");
  }
  return context;
};
