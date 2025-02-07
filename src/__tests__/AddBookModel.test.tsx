import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import AddBookModal from "../components/AddBookModel";

describe("AddBookModal", () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  const initialProps = {
    isOpen: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
    bookData: null,
  };

  test("renders the modal when isOpen is true", () => {
    render(<AddBookModal {...initialProps} />);
    expect(screen.getByTestId("BookForm")).toBeInTheDocument();
  });

  test("does not render the modal when isOpen is false", () => {
    render(<AddBookModal {...initialProps} isOpen={false} />);
    expect(screen.queryByTestId("BookForm")).not.toBeInTheDocument();
  });

  test("calls onClose when the close button is clicked", () => {
    render(<AddBookModal {...initialProps} />);
    fireEvent.click(screen.getByTestId("closeBtn"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("displays 'Edit Book' when bookData is provided", () => {
    const bookData = {
      title: "Existing Book",
      author: "Existing Author",
      genre: "fiction",
      isbn: "1234567890",
      publicationDate: "2023-01-01",
      price: 10,
      discountPrice: 5,
      imageUrl: "",
    };
    render(<AddBookModal {...initialProps} bookData={bookData} />);
    expect(screen.getByText(/edit book/i)).toBeInTheDocument();
  });

  test("resets the form values when the reset button is clicked", async () => {
    render(
      <AddBookModal
        isOpen={true}
        onClose={() => {}}
        onSubmit={() => {}}
        bookData={null}
      />
    );

    const titleInput = screen.getByTestId("title");
    const authorInput = screen.getByTestId("author");
    const isbnInput = screen.getByTestId("isbn");
    const priceInput = screen.getByTestId("price");
    const discountPriceInput = screen.getByTestId("discountPrice");
    const genreSelect = screen.getByTestId("genre");

    fireEvent.change(titleInput, { target: { value: "Test Book" } });
    fireEvent.change(authorInput, { target: { value: "Test Author" } });
    fireEvent.change(isbnInput, { target: { value: "1234567890" } });
    fireEvent.change(priceInput, { target: { value: "20" } });
    fireEvent.change(discountPriceInput, { target: { value: "15" } });
    fireEvent.change(genreSelect, { target: { value: "fiction" } });

    fireEvent.click(screen.getByText("Reset"));

    await waitFor(() => {
      expect(screen.getByTestId("title")).toHaveValue("");
      expect(screen.getByTestId("author")).toHaveValue("");
      expect(screen.getByTestId("isbn")).toHaveValue("");
      expect(screen.getByTestId("publicationDate")).toHaveValue("");
      expect(screen.getByTestId("price")).toHaveValue(null);
      expect(screen.getByTestId("discountPrice")).toHaveValue(null);
      expect(screen.getByTestId("genre")).toHaveValue("");
    });
  });

  test("calls onSubmit with form values when the form is submitted", async () => {
    render(<AddBookModal {...initialProps} />);

    // Fill in form fields using test ids or roles
    fireEvent.change(screen.getByTestId("title"), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByTestId("author"), {
      target: { value: "Test Author" },
    });
    fireEvent.change(screen.getByTestId("isbn"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByTestId("publicationDate"), {
      target: { value: "2023-01-01" },
    });
    fireEvent.change(screen.getByTestId("price"), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByTestId("discountPrice"), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByTestId("genre"), {
      target: { value: "fiction" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /add book/i }));

    // Wait for form submission
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: "Test Title",
        author: "Test Author",
        genre: "fiction",
        isbn: "1234567890",
        publicationDate: "2023-01-01",
        price: 10,
        discountPrice: 5,
      });
    });
  });

  test("should reset form values when reset button is clicked", async () => {
    render(
      <AddBookModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        bookData={null}
      />
    );

    fireEvent.change(screen.getByTestId("title"), {
      target: { value: "Sample Book" },
    });
    fireEvent.change(screen.getByTestId("author"), {
      target: { value: "John Doe" },
    });

    fireEvent.click(screen.getByTestId("resetBtn"));

    await waitFor(() => {
      expect(screen.getByTestId("title")).toHaveValue("");
      expect(screen.getByTestId("author")).toHaveValue("");
    });
  });

  test("should successfully submit the form with valid inputs", async () => {
    render(
      <AddBookModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        bookData={null}
      />
    );

    fireEvent.change(screen.getByTestId("title"), {
      target: { value: "Test Book" },
    });
    fireEvent.change(screen.getByTestId("author"), {
      target: { value: "Test Author" },
    });
    fireEvent.change(screen.getByTestId("isbn"), {
      target: { value: "978-3-16-148410-0" }, // Valid ISBN
    });
    fireEvent.change(screen.getByTestId("publicationDate"), {
      target: { value: "2022-01-01" },
    });
    fireEvent.change(screen.getByTestId("price"), {
      target: { value: "20" },
    });
    fireEvent.change(screen.getByTestId("discountPrice"), {
      target: { value: "15" },
    });
    fireEvent.change(screen.getByTestId("genre"), {
      target: { value: "fiction" },
    });

    fireEvent.click(screen.getByTestId("addBookBtn"));

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: "Test Book",
        author: "Test Author",
        isbn: "978-3-16-148410-0",
        publicationDate: "2022-01-01",
        price: 20,
        discountPrice: 15,
        genre: "fiction",
      });
    });
  });
});
