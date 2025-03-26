import React, { useState, useEffect, use } from "react";
import "./homePage.css";
import Frame from "../../images/Frame.svg";
import Group from "../../images/Group.svg";
import github from "../../images/github.svg";
import Modal from "../../components/modal/Modal";
import axios, { all } from "axios";
import { useConfirm } from "material-ui-confirm";

const HomePage = () => {
  const confirm = useConfirm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [countdown, setCountdown] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [queries, setQueryCount] = useState(0);
  const [projects, setProjectCount] = useState(0);
  const [performers, setPerformerCount] = useState(0);
  const [querySolved, setQuerySolvedCount] = useState(0);
  const [allUserInfo, setallUserInfo] = useState({});
  const updateLoginState = (userName) => {
    setUserInfo(userName);
    setIsLoggedIn(true);
  };

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("onclose called");
    setIsModalOpen(false);
    setModalContent("");
  };

  function getFirstName(fullName) {
    const nameParts = fullName.split(" "); // Split the name by spaces
    console.log(nameParts);
    return nameParts[0]; // Return the first part (first name)
  }

  const fetchUserInfo = async () => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
      try {
        const response = await axios.get(
          "https://backend-newton-capstone-eval.onrender.com/User/me",
          // "https://backend-newton-capstone-eval.onrender.com/User/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setallUserInfo(response.data.user);
        setUserInfo(getFirstName(response.data.user.name)); // Set user info from the API
        setIsLoggedIn(true); // User is logged in
      } catch (error) {
        console.error("Error fetching user info", error);
        setIsLoggedIn(false);
      }
    }
    setIsLoading(false); // Set loading to false after API call
  };

  const handleLogout = () => {
    confirm({
      description: `Are you sure, You want to logout.`,
      confirmationText: "Logout",
    })
      .then(() => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUserInfo(null);
      })
      .catch(() => {});
    // Clear localStorage and reset state
  };

  useEffect(() => {
    fetchUserInfo(); // Check if the user is logged in when the page loads
  }, []);

  useEffect(() => {
    try {
      (async () => {
        const queryCount = await axios.get(
          "https://backend-newton-capstone-eval.onrender.com/Counts/queries"
        );
        const projectsCount = await axios.get(
          "https://backend-newton-capstone-eval.onrender.com/Counts/SubmisstionCount"
        );
        const performersCount = await axios.get(
          "https://backend-newton-capstone-eval.onrender.com/Counts/TopPerformers"
        );
        const querySolvedCount = await axios.get(
          "https://backend-newton-capstone-eval.onrender.com/Counts/queriesSolved"
        );
        setQueryCount(queryCount.data.count);
        setProjectCount(projectsCount.data.count);
        setPerformerCount(performersCount.data.topPerformers);
        setQuerySolvedCount(querySolvedCount.data.count);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    const targetDate = new Date("2024-12-20T23:00:00"); // Target date and time (13th Dec 2024, 6:00 PM)

    const updateCountdown = () => {
      const now = new Date();
      const timeLeft = targetDate - now;

      if (timeLeft <= 0) {
        setCountdown("Expired"); // If the countdown reaches 0
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      const formattedHours = hours.toString().padStart(2, "0");
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const formattedSeconds = seconds.toString().padStart(2, "0");

      setCountdown(
        `${days} : ${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`
      );
    };

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Modal Component */}
      {isModalOpen && (
        <Modal
          content={modalContent}
          onClose={closeModal}
          setContent={setModalContent}
          setIsLoggedIn={setIsLoggedIn}
          setUserInfo={setUserInfo}
          updateLoginState={updateLoginState}
          fetchUserInfo={fetchUserInfo}
        />
      )}

      <div className="homeMainContainer">
        <div className="circle"></div>
        <div className="homePageContentContainer">
          {isLoading ? (
            <div className="loader">Loading...</div>
          ) : (
            <div className="cardContainer">
              <div className="topRow">
                <div className="firstCard">
                  <img
                    src={"/Capstone_logo.svg"}
                    style={{ width: "3rem" }}
                    alt=""
                  />
                  {!isLoggedIn ? (
                    <>
                      <p onClick={() => openModal("register")}>Register</p>
                      <p onClick={() => openModal("login")}>Login</p>
                    </>
                  ) : (
                    <>
                      <p>Hello, {userInfo}</p>
                      <p className="logout" onClick={handleLogout}>
                        Logout
                      </p>
                    </>
                  )}
                  <p
                    onClick={() => isLoggedIn && openModal("submitProject")}
                    className={
                      !isLoggedIn
                        ? "disabled"
                        : allUserInfo.Projects && allUserInfo.Projects[0]
                        ? "disabled"
                        : ""
                    }
                  >
                    Submit Project
                  </p>
                  <p
                    onClick={() => isLoggedIn && openModal("askQuery")}
                    className={!isLoggedIn ? "disabled" : ""}
                  >
                    Ask Queries
                  </p>
                </div>
                <div className="secondCard">
                  <div className="secondCardContainer">
                    <div className="logo-name">
                      <img
                        src={"/Capstone_logo.svg"}
                        style={{ width: "2rem" }}
                        alt=""
                      />
                      <p>Capstone</p>
                    </div>
                    <p>Submit within</p>
                    <h2 className="countdown">{countdown}</h2>{" "}
                    {/* Countdown Timer */}
                  </div>
                </div>
                <div className="thirdCardContainer">
                  <div className="thirdCardContainerTopCard">
                    <h1>{querySolved}</h1>
                    <p>Queries Resolved</p>
                  </div>
                  <div className="thirdCardContainerBottomCard">
                    <h1>{projects}</h1>
                    <p>Submitted Projects</p>
                  </div>
                </div>
              </div>
              <div className="bottomRow">
                <div className="thirdCardContainer">
                  <div className="thirdCardContainerBottomCard">
                    <h1>14</h1>
                    <p>Mentors</p>
                  </div>
                  <div className="thirdCardContainerTopCard">
                    <h1>{queries}</h1>
                    <p>Queries Raised</p>
                  </div>
                </div>
                <div className="firstCard">
                  <div className="img">
                    <img src={github} alt="" />
                  </div>
                  <div className="text">
                    <p>Push the code</p>
                    <span>Explore the branch of web-dev</span>
                  </div>
                </div>
                <div className="secondCard">
                  <div className="upper" style={{ height: "5rem" }}>
                    <img src={Group} alt="" />
                    <div className="text">
                      <p>Top Projects</p>
                      <span>NST Capstone Showcase</span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {performers
                      ? performers?.map((el, index) => (
                          <div
                            className="TopProjectItem"
                            style={{
                              position: "relative", // Position relative for pseudo-element
                              marginLeft: "1.5rem",
                              width: "10rem",
                              borderRadius: "5px", // Increased border radius for rounded effect
                              color: "white",
                              padding: "1rem",
                              display: "flex",
                              gap: "1rem",
                              alignItems: "center",
                              justifyContent: "space-between",
                              background: "rgba(0,0,0,0.3)",
                              overflow: "hidden", // Ensure content doesn't spill out
                            }}
                            onClick={() => {
                              window.open(el.githubRepo);
                            }}
                          >
                            {/* Pseudo-element for border effect */}
                            <div
                              style={{
                                height: "1.2rem",
                                width: "1.2rem",
                                position: "absolute",
                                top: "0px",
                                left: "0px",
                                fontSize: "13px",
                                color: "black",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderBottomRightRadius: "5px",
                                background:
                                  index === 0
                                    ? "linear-gradient(135deg, #FFD700, #FFEA00)" // Gold gradient for 1st
                                    : index === 1
                                    ? "linear-gradient(135deg, #C0C0C0, #D3D3D3)" // Silver gradient for 2nd
                                    : index === 2
                                    ? "linear-gradient(135deg, #cd7f32, #D2B48C)" // Bronze gradient for 3rd
                                    : "none", // No border for others
                                fontWeight: "bold",
                              }}
                            >
                              <p>{index + 1}</p>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                borderRadius: "20px", // Match the border radius
                                // zIndex: -1, // Place behind the content

                                // border: "2px solid transparent", // Transparent border
                                borderImage:
                                  index === 0
                                    ? "linear-gradient(135deg, #FFD700, #FFEA00) 1" // Gold gradient for 1st
                                    : index === 1
                                    ? "linear-gradient(135deg, #C0C0C0, #D3D3D3) 1" // Silver gradient for 2nd
                                    : index === 2
                                    ? "linear-gradient(135deg, #cd7f32, #D2B48C) 1" // Bronze gradient for 3rd
                                    : "none", // No border for others
                              }}
                            />
                            <p style={{ fontSize: "0.8rem" }}>
                              {el.name[0].toUpperCase() + el.name.substr(1)}
                            </p>
                            <img
                              style={{
                                opacity: 0.8,
                                height: "2rem",
                                filter: "invert",
                              }}
                              src="/github.png"
                              alt=""
                            />
                          </div>
                        ))
                      : ""}
                  </div>
                  <div className="lower">
                    <img src={Frame} alt="" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
