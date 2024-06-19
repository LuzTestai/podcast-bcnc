"use client";
import React, { useEffect, useState } from "react";
import HomePage from "@/ui/homePage";
import { useAppContext } from "@/context/context";
import { cortarStrPorGuionOComa } from "@/lib/index";
import { useRouter } from "next/navigation";

export default function Home() {
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
    <HomePage
      isLoading={isLoading}
      filteredPodcasts={filteredPodcasts}
      filterValue={filterValue}
      handleFilterChange={handleFilterChange}
      handleLinkClick={handleLinkClick}
    />
  );
}
