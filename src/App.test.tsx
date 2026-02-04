import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import PATHS from "./router/paths";
import App from "./App";

test("shows loading first, then title", async () => {

  renderWithProviders(<App />, PATHS.HOME);

  expect(screen.getByLabelText("loading")).toBeInTheDocument();

  const title = await screen.findByRole("heading", {
    name: "シン・学習記録アプリ",
  });
  expect(title).toBeInTheDocument();
});
