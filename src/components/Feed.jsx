const backendURL = import.meta.env.VITE_BACKEND_URL;
import Post from "./Post";
import Stories from "./Stories";
import RightSidebar from "./RightSidebar";
import { ModernLoader } from "./ModernLoader";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useComment } from "@/Contexts/CommentContext";

const token = localStorage.getItem("accessToken");
const socket = io(backendURL);

function Feed() {
  const { setDoComment, derivedPost, setDerivedPost } = useComment();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Start with true
  const [error, setError] = useState(null);
  const [triggerFetch, setTriggerFetch] = useState(0);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        setError(null); // Reset error state before fetching

        const fetchPostReq = await fetch(`${backendURL}/posts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!fetchPostReq.ok) {
          throw new Error(`HTTP error! status: ${fetchPostReq.status}`);
        }

        const postsData = await fetchPostReq.json();
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();

    const handleNewUpload = (newPost) => {
      console.log("New post received:", newPost);
      setPosts((prevPosts) => {
        const postExists = prevPosts.some((post) => post._id === newPost._id);
        if (postExists) {
          return prevPosts;
        }
        return [newPost, ...prevPosts];
      });
      setTriggerFetch((num) => num + 1);
    };

    socket.on("new-upload", handleNewUpload);

    return () => {
      socket.off("new-upload", handleNewUpload);
    };
  }, [triggerFetch]);

  // Show loader while initial loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ModernLoader size={80} color="#10b981" />
      </div>
    );
  }

  // Show error if there is one
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  // Show no posts message if posts array is empty
  if (posts.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        No posts found
      </div>
    );
  }

  // Show posts if we have them
  return (
    <div className="flex flex-row relative mb-10 justify-evenly">
      <div>
        <Stories />
        {posts.map((post, i) => (
          <Post
            key={i} // Using post._id instead of index
            caption={post.caption}
            createdAt={post.createdAt}
            likes={post.likes}
            userId={post.userId}
            post={post.post}
            postId={post._id}
            comments={post.comments}
            setDoComment={setDoComment}
            derivedPost={derivedPost}
            setDerivedPost={setDerivedPost}
          />
        ))}
      </div>
      <RightSidebar />
    </div>
  );
}

export default Feed;
