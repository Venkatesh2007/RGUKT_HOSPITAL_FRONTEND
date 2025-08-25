import { Button } from "@mui/material";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mainUrl from "../utils/mainUrl";

const ForgotPassword = () => {
  const [userId, setUserId] = useState("");
  const [msg, setMsg] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const sendEmailBtn = async () => {
    const url = `${mainUrl}/forgot-password?userId=${userId}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url, options);

      if (response.ok) {
        setShowOtpInput(true);
        const { message } = await response.json();
        setMsg(message);
      } else {
        const { message } = await response.json();
        setMsg(message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const submitOtp = async (event) => {
    event.preventDefault();
    const otp = document.getElementById("otp").value;
    console.log(otp);
    const url = `${mainUrl}/forgot-password/verify`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, otp }),
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const { message } = await response.json();
        toast.success(message);
        toast.warning(
          "change the password after Login in the profile section."
        );
      } else {
        const { message } = await response.json();
        toast.error(message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <main className="h-[100vh] flex justify-center items-center">
      <ToastContainer />
      <form
        className="flex flex-col space-y-4 shadow-md p-6 max-w-[350px]"
        onSubmit={submitOtp}
      >
        <h1 className="font-bold text-xl text-center">Forgot Password</h1>
        <input
          type="text"
          id="userId"
          placeholder="Enter Your userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="h-10 p-3"
        />
        <Button variant="contained" type="button" onClick={sendEmailBtn}>
          Send OTP Email
        </Button>
        {showOtpInput && (
          <>
            <input
              type="number"
              id="otp"
              placeholder="Enter the OTP sent to your registered mobile or email"
              className="h-10 p-3"
            />
            <Button variant="contained" type="submit">
              Submit OTP
            </Button>
          </>
        )}
        <p>{msg}</p>
      </form>
    </main>
  );
};

export default ForgotPassword;
