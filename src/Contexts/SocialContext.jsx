/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const SocialContext = createContext();

function SocialProvider({ children }) {
  const [followPopup, setFollowPopup] = useState(false);
  const [followArray, setFollowArray] = useState([]);

  return (
    <SocialContext.Provider
      value={{ followArray, setFollowArray, followPopup, setFollowPopup }}
    >
      {children}
    </SocialContext.Provider>
  );
}

function useSocial() {
  const context = useContext(SocialContext);

  if (context === undefined)
    throw new Error("Social Context was used outside of Social provider");

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { SocialProvider, useSocial };
