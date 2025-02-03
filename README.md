# Book Management System

A simple yet efficient Book Management System that allows users to manage books by adding, editing, deleting, displaying, and searching for books. The system also supports displaying book prices and discounts, along with a modern responsive design using **Tailwind CSS**.

## Features

### 1. Add Books

- Users can enter the following book details:
  - **Title**
  - **Author**
  - **ISBN**
  - **Publication Date**
  - **Genre**
- All fields are required.
- Input is validated:
  - **ISBN** must be a numeric value.
  - **Publication Date** cannot be a future date.

### 2. Edit and Delete Books

- **Edit**: Users can modify existing book details using the **Edit** button.
- **Delete**: Users can remove books from the list using the **Delete** button.

### 3. Input Validations

- **ISBN**: Must be a valid number.
- **Publication Date**: Cannot be set to a future date.
- **All fields** are mandatory before submission.

### 4. Search

- Users can search for books by **Title**, **Author**, or **ISBN** using a search bar to quickly find relevant books.

### 5. Sorting of Books

- The books are displayed in alphabetical order by the **Author**.

### 6. Show Price and Discount of Books

- The application can display book prices, including any applicable discounts.

### 7. Tailwind CSS Integration

- The application utilizes **Tailwind CSS** for a modern, clean, and responsive design.

## Technologies Used

- **HTML**: For structuring the content.
- **CSS**: For styling (in conjunction with Tailwind CSS).
- **JavaScript**: For handling dynamic actions.
- **TypeScript**: For type safety and enhanced code quality.
- **Tailwind CSS**: For a modern, responsive design.
- **Vite**: A fast and efficient build tool.

## Setup Instructions

Follow these steps to get your Book Management System up and running locally:

## Setup Instructions

1. **Clone this repository** or download the code files:

   ```bash
   git clone https://github.com/piyushsinghgaur1/Book-Management-System-React.git
   ```

2. **Navigate into the project directory**:

   ```bash
   cd book-management-system
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```
