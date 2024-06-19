"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { convertirAHTML } from "@/lib";
import CardEpisode from "@/ui/cardEpisode";
import styles from "@/ui/cardEpisode/card-episode.module.css";
import { useAppContext } from "@/context/context";

const DetailEpisode = () => {
  const router = useRouter();
  const { authorDetail, episodeDetail } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("episode", episodeDetail);
    if (episodeDetail) {
      setLoading(false);
    }
  }, [episodeDetail]);

  useEffect(() => {
    if (!authorDetail && !episodeDetail && !loading) {
      router.push("/");
    }
  }, [authorDetail, episodeDetail, loading, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!authorDetail || !episodeDetail) {
    return <p>Episode not found</p>;
  }

  return (
    <div>
      <h1>hola</h1>
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
    </div>
  );
};

export default DetailEpisode;
