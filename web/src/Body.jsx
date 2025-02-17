import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const fetchUser = async () => {
    if (user) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/profile/view`,
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user) fetchUser();
  }, [user]);
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
