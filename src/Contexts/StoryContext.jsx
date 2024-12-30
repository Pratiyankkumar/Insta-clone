/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const StoryContext = createContext();

function StoryProvider({ children }) {
  const [sampleStories, setSampleStory] = useState([]);
  const [storyUser, setStoryUser] = useState({});

  const [currentStory, setCurrentStory] = useState(0);
  const [stories, setStories] = useState(
    new Array(sampleStories.length).fill(0)
  );
  const [pause, setPause] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const duration = 5000;
  const storyLength = sampleStories.length;

  const updateStoryProgress = useCallback(
    (currentTime, initialStartTime) => {
      const newElapsed = currentTime - initialStartTime;
      const newProgress = (newElapsed / duration) * 100;

      if (newProgress >= 100) {
        if (currentStory < storyLength - 1) {
          setCurrentStory((prev) => prev + 1);
          setStartTime(currentTime);
          setElapsed(0);
          setStories((prev) => {
            const newArr = [...prev];
            newArr[currentStory] = 100;
            return newArr;
          });
        } else {
          setIsVisible(false);
          setStories(new Array(storyLength).fill(0));
          setCurrentStory(0);
          setStartTime(null);
          setElapsed(0);
        }
      } else {
        setElapsed(newElapsed);
        setStories((prev) => {
          const newArr = [...prev];
          newArr[currentStory] = newProgress;
          // Fill previous stories to 100%
          for (let i = 0; i < currentStory; i++) {
            newArr[i] = 100;
          }
          // Reset upcoming stories to 0%
          for (let i = currentStory + 1; i < storyLength; i++) {
            newArr[i] = 0;
          }
          return newArr;
        });
      }
    },
    [currentStory, storyLength, duration]
  );

  useEffect(() => {
    let timer;
    if (isVisible && !pause) {
      const initialStartTime = startTime ?? Date.now() - elapsed;
      setStartTime(initialStartTime);

      timer = setInterval(() => {
        updateStoryProgress(Date.now(), initialStartTime);
      }, 10);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isVisible, pause, currentStory, startTime, updateStoryProgress, elapsed]);

  const handlePrevStory = () => {
    if (currentStory > 0) {
      setCurrentStory((prev) => prev - 1);
      setStartTime(Date.now());
      setElapsed(0);
      setStories((prev) => {
        const newArr = [...prev];
        newArr[currentStory] = 0;
        return newArr;
      });
    }
  };

  const handleNextStory = () => {
    if (currentStory < storyLength - 1) {
      setCurrentStory((prev) => prev + 1);
      setStartTime(Date.now());
      setElapsed(0);
      setStories((prev) => {
        const newArr = [...prev];
        newArr[currentStory] = 100;
        return newArr;
      });
    } else {
      setIsVisible(false);
      setStories(new Array(storyLength).fill(0));
      setCurrentStory(0);
      setStartTime(null);
      setElapsed(0);
    }
  };

  const handleStoryOpen = () => {
    setIsVisible(true);
    setStartTime(Date.now());
    setStories(new Array(storyLength).fill(0));
    setCurrentStory(0);
    setElapsed(0);
  };
  return (
    <StoryContext.Provider
      value={{
        handleNextStory,
        handlePrevStory,
        handleStoryOpen,
        stories,
        setPause,
        isVisible,
        currentStory,
        sampleStories,
        setStartTime,
        pause,
        elapsed,
        setIsVisible,
        setStories,
        storyLength,
        setCurrentStory,
        setElapsed,
        setSampleStory,
        storyUser,
        setStoryUser,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
}

function useStory() {
  const context = useContext(StoryContext);

  if (context === undefined)
    throw new Error("Story context was used outside of story Provider");

  return context;
}

export { StoryProvider, useStory };
