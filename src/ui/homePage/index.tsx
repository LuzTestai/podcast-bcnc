"use client";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/context";
import { cortarStrPorGuionOComa } from "@/lib/index";
import { useRouter } from "next/navigation";
import styles from "./home-page.module.css";
import CardProduct from "../cardProduct";

const HomePage = () => {
  const { podcasts, setAuthorDetail } = useAppContext();
  const [filterValue, setFilterValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (podcasts) {
      setIsLoading(false);
    }
  }, [podcasts]);

  const handleLinkClick = (podcast: any) => {
    const authorData = {
      author: podcast["im:artist"].label,
      title: cortarStrPorGuionOComa(podcast.title.label),
      description: podcast.summary.label,
      image: podcast["im:image"][2].label,
    };
    setAuthorDetail(authorData);
    router.push(`/podcast/${podcast["im:name"].label}`);
  };

  const handleFilterChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFilterValue(event.target.value);
  };

  const filteredPodcasts =
    podcasts?.feed.entry.filter((podcast) => {
      const filterText = filterValue.toLowerCase();
      const title = podcast.title.label.toLowerCase();
      const artist = podcast["im:artist"].label.toLowerCase();
      return title.startsWith(filterText) || artist.startsWith(filterText);
    }) || [];

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.container}>
          <div className={styles.filter}>
            <div className={styles.badge}>{filteredPodcasts.length}</div>
            <input
              type="text"
              value={filterValue}
              onChange={handleFilterChange}
              placeholder="Filter by title or artist"
              className={styles.filterInput}
            />
          </div>
          <div className={styles.containerHome}>
            {filteredPodcasts.map((podcast) => {
              return (
                <div
                  key={podcast.title.label}
                  onClick={() => handleLinkClick(podcast)}
                  className={styles.clickPodcast}
                >
                  <CardProduct
                    title={podcast.title.label}
                    autor={podcast["im:artist"].label}
                    image={podcast["im:image"][1].label}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
