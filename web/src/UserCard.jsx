import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "./utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const sendRequest = async (status, _id) => {
    try {
      await axios.post(
        `http://localhost:7777/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFeed(_id));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="card bg-white w-80 shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
      <figure className="px-10 pt-10">
        <img
          src={user.photoUrl || "/placeholder.svg"}
          alt="User"
          className="rounded-xl w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl font-bold text-gray-800">
          {user.firstName + " " + user.lastName}
        </h2>
        <p className="text-gray-600 mt-2">{user.bio}</p>
        <div className="card-actions justify-center mt-6 space-x-4">
          <button
            className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
            onClick={() => sendRequest("interested", user._id)}
          >
            Interested
          </button>
          <button
            className="btn bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
            onClick={() => sendRequest("ignored", user._id)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
