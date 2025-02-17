"use client";

import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "./utils/RequestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, requestId) => {
    try {
      console.log(
        `Reviewing request: Status - ${status}, Request ID - ${requestId}`
      );

      await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.log("Error in reviewing request:", err.message);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/user/requests/received`,
        { withCredentials: true }
      );
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log("Error fetching requests:", err.message);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
        <h1 className="text-3xl font-bold text-gray-800 animate-pulse">
          No requests found
        </h1>
      </div>
    );

  return (
    <div className="bg-gradient-to-br from-purple-100 to-indigo-200 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Friend Requests
        </h1>
        <div className="space-y-8">
          {requests.map((request) => {
            const { _id, sender } = request;
            return (
              <div
                key={_id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <img
                      className="h-48 w-full object-cover md:w-48"
                      src={sender.photoUrl || "/placeholder.svg"}
                      alt={`${sender.firstName} ${sender.lastName}`}
                    />
                  </div>
                  <div className="p-8 w-full">
                    <div className="uppercase tracking-wide text-sm text-purple-600 font-semibold">
                      {sender.age && sender.gender
                        ? `${sender.age}, ${sender.gender}`
                        : ""}
                    </div>
                    <h2 className="mt-2 text-xl font-semibold text-gray-800">
                      {sender.firstName} {sender.lastName}
                    </h2>
                    <p className="mt-3 text-gray-600">{sender.bio}</p>
                    <div className="mt-6 flex justify-end space-x-4">
                      <button
                        className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                        onClick={() => reviewRequest("rejected", _id)}
                      >
                        Reject
                      </button>
                      <button
                        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
                        onClick={() => reviewRequest("accepted", _id)}
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
