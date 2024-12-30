import { useEffect, useState } from "react";
const backendURL = import.meta.env.VITE_BACKEND_URL;

export function useGetUsersPost(userId, token) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      const postsReq = await fetch(`${backendURL}/posts/user/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (postsReq.status === 404) {
        return setPosts([]);
      }

      const fetchedPosts = await postsReq.json();

      setPosts(fetchedPosts);

      setIsLoading(false);
    }

    fetchPosts();
  }, [token, userId]);

  return { posts, isLoading };
}
