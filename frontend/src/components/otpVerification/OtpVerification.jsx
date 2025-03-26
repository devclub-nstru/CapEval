import React, { useState } from "react";
import "./otpVerification.css";
import axios from "axios";
import { toast } from "react-toastify";

const OtpVerification = ({
  formData,
  setFormData,
  onClose,
  updateLoginState,
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [verifyingOTP, setverifyingOTP] = useState(false);
  function getFirstName(fullName) {
    const nameParts = fullName.split(" "); // Split the name by spaces
    return nameParts[0]; // Return the first part (first name)
  }

  const handleChange = (e, idx) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[idx] = value;
      setOtp(newOtp);

      if (value && idx < 3) {
        const nextInput = document.getElementById(`otp-${idx + 1}`);
        if (nextInput) nextInput.focus();
      } else if (!value && idx > 0) {
        const prevInput = document.getElementById(`otp-${idx - 1}`);
        if (prevInput) prevInput.focus();
      }
    }

    setError("");
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    if (/^\d{1,4}$/.test(pastedData)) {
      const newOtp = Array.from(pastedData).concat(
        Array(4 - pastedData.length).fill("")
      );
      setOtp(newOtp);
      const lastFilledIndex = pastedData.length - 1;
      if (lastFilledIndex >= 0) {
        const nextInput = document.getElementById(`otp-${lastFilledIndex}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== 4) {
      setError("Please enter a 4-digit OTP.");
      return;
    }

    try {
      setverifyingOTP(true);
      const response = await axios.post(
        "https://backend-newton-capstone-eval.onrender.com/User/register-otp",
        { otp: Number(otpString), ...formData }
      );
      if (response.data.status) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const response = await axios.get(
              "https://backend-newton-capstone-eval.onrender.com/User/me",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const userName = getFirstName(response.data.user.name);
            updateLoginState(userName);
          } catch (error) {
            console.error("Error fetching user info", error);
          }
        }
        onClose();
      } else {
        toast.error(response.data.response);
      }
      setverifyingOTP(false);
    } catch (error) {
      setverifyingOTP(false);
      console.error("Error verifying OTP:", error);
      setError(error.response.data.message);
    }
  };

  const resendOtp = async () => {
    try {
      const response = await axios.post(
        "https://backend-newton-capstone-eval.onrender.com/sendMail/otp",
        { to: formData.email }
      );
      if (response.data.status) {
        toast.success("OTP resent to your email.");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      console.log(error.response);
    }
  };

  return (
    <>
      <p className="modalHeader">Verify Email</p>
      <p className="modalSubHeader">
        OTP has been sent to{" "}
        <a href="#" className="modalSubHeaderLink">
          {formData?.email}
        </a>{" "}
        Please enter the OTP to proceed.
      </p>
      <form onSubmit={handleSubmit} className="modalFormContainer">
        <div className="otpInputContainer" onPaste={handlePaste}>
          {Array.from({ length: 4 }).map((_, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="text"
              maxLength={1}
              className="otpCode"
              value={otp[idx]}
              onChange={(e) => handleChange(e, idx)}
            />
          ))}
        </div>
        {error && <p className="errorText">{error}</p>}
        <input
          disabled={verifyingOTP}
          type="submit"
          value={!verifyingOTP ? "Verify Email" : "Verifying..."}
          className="modalSubmitButton"
        />
      </form>
      <p className="modalSubHeader">
        Didn't receive OTP?{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            resendOtp();
          }}
          className="modalSubHeaderLink"
        >
          Click here to resend
        </a>
      </p>
    </>
  );
};

export default OtpVerification;
