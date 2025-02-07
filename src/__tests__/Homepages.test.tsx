import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Homepage from "../pages/Hompages";

describe("Homepage", () => {
  test("renders the welcome header correctly", () => {
    render(
      <Router>
        <Homepage />
      </Router>
    );
    const headerText = screen.getByText(/Welcome to Book Management System/i);
    expect(headerText).toBeInTheDocument();
  });

  test("renders the features section", () => {
    render(
      <Router>
        <Homepage />
      </Router>
    );

    const featuresTitle = screen.getByText(/Features of Our System/i);
    expect(featuresTitle).toBeInTheDocument();
  });

  test("renders the login button with correct link", () => {
    render(
      <Router>
        <Homepage />
      </Router>
    );

    const loginButton = screen.getByRole("link", {
      name: /Login to Your Account/i,
    });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveAttribute("href", "/login");
  });

  test("renders the footer component", () => {
    render(
      <Router>
        <Homepage />
      </Router>
    );
  });
});
