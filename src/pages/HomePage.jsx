import { Outlet } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import CommentSection from "../components/CommentSection";
import UploadUI from "../components/Upload";
import SeeFollows from "../components/SeeFollows";
import { useAuth } from "../Contexts/AuthContext";
import { useUi } from "../Contexts/UiContext";
import { useSocial } from "@/Contexts/SocialContext";
import { useComment } from "@/Contexts/CommentContext";
import StoryViewer from "@/components/Story";
import TopSidebar from "@/components/TopSidebar";
import Alert from "@/components/Alert";

function HomePage() {
  const { doComment, setDoComment, derivedPost } = useComment();
  const { isAuthenticated, setiIsAuthenticated } = useAuth();
  const {
    extend,
    setExtend,
    visibleUpload,
    setVisibleUpload,
    searchIsOpen,
    setSearchIsOpen,
    popupMessage,
    setPopupMessage,
    visible,
    setIsVisible,
    handleHide,
  } = useUi();
  const { followPopup, setFollowPopup, followArray } = useSocial();

  if (!isAuthenticated) return <p>Please first authenticate</p>;

  return (
    <div className="flex md:flex-row min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <SeeFollows
        followArray={followArray}
        setFollowPopup={setFollowPopup}
        followPopup={followPopup}
      />

      <Alert isVisible={visible} onHide={handleHide} text={popupMessage} />

      <StoryViewer />

      {/* Left Sidebar */}
      <LeftSidebar
        setVisibleUpload={setVisibleUpload}
        setiIsAuthenticated={setiIsAuthenticated}
        setSearchIsOpen={setSearchIsOpen}
        searchIsOpen={searchIsOpen}
      />

      <TopSidebar
        setSearchIsOpen={setSearchIsOpen}
        searchIsOpen={searchIsOpen}
      />

      {/* Main Content */}
      <main className="flex-1 md:mt-0 mt-[50px] w-full items-center justify-center md:ml-64 ml-0 border-r">
        <Outlet />
        {extend && (
          <CommentSection
            derivedPost={derivedPost}
            setDoComment={setDoComment}
            setExtend={setExtend}
          />
        )}
        {doComment && (
          <CommentSection
            derivedPost={derivedPost}
            setDoComment={setDoComment}
            setExtend={setExtend}
          />
        )}
        {visibleUpload && (
          <UploadUI
            setPopupMessage={setPopupMessage}
            setIsVisible={setIsVisible}
            setVisibleUpload={setVisibleUpload}
          />
        )}
      </main>
    </div>
  );
}

export default HomePage;
