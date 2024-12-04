import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigationHandler = (path) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  return (
    <header className="fixed w-full px-6 py-4 z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      {/* Hamburger Button */}
      <button
        className="text-white text-3xl hover:text-primary-a40 duration-300"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-surface-a0 text-white shadow-lg transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="text-white text-3xl absolute top-4 left-4 hover:text-primary-a40 duration-300"
          onClick={toggleSidebar}
        >
          ✕
        </button>

        {/* Sidebar Links */}
        <ul className="mt-16 pt-5 space-y-6 px-6 h-[100vh] bg-surface-a0">
          <li
            className="cursor-pointer font-bold text-lg hover:text-primary-a40 duration-300"
            onClick={() => navigationHandler("/login")}
          >
            Log in
          </li>
          <li
            className="cursor-pointer font-bold text-lg hover:text-primary-a40 duration-300"
            onClick={() => navigationHandler("/register")}
          >
            Sign up
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;