const backendURL = import.meta.env.VITE_BACKEND_URL;
import { useStory } from "@/Contexts/StoryContext";
import { useEffect, useState } from "react";

const token = localStorage.getItem("accessToken");

function Stories() {
  const [stories, setStories] = useState([]);

  const { handleStoryOpen, setSampleStory, setStoryUser } = useStory();

  useEffect(() => {
    async function fetchStories() {
      const storyReq = await fetch(`${backendURL}/users/story`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const story = await storyReq.json();
      console.log(story);

      setStories(story.users);
    }

    fetchStories();
  }, []);

  if (!stories || stories.length === 0) {
    return <p>No Stories</p>;
  }

  return (
    <div className="border-b px-4 py-4 overflow-x-auto">
      <div className="flex gap-4">
        {stories.map((story, index) => {
          return (
            <div
              onClick={() => {
                setStoryUser({
                  name: story.name,
                  profilePic: story.profilePic,
                  userName: story.userName,
                  userId: story.userId,
                });
                setSampleStory(story.stories);
                handleStoryOpen();
              }}
              key={index}
              className="flex flex-col items-center gap-1"
            >
              <div className="h-16 w-16 rounded-full overflow-hidden ring-2 ring-pink-500 ring-offset-2">
                <img
                  src={story.profilePic}
                  alt={`User ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-xs">{story.userName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Stories;
