import useSWR, { mutate } from "swr";
import {
  fetchPodcasts,
  fetchPodcastForName,
  fetchEpisodeDetail,
} from "@/services";
import { useAppContext } from "@/context/context";
import { EpisodeDetail } from "@/types";
import { useEffect, useState } from "react";

const fetcher = async () => {
  const data = await fetchPodcasts();
  return data;
};

export const useFetchPodcasts = () => {
  const { setPodcasts } = useAppContext();
  const { data, error } = useSWR("fetchPodcasts", fetcher, {
    revalidateOnFocus: false,
    onSuccess: (data) => {
      setPodcasts(data);
    },
  });
  const isLoading = !data && !error;

  return { data, error, isLoading };
};

const fetcherAuthor = (key: string) => {
  const data = JSON.parse(localStorage.getItem(key) || "null");
  return data;
};

export const useAuthorDetail = () => {
  const { data, mutate } = useSWR("authorDetail", fetcherAuthor, {
    fallbackData: null,
    revalidateOnFocus: false,
  });

  const setAuthorDetail = (detail: any) => {
    localStorage.setItem("authorDetail", JSON.stringify(detail));
    mutate(detail, false);
  };

  return { authorDetail: data, setAuthorDetail };
};

const fetcherForName = async (url: string, name: string) => {
  let data = await fetchPodcastForName(name);
  if (data) {
    data = data.slice(0, 6);
  }
  return data;
};

export const useFetchPodforName = (name: string) => {
  const { setPodcastDetail } = useAppContext();
  const { data, error } = useSWR(
    name ? ["fetchPodcastForName", name] : null,
    fetcherForName,
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        setPodcastDetail(data);
      },
    }
  );
  const isLoading = !data && !error;
  return { data, error, isLoading };
};

export const useEpisodeDetail = () => {
  const { episodeDetail, setEpisodeDetail } = useAppContext();
  const [storedEpisodeDetail, setStoredEpisodeDetail] =
    useState<EpisodeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!episodeDetail) {
      try {
        const storedData = localStorage.getItem("episodeDetail");
        if (storedData) {
          setStoredEpisodeDetail(JSON.parse(storedData));
        }
        setIsLoading(false);
      } catch (e) {
        setError(new Error());
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [episodeDetail]);

  useEffect(() => {
    if (episodeDetail) {
      localStorage.setItem("episodeDetail", JSON.stringify(episodeDetail));
    }
  }, [episodeDetail]);

  return {
    episodeDetail: episodeDetail || storedEpisodeDetail,
    isLoading,
    error,
  };
};
