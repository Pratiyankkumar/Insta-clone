/* eslint-disable react/prop-types */
import { createContext, useContext, useMemo, useState } from "react";

const CommentContext = createContext();

function CommentProvider({ children }) {
  const [doComment, setDoComment] = useState(false);

  const [derivedPost, setDerivedPost] = useState({});

  const value = useMemo(() => {
    return {
      doComment,
      setDoComment,
      derivedPost,
      setDerivedPost,
    };
  }, [derivedPost, doComment]);

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
}

function useComment() {
  const context = useContext(CommentContext);
  if (context === undefined)
    throw new Error("Comment context is used Outside of Comment Provider");

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CommentProvider, useComment };
