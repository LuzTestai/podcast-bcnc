"use client";
import React, {
  createContext,
  useEffect,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";
import fetchPodcasts from "@/services/fetchPodcasts";
import { AppState, PodcastsData, AuthorDetail } from "@/types";

const Context = createContext<AppState | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [podcasts, setPodcasts] = useState<PodcastsData | null>(null);
  const [authorDetail, setAuthorDetail] = useState<AuthorDetail | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPodcasts();
      setPodcasts(data);
    };

    fetchData();
  }, []);

  return (
    <Context.Provider
      value={{ podcasts, setPodcasts, authorDetail, setAuthorDetail }}
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
