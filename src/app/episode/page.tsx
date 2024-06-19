"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { convertirAHTML } from "@/lib";
import CardEpisode from "@/ui/cardEpisode";
import styles from "@/ui/cardEpisode/card-episode.module.css";
import Loading from "@/ui/loading";
import { useAuthorDetail, useFetchEpisode } from "@/hooks";

const DetailEpisode = () => {
  const router = useRouter();
  const { authorDetail } = useAuthorDetail();
  const { episodeDetail } = useFetchEpisode(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (episodeDetail) {
      setLoading(false);
    }
  }, [episodeDetail]);

  if (loading) {
    return <Loading />;
  }

  if (!authorDetail || !episodeDetail) {
    return <p>Episode not found</p>;
  }

  return (
    <div>
      {authorDetail && episodeDetail && (
        <div onClick={() => router.back()} className={styles.cursorPointer}>
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
