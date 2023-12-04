import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Timeseries from "./Timeseries";
import { fetchData } from "../common/api";

jest.mock("../common/api");

describe("Timeseries Component", () => {
  it("renders loading message and then displays temperature", async () => {
    fetchData.mockResolvedValueOnce([
      { time: "2023-12-04T06:00:00Z", air_temperature: 22 },
    ]);

    render(<Timeseries />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the data to be loaded
    await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull());

    // Check if temperature is displayed
    expect(screen.getByText(/22°C/)).toBeInTheDocument();
  });
});
