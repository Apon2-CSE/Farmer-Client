// LoadingScreen.jsx
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black/50 flex flex-col justify-center items-center z-50">
      {/* Spinner */}
      <div className="w-20 h-20 border-4 border-green-600 border-t-transparent border-solid rounded-full animate-spin"></div>
      
      {/* Loading Text */}
      <p className="mt-4 text-white text-lg font-semibold animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
};

export default LoadingScreen;
