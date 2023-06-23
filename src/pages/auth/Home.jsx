import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const swipeRef = useRef(null);
  const token = localStorage.getItem("auth-token");
  if (token) {
    window.location.replace("/admin/dashboard");
  }
  useEffect(() => {
    const swipeInterval = setInterval(() => {
      swipeRef.current.scrollLeft += swipeRef.current.offsetWidth;
    }, 2000);

    return () => {
      clearInterval(swipeInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Android Control Center</h1>
      <div
        className="flex overflow-hidden"
        style={{ width: "80%", height: "300px" }}
        ref={swipeRef}
      >
        <div className="flex">
          <div className="w-full flex-shrink-0 p-4 bg-blue-500 text-white rounded-lg flex items-center justify-center">
            <span className="text-xl">Camera</span>
          </div>
          <div className="w-full flex-shrink-0 p-4 bg-green-500 text-white rounded-lg flex items-center justify-center">
            <span className="text-xl">Music</span>
          </div>
          <div className="w-full flex-shrink-0 p-4 bg-yellow-500 text-white rounded-lg flex items-center justify-center">
            <span className="text-xl">Maps</span>
          </div>
          <div className="w-full flex-shrink-0 p-4 bg-red-500 text-white rounded-lg flex items-center justify-center">
            <span className="text-xl">Settings</span>
          </div>
        </div>
      </div>
      <p className="mt-8 text-center text-gray-500">
        Control your Android from anywhere in the world. Get location and much
        more.
        <Link
          to="/login"
          className="ml-2 text-blue-500 hover:text-blue-600 transition-colors duration-300"
        >
          Click here to Login
        </Link>
      </p>
    </div>
  );
};

export default Home;
