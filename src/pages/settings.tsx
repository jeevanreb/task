import React, { useState, useEffect } from "react";
import Logo from "../components/logo";

const sourcesList = ["newsapi", "guardian", "nyt"];
const categoriesList = ["technology", "sports", "health"];

const Settings: React.FC = () => {
  const [selectedSources, setSelectedSources] = useState<string[]>(sourcesList);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoriesList);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedSources = JSON.parse(localStorage.getItem("preferredSources") || "null");
    const savedCategories = JSON.parse(localStorage.getItem("preferredCategories") || "null");

    if (savedSources) setSelectedSources(savedSources);
    if (savedCategories) setSelectedCategories(savedCategories);
  }, []);

  const handleSave = () => {
    localStorage.setItem("preferredSources", JSON.stringify(selectedSources));
    localStorage.setItem("preferredCategories", JSON.stringify(selectedCategories));
    alert("Preferences Saved!");
  };

  return (
    <>
      <Logo />
      <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg mt-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Customize Your News</h1>

        {/* Select News Sources */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Select Sources</h2>
          <div className="space-y-2">
            {sourcesList.map((source) => (
              <label key={source} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={source}
                  checked={selectedSources.includes(source)}
                  onChange={(e) =>
                    setSelectedSources(
                      e.target.checked
                        ? [...selectedSources, source]
                        : selectedSources.filter((s) => s !== source)
                    )
                  }
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-800 text-lg">{source.toUpperCase()}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Select News Categories */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Select Categories</h2>
          <div className="space-y-2">
            {categoriesList.map((category) => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={(e) =>
                    setSelectedCategories(
                      e.target.checked
                        ? [...selectedCategories, category]
                        : selectedCategories.filter((c) => c !== category)
                    )
                  }
                  className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-gray-800 text-lg">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300"
        >
          Save Preferences
        </button>
      </div>
    </>
  );
};

export default Settings;