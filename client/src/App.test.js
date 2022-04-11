import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

test("renders sneakers text", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const linkElement = screen.getByText(/sneakers/i);
  expect(linkElement).toBeInTheDocument();
});
