// src/pages/ErrorPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center">
      <h1 className="text-6xl font-bold text-green-700 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
