"use client";
import React, { useState } from "react";
import HomePage from "@/ui/homePage";
import { useAppContext } from "@/context/context";
import { cortarStrPorGuionOComa } from "@/lib/index";
import { useRouter } from "next/navigation";
import { useFetchPodcasts } from "@/hooks";

export default function Home() {
  const { setAuthorDetail } = useAppContext();
  const { data: podcasts, error, isLoading } = useFetchPodcasts();
  const [filterValue, setFilterValue] = useState("");
  const router = useRouter();

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
