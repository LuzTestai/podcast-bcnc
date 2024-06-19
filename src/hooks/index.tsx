import useSWR, { mutate } from "swr";
import {
  fetchPodcasts,
  fetchPodcastForName,
  fetchEpisodeDetail,
} from "@/services";
import { useAppContext } from "@/context/context";
import { EpisodeDetail } from "@/types";

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
    mutate(detail, false); // Update the SWR cache without revalidation
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

const fetcherEpisode = async ([key, episodeFeed]: readonly [
  string,
  string
]): Promise<EpisodeDetail | undefined> => {
  return await fetchEpisodeDetail(episodeFeed);
};

export const useFetchEpisode = (episodeFeed: string | null) => {
  const { data, mutate, error } = useSWR<EpisodeDetail | undefined>(
    episodeFeed ? ["fetchEpisodeDetail", episodeFeed] : null,
    fetcherEpisode,
    {
      fallbackData: episodeFeed
        ? null
        : JSON.parse(localStorage.getItem("episodeDetail") || "null"),
      revalidateOnFocus: false,
    }
  );

  const fetchEpisode = async (episodeFeed: string) => {
    const episode = await fetcherEpisode([
      "fetchEpisodeDetail",
      episodeFeed,
    ] as const);
    if (episode) {
      localStorage.setItem("episodeDetail", JSON.stringify(episode));
      mutate(episode, false);
    }
    return episode;
  };

  return { episodeDetail: data, fetchEpisode, error };
};

// const fetcherEpisode = async (url: string, pod: string) => {
//   const data = await fetchEpisodeDetail(pod);
//   return data;
// };

// export const useFetchEpisode = () => {
//   const { data, error } = useSWR(null, fetcherEpisode, {
//     revalidateOnFocus: false,
//   });

//   const fetchEpisode = async (pod: string): Promise<EpisodeDetail> => {
//     const episode = await fetcherEpisode("fetcherEpisode", pod);
//     mutate(null, episode, false);
//     return episode;
//   };

//   return { data, error, fetchEpisode };
// };
