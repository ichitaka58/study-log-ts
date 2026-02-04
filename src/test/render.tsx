import { Provider } from "@/components/ui/provider";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

export const renderWithProviders = (ui: React.ReactNode, path="/") => {
  return render(
    <Provider>
      <MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>
    </Provider>,
  );
};
