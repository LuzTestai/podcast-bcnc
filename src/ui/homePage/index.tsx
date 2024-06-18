"use client";
import React from "react";

import styles from "./home-page.module.css";
import CardProduct from "../cardProduct";
import { HomePageProps } from "@/types";

const HomePage: React.FC<HomePageProps> = ({
  isLoading,
  filteredPodcasts,
  filterValue,
  handleFilterChange,
  handleLinkClick,
}) => {
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
