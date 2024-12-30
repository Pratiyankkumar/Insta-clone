import { useEffect, useState } from "react";
const backendURL = import.meta.env.VITE_BACKEND_URL;

export function useAuthUser(token) {
  const [authUser, setAuthUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchAuthenticatedUser() {
      setIsLoading(true);
      const authedUserReq = await fetch(`${backendURL}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const authedUser = await authedUserReq.json();

      setAuthUser(authedUser);

      setIsLoading(false);
    }

    fetchAuthenticatedUser();
  }, [token]);

  return { authUser, isLoading };
}
