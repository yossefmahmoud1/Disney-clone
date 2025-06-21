import logo from "./../assets/images/logo.png";
import {
  HiHome,
  HiStar,
  HiPlayCircle,
  HiTv,
  HiMagnifyingGlass,
  HiBars3,
} from "react-icons/hi2";
import { HiPlus, HiLogout, HiX } from "react-icons/hi";
import HeaderItem from "./HeaderItem";
import { useState, useRef, useEffect } from "react";
import User_icon from "../assets/images/9.png";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const sidebarRef = useRef(null);
  const { user, logout, getFirstName } = useUser();
  const navigate = useNavigate();

  const menu = [
    { name: "HOME", icon: HiHome },
    { name: "WATCH LIST", icon: HiPlus },
    { name: "ORIGINALS", icon: HiStar },
    { name: "MOVIES", icon: HiPlayCircle },
    { name: "SERIES", icon: HiTv },
  ];

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
    toast.success("🕷️ See you soon! You've been logged out successfully.", {
      icon: "🎬",
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput("");
    }
  };

  const handleMenuItemClick = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-40 md:hidden backdrop-blur-sm" />
      )}

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 sm:w-72 bg-gradient-to-b from-[#1E2442] to-[#0F0F23] transform transition-transform duration-300 ease-in-out z-50 md:hidden shadow-2xl ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700/50 bg-gradient-to-r from-red-600/20 to-blue-600/20">
            <Link to="/">
              <img
                src={logo}
                className="w-[70px] sm:w-[90px] object-contain cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white hover:text-red-400 transition-colors p-1.5 sm:p-2 rounded-full hover:bg-white/10"
            >
              <HiX className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Sidebar Menu */}
          <nav className="flex-1 p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4 px-2">
                Navigation
              </h3>
              {menu.map((item, index) => (
                <Link
                  key={index}
                  to={
                    item.name === "HOME"
                      ? "/"
                      : `/${item.name.replace(/\s+/g, "").toLowerCase()}`
                  }
                  onClick={handleMenuItemClick}
                  className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl text-white hover:bg-white/10 transition-all duration-200 group"
                >
                  <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-red-500/20 to-blue-500/20 group-hover:from-red-500/30 group-hover:to-blue-500/30 transition-all">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 sm:p-6 border-t border-gray-700/50 bg-gradient-to-r from-red-600/10 to-blue-600/10">
            {user ? (
              <div className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl bg-white/5">
                <img
                  src={User_icon}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/20"
                  alt="User"
                />
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold">
                    Hi, {getFirstName()}!
                  </p>
                  <button
                    onClick={handleLogout}
                    className="text-gray-400 text-xs hover:text-red-400 transition-colors flex items-center gap-2 mt-1"
                  >
                    <HiLogout className="w-3 h-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={handleMenuItemClick}
                className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
              >
                <img
                  src={User_icon}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/20"
                  alt="User"
                />
                <div>
                  <span className="text-white text-sm font-semibold block">
                    Sign In
                  </span>
                  <span className="text-gray-400 text-xs">
                    Access your account
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 md:p-[20px] bg-gradient-to-r from-[#1E2442] to-[#0F0F23] relative z-30 shadow-lg">
        <div className="flex items-center gap-3 sm:gap-4 md:gap-8">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-white hover:text-red-400 transition-colors p-1.5 sm:p-2 rounded-lg hover:bg-white/10 flex-shrink-0"
          >
            <HiBars3 className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <Link to="/" className="flex-shrink-0">
            <img
              src={logo}
              className="w-[70px] sm:w-[80px] md:w-[80px] lg:w-[115px] object-cover cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {menu.map((item, index) => (
              <HeaderItem key={index} name={item.name} Icon={item.icon} />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
          <form
            onSubmit={handleSearch}
            className="flex items-center border border-gray-600/50 rounded-lg sm:rounded-xl p-1.5 sm:p-2 md:p-2.5 bg-white/5 backdrop-blur-sm flex-shrink-0"
          >
            <HiMagnifyingGlass className="text-gray-400 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="bg-transparent outline-none text-white ml-1.5 sm:ml-2 md:ml-3 text-xs sm:text-sm md:text-base w-16 sm:w-20 md:w-auto placeholder-gray-400"
            />
          </form>

          {/* Login/User Button */}
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <span className="text-white text-xs sm:text-sm hidden md:block">
                Hi, {getFirstName()}!
              </span>
              <div className="hidden sm:flex items-center gap-2 sm:gap-2.5">
                <img
                  src={User_icon}
                  className="w-[30px] sm:w-[34px] md:w-[40px] rounded-full border-2 border-white/20"
                  alt="User Profile"
                />
                <button
                  onClick={handleLogout}
                  className="px-2.5 py-2 sm:px-3 sm:py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-xs sm:text-sm transition-colors"
                >
                  Log Out
                </button>
              </div>
              <button
                onClick={handleLogout}
                className="sm:hidden px-2 py-1.5 sm:px-2.5 sm:py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-xs transition-colors"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
              <img
                src={User_icon}
                className="hidden sm:block w-[30px] sm:w-[34px] md:w-[40px] rounded-full border-2 border-white/20"
                alt="User Profile"
              />
              <Link
                to="/login"
                className="px-2 py-1.5 sm:px-2.5 sm:py-2 md:px-3 md:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-xs sm:text-sm transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
