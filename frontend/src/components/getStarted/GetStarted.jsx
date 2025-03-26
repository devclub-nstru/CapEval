import React, { useState } from "react";
import "./GetStarted.css";
import axios from "axios";
import { toast } from "react-toastify";

const GetStarted = ({
  switchToLogin,
  switchToOtp,
  formData,
  setFormData,
  onClose,
}) => {
  const mentors = [
    "Vishal Sharma",
    "Ajay Sharma",
    "Aryan Singhal",
    "Jai Gupta",
    "Kartik Katiyar",
    "Narendra Kumar",
    "Neeraj Rawat",
    "Nishchal Gupta",
    "Rahul Kumar",
    "Rashmi Kumari",
    "Rishabh Sharma",
    "Shivam Gupta",
    "Swati Priya",
    "Uttam Kumar Mahatto",
  ];

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader
    try {
      // Send OTP request
      const response = await axios.post(
        "https://backend-newton-capstone-eval.onrender.com/sendMail/otp",
        { to: formData.email }
      );
      if (response.data.success) {
        toast.success("OTP sent to " + formData.email);
        switchToOtp();
      } 
      else {
        toast.error(response.data.message);
      }
    } 
    catch (error) {
      console.error("Error sending OTP:", error);
      alert(
        "Failed to send OTP. Please check your email address and try again."
      );
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p className="modalHeader">Get Started</p>
      <p className="modalSubHeader">
        Already have an account?
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            switchToLogin();
          }}
          className="modalSubHeaderLink"
        >
          Login
        </a>
      </p>
      <form onSubmit={handleSubmit} className="modalFormContainer">
        <label htmlFor="name" className="modalNameLabel">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="modalNameContainer"
          value={formData?.name || ""}
          onChange={handleChange}
          required
        />

        <label htmlFor="email" className="modalEmailLabel">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="modalEmailContainer"
          value={formData?.email || ""}
          onChange={handleChange}
          required
        />

        <label htmlFor="password" className="modalPasswordLabel">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="modalPasswordContainer"
          value={formData?.password || ""}
          onChange={handleChange}
          minLength={6}
          required
        />

        <label htmlFor="mentor" className="modalOptionLabel">
          Mentor
        </label>
        <select
          id="mentorName"
          className="modalOptions"
          value={formData?.mentorName}
          onChange={handleChange}
          required
        >
          {mentors.map((mentor, idx) => (
            <option key={idx} value={mentor} className="modalOption">
              {mentor}
            </option>
          ))}
        </select>

        <button type="submit" className="modalSubmitButton" disabled={loading}>
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </>
  );
};

export default GetStarted;
