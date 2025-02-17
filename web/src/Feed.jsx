import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "./utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/user/feed`,
        {
          withCredentials: true,
        }
      );

      dispatch(addFeed(res?.data?.data || []));
    } catch (error) {
      console.error("API Fetch Error:", error.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length === 0)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
        <h1 className="text-3xl font-bold text-gray-800 animate-pulse">
          No new users found
        </h1>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-12">
      <div className="animate-fade-in-up">
        <UserCard user={feed[0]} />
      </div>
    </div>
  );
};

export default Feed;
