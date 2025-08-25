import React, { useState } from "react";
import { Button } from "@mui/material";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mainUrl from "../utils/mainUrl";

function LoginForm() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const submitBtn = async (event) => {
    event.preventDefault();
    const userDetails = {
      userId,
      password,
    };
    const url = `${mainUrl}/login`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      const { jwtToken, message } = data;
      toast.success(message);
      Cookie.set("jwtToken", jwtToken, { expires: 1 });
      if (userId.startsWith("D")) navigate("/doctor");
      else if (userId.startsWith("P")) navigate("/pharmacist");
      else if (userId.startsWith("A")) navigate("/admin");
      else if (userId.startsWith("N")) navigate("/nurse");
    } else {
      const { message } = await response.json();
      toast.error(message);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center  min-h-screen py-6 px-4 ">
        <ToastContainer />
        <h1 className="text-xl font-bold text-gray-800 mt-5">Log In</h1>
        <form
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderBottom: "1px solid #2C6B2F",
            width: "100%",
            maxWidth: "32rem",
          }}
          onSubmit={submitBtn}
        >
          <label className="block text-gray-700 mb-3" htmlFor="username">
            User ID:
          </label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Enter your User ID"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
            className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="block text-gray-700 mb-3" htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <input
                id="showPassword"
                className="mr-2 leading-tight"
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword" className="mr-3 text-gray-700">
                Show password
              </label>
            </div>
            <a
              className="text-blue-500 hover:text-blue-700 text-xm underline"
              href="/forgot-password"
            >
              Forgot password?
            </a>
          </div>
          <Button
            variant="contained"
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg"
          >
            Login
          </Button>

          {/* Security Tip */}
          <div className="mt-8">
            <div className="bg-green-100 text-green-800 border border-green-300 rounded-lg p-4 text-center">
              <p className="text-sm font-medium">
                <strong>Security Reminder:</strong> For enhanced security,
                please change your password immediately after logging in for the
                first time.
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
