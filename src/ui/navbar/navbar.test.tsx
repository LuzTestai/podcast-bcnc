import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import Navbar from "./index";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Navbar Component", () => {
  it("renders the navbar with the title", () => {
    render(<Navbar />);
    expect(screen.getByText("Podcaster")).toBeInTheDocument();
  });

  it("navigates to the home page when the title is clicked", () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(<Navbar />);
    fireEvent.click(screen.getByText("Podcaster"));
    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
