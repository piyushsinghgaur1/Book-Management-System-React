import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { X } from "lucide-react";

interface BookType {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  publicationDate: string;
  price: number;
  discountPrice: number;
  imageUrl: string;
}

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formValues: BookType) => void;
  bookData: BookType | null;
}

const AddBookModal: React.FC<AddBookModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  bookData,
}) => {
  const initialFormValues: BookType = {
    title: "",
    author: "",
    genre: "",
    isbn: "",
    publicationDate: "",
    price: 0,
    discountPrice: 0,
    imageUrl: "",
  };

  const [formValues, setFormValues] = useState<BookType>(initialFormValues);

  useEffect(() => {
    if (bookData) {
      // Set the form values to the book data when editing
      setFormValues(bookData);
    } else {
      // Reset the form values to initial state when adding a new book
      setFormValues(initialFormValues);
    }
  }, [bookData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newValue = e.target.type === "number" ? parseFloat(value) : value;
    setFormValues({ ...formValues, [name]: newValue });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
    setFormValues(initialFormValues);
  };

  const handleClose = () => {
    setFormValues(initialFormValues);
    onClose();
  };

  const handleCancel = () => {
    toast.success("Changes discarded", { autoClose: 1000 });
    setFormValues(initialFormValues);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute w-full inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative my-5">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {bookData ? "Edit Book" : "Add Book"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full space-y-4"
        >
          <div className="flex flex-col w-full space-y-4">
            {/* Book Title */}
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formValues.title}
                onChange={handleChange}
                placeholder="Enter Book Title"
                className="w-full py-2 px-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Author */}
            <div>
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formValues.author}
                onChange={handleChange}
                placeholder="Enter Author Name"
                className="w-full py-2 px-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* ISBN */}
            <div>
              <label htmlFor="isbn">ISBN</label>
              <input
                type="number"
                id="isbn"
                name="isbn"
                value={formValues.isbn}
                onChange={handleChange}
                placeholder="Enter ISBN"
                className="w-full py-2 px-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Publication Date */}
            <div>
              <label htmlFor="publicationDate">Publication Date</label>
              <input
                type="date"
                id="publicationDate"
                name="publicationDate"
                value={formValues.publicationDate}
                onChange={handleChange}
                className="w-full py-2 px-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formValues.price || ""}
                onChange={handleChange}
                placeholder="Enter Price"
                className="w-full py-2 px-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Discount Price */}
            <div>
              <label htmlFor="discountPrice">Discount Price</label>
              <input
                type="number"
                id="discountPrice"
                name="discountPrice"
                value={formValues.discountPrice || ""}
                onChange={handleChange}
                placeholder="Enter Discount Price"
                className="w-full py-2 px-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Genre */}
            <div>
              <label htmlFor="genre">Genre</label>
              <select
                id="genre"
                name="genre"
                value={formValues.genre}
                onChange={handleChange}
                className="w-full py-2 px-3 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Genre</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
                <option value="fantasy">Fantasy</option>
                <option value="science-fiction">Science</option>
                <option value="biography">Biography</option>
                <option value="mystery">Mystery</option>
                <option value="thriller">Thriller</option>
                <option value="romance">Romance</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between sm:space-x-4">
            <button
              type="submit"
              className="bg-green-600 p-3 text-white hover:bg-green-500 rounded-lg w-full sm:w-auto"
            >
              {bookData ? "Update Book" : "Add Book"}
            </button>
            <button
              type="reset"
              className="bg-red-500 p-3 text-white hover:bg-red-400 rounded-lg w-full sm:w-auto"
              onClick={() =>
                bookData ? handleCancel() : setFormValues(initialFormValues)
              }
            >
              {bookData ? "Cancel" : "Reset"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
