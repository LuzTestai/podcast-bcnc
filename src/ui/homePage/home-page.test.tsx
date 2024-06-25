import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "./index";
import { HomePageProps, Entry } from "@/types";
import CardProduct from "@/ui/cardProduct";
import Loading from "@/ui/loading";

jest.mock("@/ui/cardProduct", () => jest.fn(() => <div>CardProduct Mock</div>));
jest.mock("@/ui/loading", () => jest.fn(() => <div>Loading Mock</div>));

const mockPodcasts: Entry[] = [
  {
    "im:name": { label: "Podcast Name 1" },
    "im:image": [
      {
        label: "",
        attributes: {
          height: "",
        },
      },
      {
        label: "http://example.com/image1.jpg",
        attributes: {
          height: "",
        },
      },
    ],
    summary: { label: "Summary 1" },
    "im:price": {
      label: "$1.99",
      attributes: { amount: "1.99", currency: "USD" },
    },
    "im:contentType": {
      attributes: { term: "term1", label: "Content Type 1" },
    },
    rights: { label: "Rights 1" },
    title: { label: "Podcast 1" },
    link: {
      attributes: {
        rel: "self",
        type: "text/html",
        href: "http://example.com/podcast1",
      },
    },
    id: { label: "http://example.com/podcast1", attributes: { "im:id": "1" } },
    "im:artist": {
      label: "Author 1",
      attributes: { href: "http://example.com/author1" },
    },
    category: {
      attributes: {
        term: "term1",
        scheme: "http://example.com/scheme1",
        label: "Category 1",
      },
    },
    "im:releaseDate": {
      label: "2023-01-01",
      attributes: { label: "January 1, 2023" },
    },
  },
  {
    "im:name": { label: "Podcast Name 2" },
    "im:image": [
      {
        label: "",
        attributes: {
          height: "",
        },
      },
      {
        label: "http://example.com/image2.jpg",
        attributes: {
          height: "",
        },
      },
    ],
    summary: { label: "Summary 2" },
    "im:price": {
      label: "$2.99",
      attributes: { amount: "2.99", currency: "USD" },
    },
    "im:contentType": {
      attributes: { term: "term2", label: "Content Type 2" },
    },
    rights: { label: "Rights 2" },
    title: { label: "Podcast 2" },
    link: {
      attributes: {
        rel: "self",
        type: "text/html",
        href: "http://example.com/podcast2",
      },
    },
    id: { label: "http://example.com/podcast2", attributes: { "im:id": "2" } },
    "im:artist": { label: "Author 2" },
    category: {
      attributes: {
        term: "term2",
        scheme: "http://example.com/scheme2",
        label: "Category 2",
      },
    },
    "im:releaseDate": {
      label: "2023-02-01",
      attributes: { label: "February 1, 2023" },
    },
  },
];

const mockProps: HomePageProps = {
  isLoading: false,
  filteredPodcasts: mockPodcasts,
  filterValue: "",
  handleFilterChange: jest.fn(),
  handleLinkClick: jest.fn(),
};

describe("HomePage Component", () => {
  it("renders loading component when isLoading is true", () => {
    render(<HomePage {...mockProps} isLoading={true} />);
    expect(screen.getByText("Loading Mock")).toBeInTheDocument();
  });

  it("renders the correct number of filtered podcasts", () => {
    render(<HomePage {...mockProps} />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders filter input with correct placeholder", () => {
    render(<HomePage {...mockProps} />);
    const inputElement = screen.getByPlaceholderText(
      "Filter by title or artist"
    );
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(mockProps.filterValue);
  });

  it("calls handleFilterChange on input change", () => {
    render(<HomePage {...mockProps} />);
    const inputElement = screen.getByPlaceholderText(
      "Filter by title or artist"
    );
    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(mockProps.handleFilterChange).toHaveBeenCalled();
  });

  it("renders CardProduct components for each filtered podcast", () => {
    render(<HomePage {...mockProps} />);
    expect(screen.getAllByText("CardProduct Mock")).toHaveLength(
      mockPodcasts.length
    );
  });

  it("calls handleLinkClick when a podcast is clicked", () => {
    render(<HomePage {...mockProps} />);
    const podcastElements = screen.getAllByText("CardProduct Mock");
    fireEvent.click(podcastElements[0]);
    expect(mockProps.handleLinkClick).toHaveBeenCalledWith(mockPodcasts[0]);
  });
});
