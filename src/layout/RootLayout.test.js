import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import RootLayout from "./RootLayout";

const queryClient = new QueryClient();

beforeEach(() => {
  fetch.resetMocks();
});

const renderWithClient = (ui) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

test("loads and displays users", async () => {
  fetch.mockResponseOnce(
    JSON.stringify({
      users: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Doe" },
      ],
    })
  );

  renderWithClient(<RootLayout />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();

  await waitFor(() => screen.getByText("John Doe"));

  expect(screen.getByText("John Doe")).toBeInTheDocument();
  expect(screen.getByText("Jane Doe")).toBeInTheDocument();
});
