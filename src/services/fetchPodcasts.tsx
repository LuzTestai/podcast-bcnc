const fetchPodcasts = async (): Promise<any> => {
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

export default fetchPodcasts;
