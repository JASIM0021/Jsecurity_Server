import axios from "axios";
import React, { useState } from "react";
import config from "../../../config";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Perform your API call here

    setLoading(true);
    // Simulating an API call delay
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const res = await axios.post(`${config.api_url}/api/auth/login`, {
      email,
      password,
    });
    if (res.status === 200) {
      alert(res?.data?.message);
      localStorage.setItem("user", JSON.stringify(res?.data?.user));
      localStorage.setItem("auth-token", res?.data?.token);
      window.location.replace("/admin/dashboard");
    }
    // Display success message or handle error

    setLoading(false);
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        background:
          "linear-gradient(to right, rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(https://pngimg.com/uploads/hacker/hacker_PNG34.png) no-repeat ",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "2rem",
          borderRadius: "0.5rem",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 className="text-2xl mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border border-gray-300 p-2 rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border border-gray-300 p-2 rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
