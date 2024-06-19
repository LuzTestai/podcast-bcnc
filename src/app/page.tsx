"use client";
import React, { useEffect, useState } from "react";
import HomePage from "@/ui/homePage";
import { cortarStrPorGuionOComa } from "@/lib/index";
import { useRouter } from "next/navigation";
import { useFetchPodcasts, useAuthorDetail } from "@/hooks";

export default function Home() {
  const { setAuthorDetail } = useAuthorDetail();
  const { data: podcasts, error, isLoading } = useFetchPodcasts();
  const [filterValue, setFilterValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    console.log("ACA EN HOME PAGE", podcasts);
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
    podcasts?.feed.entry.filter(
      (podcast: {
        [x: string]: { label: string };
        title: { label: string };
      }) => {
        const filterText = filterValue.toLowerCase();
        const title = podcast.title.label.toLowerCase();
        const artist = podcast["im:artist"].label.toLowerCase();
        return title.startsWith(filterText) || artist.startsWith(filterText);
      }
    ) || [];

  return (
    <HomePage
      isLoading={isLoading}
      filteredPodcasts={filteredPodcasts}
      filterValue={filterValue}
      handleFilterChange={handleFilterChange}
      handleLinkClick={handleLinkClick}
    />
  );
}
