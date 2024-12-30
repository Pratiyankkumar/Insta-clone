/* eslint-disable react/prop-types */
import {
  Search,
  Home,
  Compass,
  Film,
  MessageCircle,
  Heart,
  PlusSquare,
  User,
  LogOut,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthUser } from "../hooks/GetAuthUser";
import { useEffect } from "react";
import SearchUsers from "./SearchUsers";

function LeftSidebar({
  setiIsAuthenticated,
  setVisibleUpload,
  searchIsOpen,
  setSearchIsOpen,
}) {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const { authUser } = useAuthUser(token);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    // Clear all auth-related data
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isAuthenticated");
    setiIsAuthenticated(false);

    // Force navigation to login page
    window.location.href = "http://localhost:5173/login";
  };

  if (!authUser) {
    return null;
  }

  return (
    <div className="md:w-64 fixed md:top-0 z-10 md:bg-transparent bg-white bottom-0 left-0 right-0  gap-2 border-r md:p-4 p-0 flex flex-col">
      <Link className="mb-8 hidden md:flex px-2" to="/">
        <img src="ig.svg" className="h-[28px]" alt="" />
      </Link>
      <nav className="flex md:border-0 border-t-[1px] border-gray-400 md:flex-col w-full justify-between flex-row gap-1">
        <NavLink
          to="/"
          className="flex items-center gap-4 rounded-md px-2 py-2 text-gray-700 hover:bg-gray-100"
        >
          <Home className="h-6 w-6" />
          <span className="text-sm hidden md:flex font-medium">Home</span>
        </NavLink>
        <li
          className=" hidden md:flex items-center cursor-pointer gap-4 rounded-md px-2 py-2 text-gray-700 hover:bg-gray-100"
          onClick={() => setSearchIsOpen(true)}
        >
          <Search className="h-6 w-6" />
          <p className="text-sm font-medium">Search</p>
        </li>
        <NavLink
          to="/explore"
          className="flex items-center gap-4 rounded-md px-2 py-2 text-gray-700 hover:bg-gray-100"
        >
          <Compass className="h-6 w-6" />
          <span className="text-sm font-medium hidden md:flex">Explore</span>
        </NavLink>
        <NavLink
          to="/reels"
          className="flex items-center gap-4 rounded-md px-2 py-2 text-gray-700 hover:bg-gray-100"
        >
          <Film className="h-6 w-6" />
          <span className="text-sm font-medium hidden md:flex">Reels</span>
        </NavLink>
        <NavLink
          to="/messages"
          className=" hidden md:flex items-center gap-4 rounded-md px-2 py-2 text-gray-700 hover:bg-gray-100"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="text-sm font-medium">Messages</span>
        </NavLink>
        <NavLink
          to="/notifications"
          className="hidden md:flex items-center gap-4 rounded-md px-2 py-2 text-gray-700 hover:bg-gray-100"
        >
          <Heart className="h-6 w-6" />
          <span className="text-sm font-medium">Notifications</span>
        </NavLink>
        <li
          onClick={() => setVisibleUpload(true)}
          className="flex items-center gap-4 rounded-md px-2 cursor-pointer py-2 text-gray-700 hover:bg-gray-100"
        >
          <PlusSquare className="h-6 w-6" />
          <span className="text-sm hidden md:flex font-medium">Create</span>
        </li>
        <NavLink
          to={`/profile/${authUser._id}`}
          className="flex items-center gap-4 rounded-md px-2 py-2 text-gray-700 hover:bg-gray-100"
        >
          <User className="h-6 w-6" />
          <span className="text-sm hidden md:flex font-medium">Profile</span>
        </NavLink>
        <button
          onClick={handleLogout}
          className="items-center hidden md:flex gap-4 rounded-md px-2 py-2 text-gray-700 hover:bg-gray-100 mt-auto"
        >
          <LogOut className="h-6 w-6" />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </nav>

      <SearchUsers
        searchIsOpen={searchIsOpen}
        setSearchIsOpen={setSearchIsOpen}
      />
    </div>
  );
}

export default LeftSidebar;
