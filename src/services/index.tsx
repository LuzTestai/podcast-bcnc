import { EpisodeDetail, PodcastDetailObj, PodcastDetails } from "@/types";

const baseUrl = "https://itunes.apple.com/";

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
    const response = await fetch(`${episodeFeed}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const xmlData = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, "application/xml");

    const items = xmlDoc.querySelectorAll("item");

    if (items.length === 0) {
      console.error("No items found in the RSS feed");
      return undefined;
    }

    const firstItem = items[0];
    const titleElement = firstItem.querySelector("title");
    const firstItemDescription = firstItem.querySelector("description");
    const firstItemEnclosure = firstItem.querySelector("enclosure");

    const title = titleElement ? titleElement.textContent || "" : "";
    const description = firstItemDescription
      ? firstItemDescription.textContent || ""
      : "";
    const enclosure = firstItemEnclosure
      ? firstItemEnclosure.getAttribute("url") || ""
      : "";

    const episode: EpisodeDetail = { title, description, enclosure };

    console.log("ADENTRO DE FETCH BUSCANDO EPISODE:", episode);
    return episode;
  } catch (error) {
    console.error("Fetch error:", error);
  }
  return undefined;
};

// export const fetchEpisodeDetail = (episodeFeed: string) => {
//   console.log("EPISODE FEEEEEEED", episodeFeed);
//   return async () => {
//     try {
//       const response = await fetch(`${episodeFeed}`);
//       const xmlData = await response.text();
//       const parser = new DOMParser();
//       const xmlDoc = parser.parseFromString(xmlData, "text/xml");
//       const items = xmlDoc.querySelectorAll("item");

//       const firstItem = items[0];
//       if (firstItem) {
//         const titleElement = xmlDoc.querySelector("title");
//         const firstItemDescription = firstItem.querySelector("description");
//         const firstItemEnclosure = firstItem.querySelector("enclosure");
//         const title = titleElement ? titleElement.textContent : "";
//         const description = firstItemDescription
//           ? firstItemDescription.textContent
//           : "";
//         const enclosure = firstItemEnclosure
//           ? firstItemEnclosure.getAttribute("url")
//           : "";
//         //    dispatch(fillDetailEpisode({title, description, enclosure}))
//         return { title, description, enclosure };
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };
