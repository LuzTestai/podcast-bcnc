import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardProduct from "./index";
import { CardProductProps } from "@/types";

jest.mock("@/lib", () => ({
  cortarStrPorGuionOComa: jest.fn((str) => `Processed: ${str}`),
}));

const mockProps: CardProductProps = {
  title: "Test Product - Example",
  autor: "Test Author",
  image: "http://example.com/image.jpg",
};

describe("CardProduct Component", () => {
  it("renders correctly", () => {
    render(<CardProduct {...mockProps} />);

    const imgElement = screen.getByRole("img");
    expect(imgElement).toBeInTheDocument();
    if (mockProps.image) {
      expect(imgElement).toHaveAttribute("src");
      expect(imgElement.getAttribute("src")).toContain(
        encodeURIComponent(mockProps.image)
      );
    }

    expect(
      screen.getByText(`Processed: ${mockProps.title}`)
    ).toBeInTheDocument();
    expect(screen.getByText(mockProps.autor)).toBeInTheDocument();
  });

  it("displays processed title correctly", () => {
    render(<CardProduct {...mockProps} />);

    expect(
      screen.getByText(`Processed: ${mockProps.title}`)
    ).toBeInTheDocument();
  });

  it("displays author correctly", () => {
    render(<CardProduct {...mockProps} />);

    expect(screen.getByText(mockProps.autor)).toBeInTheDocument();
  });
});
