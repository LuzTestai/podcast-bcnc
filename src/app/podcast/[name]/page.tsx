"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CardDetail from "@/ui/cardDetail";
import { useAppContext } from "@/context/context";
import { fetchPodcastForName, fetchEpisodeDetail } from "@/services";
import { PodcastDetailObj } from "@/types";

const DetailPodcast = ({ params }: { params: { name: string } }) => {
  const router = useRouter();
  const {
    authorDetail,
    setAuthorDetail,
    podcastDetail,
    setPodcastDetail,
    setEpisodeDetail,
  } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authorDetail && !loading) {
      router.push("/");
    }
  }, [authorDetail, loading, router]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchPodcastForName(params.name);
      if (data) {
        setPodcastDetail(data);
      } else {
        router.push("/");
      }
      setLoading(false);
    };

    fetchData();
  }, [params.name, setAuthorDetail, router, setPodcastDetail]);

  const onClickEpisode = (pod: string) => {
    console.log("ACA EL POD", pod);
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchEpisodeDetail(pod);
      if (data) {
        console.log("ACA EPISODIO", data);
        setEpisodeDetail(data);
      } else {
        console.log("error");
        // router.push("/");
      }
      setLoading(false);
    };
    fetchData().then(() => {
      router.push("/episode");
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!authorDetail || !podcastDetail) {
    return <p>Podcast not found</p>;
  }

  return (
    <div>
      <CardDetail
        title={authorDetail.title}
        author={authorDetail.author}
        description={authorDetail.description}
        episodes={podcastDetail.length}
        podcastDetail={podcastDetail}
        image={authorDetail.image}
        onClickEpisodeProp={onClickEpisode}
      />
    </div>
  );
};

export default DetailPodcast;
