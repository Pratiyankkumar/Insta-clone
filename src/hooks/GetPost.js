import { useCallback, useEffect, useState } from "react";
const backendURL = import.meta.env.VITE_BACKEND_URL;

export function useGetPost(postId, token, derivedPost) {
  const [post, setPost] = useState(derivedPost);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPost = useCallback(async () => {
    try {
      setIsLoading(true);
      const postReq = await fetch(`${backendURL}/post/byId/${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const fetchedPost = await postReq.json();
      setPost(fetchedPost);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setIsLoading(false);
    }
  }, [postId, token]);

  useEffect(() => {
    fetchPost();
  }, [postId, fetchPost]);

  return { post, isLoading, fetchPost };
}
