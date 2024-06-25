import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DetailPodcast from "../page";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/context";
import { useFetchPodforName, useAuthorDetail } from "@/hooks";
import Loading from "@/ui/loading";
import CardDetail from "@/ui/cardDetail";
import { fetchEpisodeDetail } from "@/services/index";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/context/context", () => ({
  useAppContext: jest.fn(),
}));

jest.mock("@/hooks", () => ({
  useFetchPodforName: jest.fn(),
  useAuthorDetail: jest.fn(),
}));

jest.mock("@/ui/loading", () => jest.fn(() => <div>Loading...</div>));
jest.mock("@/ui/cardDetail", () =>
  jest.fn((props) => (
    <div>
      CardDetail Mock
      <div>{props.title}</div>
      <div>{props.author}</div>
      <div>{props.description}</div>
      <div>{props.episodes}</div>
      <div>
        {props.podcastDetail &&
          props.podcastDetail.map(
            (pod: {
              collectionId: React.Key | null | undefined;
              collectionName:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<React.AwaitedReactNode>
                | null
                | undefined;
            }) => <div key={pod.collectionId}>{pod.collectionName}</div>
          )}
      </div>
    </div>
  ))
);
jest.mock("@/services/index", () => ({
  fetchEpisodeDetail: jest.fn(),
}));

describe("DetailPodcast Component", () => {
  let mockPush: jest.Mock;
  let mockSetPodcastDetail: jest.Mock;
  let mockSetEpisodeDetail: jest.Mock;

  const mockAuthorDetail = {
    title: "Mock Title",
    author: "Mock Author",
    description: "Mock Description",
    image: "http://example.com/image.jpg",
  };

  const mockPodcastDetail = [
    {
      collectionId: "1",
      collectionName: "Episode 1",
      feedUrl: "url1",
      releaseDate: "2021-01-01",
      trackTimeMillis: 123456,
    },
    {
      collectionId: "2",
      collectionName: "Episode 2",
      feedUrl: "url2",
      releaseDate: "2021-02-01",
      trackTimeMillis: 654321,
    },
  ];

  beforeEach(() => {
    mockPush = jest.fn();
    mockSetPodcastDetail = jest.fn();
    mockSetEpisodeDetail = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useAppContext as jest.Mock).mockReturnValue({
      setPodcastDetail: mockSetPodcastDetail,
      setEpisodeDetail: mockSetEpisodeDetail,
    });
    (useAuthorDetail as jest.Mock).mockReturnValue({
      authorDetail: mockAuthorDetail,
    });
    (useFetchPodforName as jest.Mock).mockReturnValue({
      data: mockPodcastDetail,
      error: null,
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders Loading component when loading", () => {
    (useFetchPodforName as jest.Mock).mockReturnValueOnce({
      data: null,
      error: null,
      isLoading: true,
    });

    render(<DetailPodcast params={{ name: "test" }} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders CardDetail with the correct props", () => {
    render(<DetailPodcast params={{ name: "test" }} />);
    expect(screen.getByText("CardDetail Mock")).toBeInTheDocument();
    expect(screen.getByText("Mock Title")).toBeInTheDocument();
    expect(screen.getByText("Mock Author")).toBeInTheDocument();
    expect(screen.getByText("Mock Description")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Episode 1")).toBeInTheDocument();
    expect(screen.getByText("Episode 2")).toBeInTheDocument();
    expect(mockSetPodcastDetail).toHaveBeenCalledWith(mockPodcastDetail);
  });

  it("handles episode click and fetches episode detail", async () => {
    const mockEpisodeDetail = { title: "Episode 1" };
    (fetchEpisodeDetail as jest.Mock).mockResolvedValue(mockEpisodeDetail);

    render(<DetailPodcast params={{ name: "test" }} />);
    const homePageProps = (CardDetail as jest.Mock).mock.calls[0][0];
    await waitFor(() => homePageProps.onClickEpisodeProp("url1"));

    expect(fetchEpisodeDetail).toHaveBeenCalledWith("url1");
    expect(mockSetEpisodeDetail).toHaveBeenCalledWith(mockEpisodeDetail);
    expect(mockPush).toHaveBeenCalledWith("/episode");
  });

  it("handles episode click and handles error", async () => {
    (fetchEpisodeDetail as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch episode")
    );

    render(<DetailPodcast params={{ name: "test" }} />);
    const homePageProps = (CardDetail as jest.Mock).mock.calls[0][0];
    await waitFor(() => homePageProps.onClickEpisodeProp("url1"));

    expect(fetchEpisodeDetail).toHaveBeenCalledWith("url1");
    expect(mockSetEpisodeDetail).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
