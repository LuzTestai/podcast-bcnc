import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardDetail from "./index";
import { CardDetailProps } from "@/types";
import { convertirFecha, convertirDuracion } from "@/lib/index";

jest.mock("@/lib/index", () => ({
  convertirFecha: jest.fn((date) => `Fecha convertida: ${date}`),
  convertirDuracion: jest.fn((time) => `Duración convertida: ${time}`),
}));

const mockProps: CardDetailProps = {
  title: "Test Podcast",
  author: "Test Author",
  description: "This is a test description",
  episodes: 5,
  podcastDetail: [
    {
      collectionId: 1,
      collectionName: "Episode 1",
      feedUrl: "http://example.com/1",
      releaseDate: "2023-01-01",
      trackTimeMillis: 3600000,
      episodes: [],
      artistId: 0,
      artistName: "",
      artistViewUrl: "",
      artworkUrl30: "",
      artworkUrl60: "",
      artworkUrl100: "",
      artworkUrl600: "",
      collectionCensoredName: "",
      collectionExplicitness: "",
      collectionHdPrice: 0,
      collectionPrice: 0,
      collectionViewUrl: "",
      contentAdvisoryRating: "",
      country: "",
      currency: "",
      genreIds: [],
      genres: [],
      kind: "",
      primaryGenreName: "",
      trackCensoredName: "",
      trackCount: 0,
      trackExplicitness: "",
      trackId: 0,
      trackName: "",
      trackPrice: 0,
      trackViewUrl: "",
      wrapperType: "",
    },
  ],
  image: "http://example.com/image.jpg",
  onClickEpisodeProp: jest.fn(),
};

describe("CardDetail Component", () => {
  it("renders correctly", () => {
    render(<CardDetail {...mockProps} />);

    const imgElement = screen.getByRole("img");
    expect(imgElement).toBeInTheDocument();
    if (mockProps.image) {
      expect(imgElement).toHaveAttribute("src");
      expect(imgElement.getAttribute("src")).toContain(
        encodeURIComponent(mockProps.image)
      );
    }

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(`by ${mockProps.author}`)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    expect(
      screen.getByText(`Episodes : ${mockProps.episodes}`)
    ).toBeInTheDocument();
  });

  it("displays podcast details correctly", () => {
    render(<CardDetail {...mockProps} />);

    expect(screen.getByText("Episode 1")).toBeInTheDocument();
    expect(
      screen.getByText("Fecha convertida: 2023-01-01")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Duración convertida: 3600000")
    ).toBeInTheDocument();
  });

  it("handles episode click correctly", () => {
    render(<CardDetail {...mockProps} />);

    const episodeLink = screen.getByText("Episode 1");
    fireEvent.click(episodeLink);

    expect(mockProps.onClickEpisodeProp).toHaveBeenCalledWith(
      "http://example.com/1"
    );
  });
});
