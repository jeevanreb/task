import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <nav className="bg-green-700 text-white p-4 flex flex-col sm:flex-row items-center justify-between">
      <Link to="/" className="text-xl font-bold">NEWS</Link>
      <div className="flex flex-wrap items-center gap-4 mt-2 sm:mt-0">
        <Link to="/category/technology" className="px-4">Technology</Link>
        <Link to="/category/sports" className="px-4">Sports</Link>
        <Link to="/category/health" className="px-4">Health</Link>
        <Link to="/settings" className="px-4">Settings</Link>
      </div>
    </nav>
  );
};

export default Logo;