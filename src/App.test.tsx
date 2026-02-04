import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "./components/ui/provider";

test("shows loading first, then title", async () => {
  render(
    <Provider>
      <App />
    </Provider>
  );

  expect(screen.getByLabelText("loading")).toBeInTheDocument();

  const title = await screen.findByRole("heading", {
    name: "シン・学習記録アプリ",
  });
  expect(title).toBeInTheDocument();
});
