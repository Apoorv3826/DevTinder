"use client";

import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "./utils/ConnectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const fetchConnections = async () => {
    try {
      const res = await axios.get("http://localhost:7777/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, [dispatch]); // Added dispatch to dependencies

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
        <h1 className="text-3xl font-bold text-gray-800 animate-pulse">
          No connections found
        </h1>
      </div>
    );

  return (
    <div className="bg-gradient-to-br from-purple-100 to-indigo-200 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Your Connections
        </h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, bio } =
              connection;
            return (
              <div
                key={_id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                <img
                  className="h-48 w-full object-cover"
                  src={photoUrl || "/placeholder.svg"}
                  alt={`${firstName} ${lastName}`}
                />
                <div className="p-6">
                  <div className="uppercase tracking-wide text-sm text-purple-600 font-semibold">
                    {age && gender ? `${age}, ${gender}` : ""}
                  </div>
                  <h2 className="mt-2 text-xl font-semibold text-gray-800">
                    {firstName} {lastName}
                  </h2>
                  <p className="mt-3 text-gray-600 line-clamp-3">{bio}</p>
                  <button className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-300">
                    View Profile
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;
