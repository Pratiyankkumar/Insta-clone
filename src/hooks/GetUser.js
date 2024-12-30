import { useEffect, useState } from "react";
const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function useGetUser(userId, token) {
  const [postUser, setPostUser] = useState({});

  useEffect(() => {
    async function getPostUser() {
      const userReq = await fetch(`${backendURL}/user/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const user = await userReq.json();

      setPostUser(user);
    }

    getPostUser();
  }, [userId, token]);

  return postUser;
}
