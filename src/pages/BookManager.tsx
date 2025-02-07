import { useState, useEffect, ChangeEvent } from "react";
import BookCard from "../components/BookCard";
import AddBookModal from "../components/AddBookModel";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

interface BookType {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  publicationDate: string;
  price: number;
  discountPrice: number;
}

function BookManager() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [sortCategory, setSortCategory] = useState<
    "title" | "author" | "isbn" | "publicationDate"
  >("title");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [books, setBooks] = useState<BookType[]>([]);
  let isValid = false;

  // Load books from localStorage
  useEffect(() => {
    const savedBooks = localStorage.getItem("books");
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);

  // Save books to localStorage whenever the books state changes
  useEffect(() => {
    if (books.length > 0) {
      localStorage.setItem("books", JSON.stringify(books));
    }
  }, [books]);

  // Form validation for adding or editing books
  const handleFormValidation = (newBook: BookType): boolean => {
    isValid = true;
    if (!newBook.title) {
      toast.error("Please fill Title.");
      isValid = false;
    }
    if (!newBook.author) {
      toast.error("Please fill Author.");
      isValid = false;
    }
    if (!newBook.genre) {
      toast.error("Please fill genre.");
      isValid = false;
    }
    if (!newBook.isbn) {
      toast.error("Please fill ISBN.");
      isValid = false;
    }
    if (!newBook.publicationDate) {
      toast.error("Please fill Publication Date.");
      isValid = false;
    }

    if (newBook.price < 0 || newBook.discountPrice < 0) {
      toast.error("Price cannot be negative.");
      isValid = false;
    }
    if (newBook.discountPrice > newBook.price) {
      toast.error("Discount price cannot be greater than the actual price.");
      isValid = false;
    }
    if (newBook.publicationDate > new Date().toISOString().split("T")[0]) {
      toast.error("Publication date cannot be in the future.");
      isValid = false;
    }
    return isValid;
  };

  // Function to handle adding or editing books
  const handleAddOrEditBook = (book: BookType) => {
    if (!handleFormValidation(book)) {
      return;
    }

    let updatedBooks: BookType[];

    if (editIndex !== null) {
      updatedBooks = [...books];
      updatedBooks[editIndex] = book;
      toast.success("Book updated successfully.");
    } else {
      updatedBooks = [...books, book];
      toast.success("Book added successfully.");
    }

    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    setModalOpen(false);
    setEditIndex(null);
  };

  // Function to handle deleting a book
  const handleDeleteBook = (index: number) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    toast.success("Book deleted successfully.");
  };

  // Function to handle editing a book
  const handleEditBook = (index: number) => {
    setEditIndex(index);
    setModalOpen(true);
  };

  // Function to toggle sorting order
  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Filter and sort books based on the search query and sort settings
  const filteredBooks = books
    .filter((book) =>
      [book.title, book.author, book.genre].some((field) =>
        field.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (!sortOrder) return 0;

      const aValue = a[sortCategory as keyof BookType].toString().toLowerCase();
      const bValue = b[sortCategory as keyof BookType].toString().toLowerCase();

      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center px-4 pt-16 min-h-screen">
        <button
          onClick={() => setModalOpen(true)}
          className="text-2xl px-6 py-3 m-5 bg-green-600 text-white rounded-full"
          data-testid="AddBook"
        >
          Add Book
        </button>

        <div className="flex gap-4 mt-6 items-center justify-center">
          {/* Search Box */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            placeholder="Search"
            className="px-4 py-2 w-full sm:w-1/3 rounded-md border-2"
            data-testid="searchInput"
          />

          {/* Sort Label and Dropdown */}
          <div className="flex items-center gap-2">
            <span>Sort by:</span>
            <select
              onChange={(e) =>
                setSortCategory(
                  e.target.value as
                    | "title"
                    | "author"
                    | "isbn"
                    | "publicationDate"
                )
              }
              className="px-4 py-2 rounded-md border-2 min-w-[150px]"
              data-testid="sortCategory"
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="isbn">ISBN</option>
              <option value="publicationDate">Publication Date</option>
            </select>
          </div>

          {/* Sort Button */}
          <button
            onClick={handleSort}
            data-testid="sortBtn"
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            {sortOrder === "asc" ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
          </button>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          data-testid="booksContainer"
        >
          {filteredBooks.map((book, index) => (
            <div key={index} className="w-full p-4" data-testid="bookItem">
              <BookCard
                {...book}
                onEdit={() => handleEditBook(index)}
                onDelete={() => handleDeleteBook(index)}
                data-testid={`book-${index}`}
              />
            </div>
          ))}
        </div>

        <AddBookModal
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditIndex(null);
          }}
          onSubmit={handleAddOrEditBook}
          bookData={editIndex !== null ? books[editIndex] : null}
        />
      </div>
      <Footer />
    </>
  );
}

export default BookManager;
