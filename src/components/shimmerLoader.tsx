import React from "react";

const ShimmerLoader: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="border rounded-lg shadow-lg p-4 animate-pulse">
          <div className="w-full h-48 bg-gray-300 rounded-md"></div>
          <div className="h-6 bg-gray-300 my-2 w-3/4 rounded-md"></div>
          <div className="h-4 bg-gray-300 w-full rounded-md"></div>
          <div className="h-4 bg-gray-300 w-1/2 mt-2 rounded-md"></div>
        </div>
      ))}
    </div>
  );
};

export default ShimmerLoader;
