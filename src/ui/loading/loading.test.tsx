import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loading from "./index";

describe("Loading Component", () => {
  it("renders the loading spinner", () => {
    render(<Loading />);

    const loadingContainer = screen.getByRole("status");
    expect(loadingContainer).toBeInTheDocument();

    const loadingSpinner = screen.getByTestId("loading-spinner");
    expect(loadingSpinner).toBeInTheDocument();
  });
});
