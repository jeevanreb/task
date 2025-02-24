import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllNews } from "../services/newsService";

interface NavbarProps {
  setNews: (data: any[]) => void;
  setLoading: (loading: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setNews, setLoading }) => {
  const [search, setSearch] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!search.trim()) return;

    setLoading(true);
    const data = await fetchAllNews("", search);
    setNews(data);
    setLoading(false);
  };

  return (
    <nav className="bg-green-700 text-white p-4 flex flex-col sm:flex-row items-center justify-between">
      <Link to="/" className="text-xl font-bold">News</Link>
      <div className="flex flex-wrap items-center gap-4 mt-2 sm:mt-0">
        <Link to="/category/technology" className="px-4">Technology</Link>
        <Link to="/category/sports" className="px-4">Sports</Link>
        <Link to="/category/health" className="px-4">Health</Link>
        <Link to="/settings" className="px-4">Settings</Link>
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="Search articles..."
            className="px-2 py-1 rounded-l-md text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="bg-red-500 px-3 py-1 rounded-r-md">Go</button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;