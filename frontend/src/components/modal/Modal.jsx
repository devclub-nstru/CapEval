import React, { useState } from "react";
import "./modal.css";
import GetStarted from "../getStarted/GetStarted";
import Login from "../login/Login";
import FeelingStuck from "../feelingStuck/FeelingStuck";
import SubmitProject from "../submitProject/SubmitProject";
import OtpVerification from "../otpVerification/OtpVerification";

const Modal = ({
  content,
  onClose,
  setContent,
  setIsLoggedIn,
  setUserInfo,
  updateLoginState,
  fetchUserInfo,
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

  const [formdata, setformdata] = useState({ mentorName: mentors[0] });
  const renderContent = () => {
    switch (content) {
      case "register":
        return (
          <GetStarted
            switchToOtp={() => setContent("switchOTP")}
            setFormData={setformdata}
            formData={formdata}
            switchToLogin={() => setContent("login")}
            onClose={onClose}
          />
        );

      case "login":
        return (
          <Login
            switchToRegister={() => setContent("register")}
            onClose={onClose}
            updateLoginState={updateLoginState}
          />
        );
      case "submitProject":
        return (
          <SubmitProject fetchUserInfo={fetchUserInfo} onClose={onClose} />
        );
      case "askQuery":
        return <FeelingStuck onClose={onClose} />;
      case "switchOTP":
        return (
          <OtpVerification
            onClose={onClose}
            formData={formdata}
            updateLoginState={updateLoginState}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="modalContainer">
      <div
        className="modalOverlay"
        onClick={() => {
          onClose();
        }}
      ></div>
      <div className="modal">
        <div className="firstCardModal">
          <img
            src={"/Capstone_logo.svg"}
            style={{ width: "3rem" }}
            alt="Logo"
          />
          <button onClick={onClose} className="closeButton">
            &times;
          </button>
        </div>
        <div className="modalContentContainer">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Modal;
