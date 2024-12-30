/* eslint-disable react/prop-types */
import { Heart, MessageCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";

function TopSidebar({ setSearchIsOpen, searchIsOpen }) {
  return (
    <div
      className={`w-full ${
        searchIsOpen ? "hidden" : "flex"
      } flex-row justify-between  backdrop-blur-md items-center md:hidden h-[50px] fixed top-0 right-0 left-0 z-20`}
    >
      <Link to="/">
        <img src="/ig.svg" className="h-[28px] ml-4" alt="" />
      </Link>

      <div className="flex flex-row gap-[20px] mr-4 items-center">
        <Search onClick={() => setSearchIsOpen(true)} className="w-6 h-6" />
        <Link to="/messages">
          <MessageCircle className="w-6 h-6" />
        </Link>
        <Link to={"/notifications"}>
          <Heart className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}

export default TopSidebar;
