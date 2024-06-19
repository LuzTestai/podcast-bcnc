import useSWR from "swr";
import { fetchPodcasts } from "@/services";
import { useAppContext } from "@/context/context";

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
