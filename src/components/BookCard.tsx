import React from "react";
type BookCardProps = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  publicationDate: string;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  onEdit?: () => void;
  onDelete?: () => void;
  backgroundColor?: string;
};
export const BookCard: React.FC<BookCardProps> = ({
  title,
  author,
  genre,
  isbn,
  publicationDate,
  price,
  discountPrice,
  onEdit,
  onDelete,
}) => {
  return (
    <div className=" min-w-fit flex flex-col bg-white rounded-lg shadow-xl border p-4  hover:shadow-2xl hover:bg-gray-100 transform transition duration-300 ease-in-out hover:scale-105">
      {/* Book Details */}
      <div className="flex flex-col space-y-2">
        <h3 className="text-2xl font-bold text-gray-800 hover:text-teal-600 transition duration-200">
          {title}
        </h3>
        <p className="text-sm text-gray-500">
          By: <span className="text-teal-500">{author}</span>
        </p>
        <p className="text-sm text-gray-500">
          Genre: <span className="text-teal-500">{genre}</span>
        </p>
        <p className="text-sm text-gray-500">
          ISBN: <span className="text-teal-500">{isbn}</span>
        </p>
        <p className="text-sm text-gray-500">
          Published on: <span className="text-teal-500">{publicationDate}</span>
        </p>
        {discountPrice && discountPrice !== price && (
          <p className="text-sm text-red-500 line-through">Rs {price}/-</p>
        )}
        <div className="flex flex-col items-start space-x-1">
          <p className="text-xl font-semibold text-teal-600">
            Rs{" "}
            {discountPrice && discountPrice !== 0 && discountPrice !== price
              ? discountPrice
              : price}
            {"/- "}
            {discountPrice ? (
              <span className="text-lg font-semibold text-green-600">
                ({Math.round(((price - discountPrice) * 100) / price)}% off)
              </span>
            ) : (
              ""
            )}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6 space-x-4">
        {onEdit && (
          <button
            onClick={onEdit}
            className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition duration-300"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition duration-300"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
export default BookCard;
