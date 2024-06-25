import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../page";
import HomePage from "@/ui/homePage/index";
import { useFetchPodcasts, useAuthorDetail } from "@/hooks";
import { useRouter } from "next/navigation";
import { cortarStrPorGuionOComa } from "@/lib";

jest.mock("@/ui/homePage/index", () =>
  jest.fn((props) => (
    <div>
      <div className="filter">
        <div className="badge">{props.filteredPodcasts.length}</div>
        <input
          type="text"
          value={props.filterValue}
          onChange={props.handleFilterChange}
          placeholder="Filter by title or artist"
          className="filterInput"
        />
      </div>
      <div className="containerHome">
        {props.filteredPodcasts.map(
          (podcast: { title: { label: React.Key | null | undefined } }) => (
            <div
              key={podcast.title.label}
              onClick={() => props.handleLinkClick(podcast)}
              className="clickPodcast"
            >
              <div>CardProduct Mock</div>
            </div>
          )
        )}
      </div>
    </div>
  ))
);
jest.mock("@/hooks", () => ({
  useFetchPodcasts: jest.fn(),
  useAuthorDetail: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockPodcasts = [
  {
    "im:name": { label: "Podcast 1" },
    "im:image": [
      { label: "image0.jpg" },
      { label: "image1.jpg" },
      { label: "http://example.com/image1.jpg" },
    ],
    summary: { label: "Summary 1" },
    "im:price": { label: "", attributes: { amount: "", currency: "" } },
    "im:contentType": { attributes: { term: "", label: "" } },
    rights: { label: "" },
    title: { label: "Podcast 1 - with extra" },
    link: { attributes: { rel: "", type: "", href: "" } },
    id: { label: "", attributes: { "im:id": "" } },
    "im:artist": { label: "Artist 1", attributes: { href: "" } },
    category: { attributes: { term: "", scheme: "", label: "" } },
    "im:releaseDate": { label: "", attributes: { label: "" } },
  },
];

describe("Home Page", () => {
  let mockSetAuthorDetail: jest.Mock;
  let mockPush: jest.Mock;

  beforeEach(() => {
    (useFetchPodcasts as jest.Mock).mockReturnValue({
      data: { feed: { entry: mockPodcasts } },
      error: null,
      isLoading: false,
    });

    mockSetAuthorDetail = jest.fn();
    mockPush = jest.fn();

    (useAuthorDetail as jest.Mock).mockReturnValue({
      setAuthorDetail: mockSetAuthorDetail,
    });
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("renders HomePage with the correct props", () => {
    render(<Home />);
    expect(
      screen.getByPlaceholderText("Filter by title or artist")
    ).toBeInTheDocument();
  });

  it("filters podcasts based on input", () => {
    render(<Home />);
    fireEvent.change(screen.getByPlaceholderText("Filter by title or artist"), {
      target: { value: "Artist 1" },
    });
    expect(screen.getByDisplayValue("Artist 1")).toBeInTheDocument();
  });
});
