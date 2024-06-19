"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CardDetail from "@/ui/cardDetail";
import { useAppContext } from "@/context/context";
import { useFetchPodforName, useFetchEpisode } from "@/hooks";
import { useAuthorDetail } from "@/hooks";
import Loading from "@/ui/loading";
import { EpisodeDetail } from "@/types";

const DetailPodcast = ({ params }: { params: { name: string } }) => {
  const router = useRouter();
  const { setPodcastDetail, setEpisodeDetail } = useAppContext();
  const { authorDetail } = useAuthorDetail();
  const {
    data: podcastDetail,
    error,
    isLoading: isFetching,
  } = useFetchPodforName(params.name);
  const [loading, setLoading] = useState(true);
  const { fetchEpisode } = useFetchEpisode(null);

  useEffect(() => {
    if (podcastDetail) {
      setPodcastDetail(podcastDetail);
      setLoading(false);
    } else if (error) {
      setLoading(false);
    }
  }, [podcastDetail, error, setPodcastDetail]);

  const onClickEpisode = async (pod: string) => {
    setLoading(true);
    try {
      const episode = await fetchEpisode(pod);
      if (episode) {
        setEpisodeDetail(episode as EpisodeDetail);
        router.push("/episode");
      }
    } catch (error) {
      console.error("Failed to fetch episode:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || isFetching) {
    return <Loading />;
  }

  if (!podcastDetail) {
    return <p>Podcast not found</p>;
  }

  return (
    <div>
      {podcastDetail && (
        <CardDetail
          title={authorDetail?.title || "Unknown Title"}
          author={authorDetail?.author || "Unknown Author"}
          description={authorDetail?.description || "No Description"}
          episodes={podcastDetail.length}
          podcastDetail={podcastDetail}
          image={authorDetail?.image}
          onClickEpisodeProp={onClickEpisode}
        />
      )}
    </div>
  );
};

export default DetailPodcast;
