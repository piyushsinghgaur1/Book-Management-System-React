import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BookManager from "../pages/BookManager";

describe("BookManager", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders Add Book button", () => {
    render(
      <MemoryRouter>
        <BookManager />
      </MemoryRouter>
    );
    expect(screen.getByTestId("AddBook")).toBeInTheDocument();
  });

  test("opens add book modal when clicking Add Book button", () => {
    render(
      <MemoryRouter>
        <BookManager />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId("AddBook"));
    expect(screen.getByTestId("BookForm")).toBeInTheDocument();
  });

  test("loads books from localStorage", async () => {
    localStorage.setItem(
      "books",
      JSON.stringify([
        {
          title: "Stored Book",
          author: "Author",
          isbn: "1234567890123",
          genre: "Fiction",
          publicationDate: "2023-01-01",
          price: 100,
          discountPrice: 80,
        },
      ])
    );

    render(
      <MemoryRouter>
        <BookManager />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Stored Book")).toBeInTheDocument();
    });
  });

  test("filters books based on search input", async () => {
    localStorage.setItem(
      "books",
      JSON.stringify([
        {
          title: "React Guide",
          author: "Dan Abramov",
          isbn: "9876543210123",
          genre: "Programming",
          publicationDate: "2022-05-10",
          price: 50,
          discountPrice: 40,
        },
      ])
    );

    render(
      <MemoryRouter>
        <BookManager />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("React Guide")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByTestId("searchInput"), {
      target: { value: "React" },
    });

    await waitFor(() => {
      expect(screen.getByText("React Guide")).toBeInTheDocument();
    });
  });

  test("deletes a book when delete button is clicked", async () => {
    localStorage.setItem(
      "books",
      JSON.stringify([
        {
          title: "Book to Delete",
          author: "John Doe",
          isbn: "1111222233334",
          genre: "Mystery",
          publicationDate: "2021-08-15",
          price: 200,
          discountPrice: 150,
        },
      ])
    );

    render(
      <MemoryRouter>
        <BookManager />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Book to Delete")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("deletebtn"));

    await waitFor(() => {
      expect(screen.queryByText("Book to Delete")).not.toBeInTheDocument();
    });
  });
});
