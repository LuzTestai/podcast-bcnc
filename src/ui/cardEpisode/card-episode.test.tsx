import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardEpisode from "./index";
import { convertirAHTML } from "@/lib";
import { CardEpisodeProps } from "@/types";
import DOMPurify from "dompurify";

jest.mock("@/lib", () => ({
  convertirAHTML: jest.fn((str) => `<p>${str}</p>`),
}));

jest.mock("dompurify", () => ({
  sanitize: jest.fn((str) => str),
}));

const mockProps: CardEpisodeProps = {
  title: "Test Podcast",
  author: "Test Author",
  description: "This is a test description",
  titleEpisode: "Test Episode",
  image: "http://example.com/image.jpg",
  descriptionEpisode: "This is a test episode description",
  audio: "http://example.com/audio.mp3",
};

describe("CardEpisode Component", () => {
  it("renders correctly", () => {
    render(<CardEpisode {...mockProps} />);

    // Verificar imagen
    const imgElement = screen.getByRole("img");
    expect(imgElement).toBeInTheDocument();
    if (mockProps.image) {
      expect(imgElement).toHaveAttribute("src");
      expect(imgElement.getAttribute("src")).toContain(
        encodeURIComponent(mockProps.image)
      );
    }

    // Verificar título, autor y descripción
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(`by ${mockProps.author}`)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();

    // Verificar título del episodio
    if (mockProps.titleEpisode) {
      expect(screen.getByText(mockProps.titleEpisode)).toBeInTheDocument();
    }

    // Verificar descripción del episodio
    if (mockProps.descriptionEpisode) {
      expect(
        screen.getByText(mockProps.descriptionEpisode)
      ).toBeInTheDocument();
    }

    // Verificar audio
    const audioElement = screen.getByTestId("audio-element");
    expect(audioElement).toBeInTheDocument();
    const sourceElement = audioElement.querySelector("source");
    expect(sourceElement).toBeInTheDocument();
    if (sourceElement) {
      expect(sourceElement).toHaveAttribute("src", mockProps.audio);
    }
  });

  it("displays sanitized description episode correctly", () => {
    render(<CardEpisode {...mockProps} />);

    // Verificar que la descripción del episodio se haya procesado y sanitizado correctamente
    const sanitizedDescription = convertirAHTML(mockProps.descriptionEpisode);
    expect(DOMPurify.sanitize).toHaveBeenCalledWith(sanitizedDescription);
    if (mockProps.descriptionEpisode) {
      expect(
        screen.getByText(mockProps.descriptionEpisode)
      ).toBeInTheDocument();
    }
  });

  it("renders audio element correctly", () => {
    render(<CardEpisode {...mockProps} />);

    const audioElement = screen.getByTestId("audio-element");
    expect(audioElement).toBeInTheDocument();
    const sourceElement = audioElement.querySelector("source");
    expect(sourceElement).toBeInTheDocument();
    if (sourceElement) {
      expect(sourceElement).toHaveAttribute("src", mockProps.audio);
    }
  });
});
