"use client";
import React, { useEffect, useState } from "react";
import { convertirAHTML } from "@/lib";
import CardEpisode from "@/ui/cardEpisode";
import styles from "@/ui/cardEpisode/card-episode.module.css";
import Loading from "@/ui/loading";
import { useAuthorDetail } from "@/hooks";
import { useEpisodeDetail } from "@/hooks";
import { useAppContext } from "@/context/context";

const DetailEpisode = () => {
  const { authorDetail } = useAuthorDetail();
  const { episodeDetail, isLoading, error } = useEpisodeDetail();
  const { setEpisodeDetail } = useAppContext();

  useEffect(() => {
    if (episodeDetail && !isLoading) {
      setEpisodeDetail(episodeDetail);
    }
  }, [episodeDetail, isLoading, setEpisodeDetail]);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !authorDetail || !episodeDetail) {
    return <p>Episode not found</p>;
  }

  return (
    <div>
      {authorDetail && episodeDetail && (
        <div className={styles.cursorPointer}>
          <CardEpisode
            title={authorDetail.title}
            author={authorDetail.author}
            description={authorDetail.description}
            image={authorDetail.image}
            titleEpisode={episodeDetail.title}
            descriptionEpisode={convertirAHTML(episodeDetail.description)}
            audio={episodeDetail.enclosure}
          />
        </div>
      )}
    </div>
  );
};

export default DetailEpisode;
