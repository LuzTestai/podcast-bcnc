import { EpisodeDetail, PodcastDetailObj, PodcastDetails } from "@/types";

const baseUrl = "https://itunes.apple.com/";
const apiBaseUrl = "/api";
export const fetchPodcasts = async (): Promise<any> => {
  try {
    const response = await fetch(
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchPodcastForName = async (
  name: string
): Promise<PodcastDetails | null> => {
  try {
    const response = await fetch(
      `${baseUrl}/search?term=${name}&media=podcast&attribute=titleTerm&entity=podcast`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "omit",
      }
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchEpisodeDetail = async (
  episodeFeed: string
): Promise<EpisodeDetail | undefined> => {
  try {
    const proxyUrl = `${apiBaseUrl}/proxy?url=${encodeURIComponent(
      episodeFeed
    )}`;
    const response = await fetch(proxyUrl);

    const xmlData = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, "text/xml");
    const items = xmlDoc.querySelectorAll("item");

    const firstItem = items[0];
    if (firstItem) {
      const titleElement = xmlDoc.querySelector("title");
      const firstItemDescription = firstItem.querySelector("description");
      const firstItemEnclosure = firstItem.querySelector("enclosure");
      const title = titleElement ? titleElement.textContent : "";
      const description = firstItemDescription
        ? firstItemDescription.textContent
        : "";
      const enclosure = firstItemEnclosure
        ? firstItemEnclosure.getAttribute("url")
        : "";
      const episode = { title, description, enclosure };
      return episode;
    }
  } catch (error) {
    console.error(error);
  }
};
