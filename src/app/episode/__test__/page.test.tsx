import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import DetailEpisode from "../page";
import { useAuthorDetail } from "@/hooks";
import { useEpisodeDetail } from "@/hooks";
import { useAppContext } from "@/context/context";
import Loading from "@/ui/loading";
import CardEpisode from "@/ui/cardEpisode";
import { convertirAHTML } from "@/lib";

jest.mock("@/hooks", () => ({
  useAuthorDetail: jest.fn(),
  useEpisodeDetail: jest.fn(),
}));

jest.mock("@/context/context", () => ({
  useAppContext: jest.fn(),
}));

jest.mock("@/ui/loading", () => jest.fn(() => <div>Loading...</div>));
jest.mock("@/ui/cardEpisode", () => jest.fn(() => <div>CardEpisode Mock</div>));
jest.mock("@/lib", () => ({
  convertirAHTML: jest.fn((description) => description),
}));

describe("DetailEpisode Component", () => {
  let mockSetEpisodeDetail: jest.Mock;

  const mockAuthorDetail = {
    title: "Mock Title",
    author: "Mock Author",
    description: "Mock Description",
    image: "http://example.com/image.jpg",
  };

  const mockEpisodeDetail = {
    title: "Mock Episode Title",
    description: "Mock Episode Description",
    enclosure: "http://example.com/audio.mp3",
  };

  beforeEach(() => {
    mockSetEpisodeDetail = jest.fn();

    (useAuthorDetail as jest.Mock).mockReturnValue({
      authorDetail: mockAuthorDetail,
    });
    (useEpisodeDetail as jest.Mock).mockReturnValue({
      episodeDetail: mockEpisodeDetail,
      isLoading: false,
      error: null,
    });
    (useAppContext as jest.Mock).mockReturnValue({
      setEpisodeDetail: mockSetEpisodeDetail,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders Loading component when loading", () => {
    (useEpisodeDetail as jest.Mock).mockReturnValueOnce({
      episodeDetail: null,
      isLoading: true,
      error: null,
    });

    render(<DetailEpisode />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it('displays "Episode not found" when there is an error or no episode detail', async () => {
    (useEpisodeDetail as jest.Mock).mockReturnValueOnce({
      episodeDetail: null,
      isLoading: false,
      error: "Error fetching episode",
    });

    render(<DetailEpisode />);
    await waitFor(() => {
      expect(screen.getByText("Episode not found")).toBeInTheDocument();
    });
  });

  it('displays "Episode not found" when author detail is missing', async () => {
    (useAuthorDetail as jest.Mock).mockReturnValueOnce({
      authorDetail: null,
    });

    render(<DetailEpisode />);
    await waitFor(() => {
      expect(screen.getByText("Episode not found")).toBeInTheDocument();
    });
  });

  it("renders CardEpisode with the correct props", () => {
    render(<DetailEpisode />);
    expect(screen.getByText("CardEpisode Mock")).toBeInTheDocument();
    expect(convertirAHTML).toHaveBeenCalledWith(mockEpisodeDetail.description);
    expect(mockSetEpisodeDetail).toHaveBeenCalledWith(mockEpisodeDetail);
  });
});
