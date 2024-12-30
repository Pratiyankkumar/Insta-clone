import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useStory } from "@/Contexts/StoryContext";
import { formatTimeDiff } from "@/utils/formatTimeDiff";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { Link } from "react-router-dom";

export default function StoryViewer() {
  // Rest of the JSX remains exactly the same

  const {
    handleNextStory,
    handlePrevStory,
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
    storyUser,
  } = useStory();

  return (
    <div className="flex flex-col items-center gap-4">
      {isVisible && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="h-4/5 max-w-md flex justify-center relative">
            {/* Progress bars container */}
            <div className="absolute top-0 left-0 right-0 flex gap-1 px-0.5 z-50">
              {stories.map((prog, index) => (
                <div key={index} className="h-1 flex-1 bg-gray-600/50">
                  <div
                    className="h-full bg-white transition-all duration-100 ease-linear"
                    style={{
                      width: `${
                        index < currentStory
                          ? 100
                          : index === currentStory
                          ? prog
                          : 0
                      }%`,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Navigation overlay */}
            <div className="absolute inset-0 flex">
              <div
                className="w-1/2 h-full cursor-pointer"
                onClick={handlePrevStory}
              />
              <div
                className="w-1/2 h-full cursor-pointer"
                onClick={handleNextStory}
              />
            </div>

            {/* Header */}
            <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-4 z-10">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8 border-2 border-white">
                  <img src={storyUser.profilePic} alt="User avatar" />
                </Avatar>
                <div className="text-white text-sm">
                  <Link
                    onClick={() => setIsVisible(false)}
                    to={`/profile/${storyUser.userId}`}
                    className="font-semibold"
                  >
                    {storyUser.userName}
                  </Link>
                  <span className="ml-2 opacity-70">
                    {formatTimeDiff(sampleStories[currentStory].createdAt)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevStory}
                  className="text-white"
                >
                  <SkipBack className="w-4 h-4" />
                </Button>
                {pause ? (
                  <Play
                    className="text-white cursor-pointer h-4 w-4"
                    onClick={() => {
                      setPause(false);
                      setStartTime(Date.now() - elapsed);
                    }}
                  />
                ) : (
                  <Pause
                    onClick={() => setPause(true)}
                    className="w-4 h-4 cursor-pointer text-white"
                  />
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNextStory}
                  className="text-white"
                >
                  <SkipForward className="w-4 h-4" />
                </Button>
                <button
                  onClick={() => {
                    setIsVisible(false);
                    setStories(new Array(storyLength).fill(0));
                    setCurrentStory(0);
                    setStartTime(null);
                    setElapsed(0);
                  }}
                  className="text-white z-20"
                  aria-label="Close story"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Story Content */}
            <div className="relative aspect-[9/16] bg-gradient-to-b from-sky-600 to-orange-500 overflow-hidden">
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                <div className="w-full flex flex-col items-center gap-2 max-w-sm">
                  <img
                    src={sampleStories[currentStory].content}
                    alt={`Story ${currentStory + 1}`}
                    className="w-4/5 h-auto"
                  />
                  <h1>{sampleStories[currentStory].text}</h1>
                </div>
              </div>

              {/* Footer */}
              <div className="absolute bottom-4 right-4 flex gap-4">
                <Button variant="ghost" size="icon" className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
