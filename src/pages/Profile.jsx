/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useAuthUser } from "../hooks/GetAuthUser";
import { ModernLoader } from "../components/ModernLoader";
import { useContext, useState } from "react";
import AuthedUserProfilePage from "../components/AuthedUserProfile";
import SimpleUserProfile from "../components/SimpleUserProfile";
import { useUi } from "../Contexts/UiContext";
import { useSocial } from "@/Contexts/SocialContext";
import { useComment } from "@/Contexts/CommentContext";

const token = localStorage.getItem("accessToken");

function Profile() {
  const { derivedPost, setDerivedPost } = useComment();

  const { followPopup, setFollowPopup, followArray, setFollowArray } =
    useSocial();

  const { setExtend } = useUi();

  const [selectButton, setSelectButton] = useState("posts");

  const { id } = useParams();
  console.log(id);

  const { authUser, isLoading } = useAuthUser(token);

  if (isLoading) {
    return <ModernLoader />;
  }

  if (authUser._id === id) {
    return (
      <AuthedUserProfilePage
        selectButton={selectButton}
        setSelectButton={setSelectButton}
        authUser={authUser}
        derivedPost={derivedPost}
        setDerivedPost={setDerivedPost}
        setExtend={setExtend}
        followPopup={followPopup}
        setFollowPopup={setFollowPopup}
        followArray={followArray}
        setFollowArray={setFollowArray}
      />
    );
  }

  return (
    <SimpleUserProfile
      derivedPost={derivedPost}
      setDerivedPost={setDerivedPost}
      setExtend={setExtend}
      followPopup={followPopup}
      setFollowPopup={setFollowPopup}
      followArray={followArray}
      setFollowArray={setFollowArray}
    />
  );
}

export default Profile;