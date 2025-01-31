import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Homepage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header Section */}
      <header className="bg-green-800 text-white py-8">
        <div className="container mx-auto text-center px-6">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Welcome to Book Management System
          </h1>
          <p className="mt-4 text-lg sm:text-xl max-w-lg mx-auto">
            Easily manage your books and track your reading progress in one place.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-800 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white">
              Features of Our System
            </h2>
            <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
              Our Book Management System offers a range of features to help you organize and manage your books effectively.
            </p>
          </div>

          {/* Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Manage Books */}
            <div className="bg-gray-700 shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300 ease-in-out hover:bg-green-600">
              <h3 className="text-xl font-semibold text-white">Manage Books</h3>
              <p className="text-gray-300 mt-2 hover:text-white">
                Add, edit, and delete books in your collection easily. Keep your library organized and up to date.
              </p>
            </div>

            {/* Feature 2: Sort, Filter, & Search */}
            <div className="bg-gray-700 shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300 ease-in-out hover:bg-green-600">
              <h3 className="text-xl font-semibold text-white">Sort, Filter & Search</h3>
              <p className="text-gray-300 mt-2  hover:text-white">
                Sort books by title, filter them by category or age group, and search quickly to find exactly what you're looking for.
              </p>
            </div>

            {/* Feature 3: Track Progress */}
            <div className="bg-gray-700 shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300 ease-in-out hover:bg-green-600">
              <h3 className="text-xl font-semibold text-white">Book Age Calculation</h3>
              <p className="text-gray-300 mt-2  hover:text-white">
                Book’s age can lead to better recommendations. For instance, a user might want to discover newer books in a particular category, or explore older books.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-400">Ready to get started?</p>
            <Link
              to="/login"
              className="inline-block mt-6 px-10 py-4 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 transform hover:scale-105"
            >
              Login to Your Account
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer/> 
    </div>
  );
};

export default Homepage;
