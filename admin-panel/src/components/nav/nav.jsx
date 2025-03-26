/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import "./nav.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { ToastContainer,toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function Nav({ setselectedMentor, selectedMentor, setcurrComp }) {
  const navigate = useNavigate();
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

  function delToken() {
    toast.success("Logged out successfully!");
    localStorage.removeItem("authToken");
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }

  const [activeTab, setActiveTab] = useState("home");

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <nav>
        <div className="flex items-center justify-center gap-[5rem]">
          <div className="logo flex gap-[1rem] justify-center items-center">
            <img src="/Capstone_logo.svg" style={{ width: "3rem" }} alt="" />
            <h3>Capstone</h3>
          </div>
          <div className="menu">
            <button
              onClick={() => {
                setcurrComp("student_table");
                handleClick("home");
              }}
              className={activeTab === "home" ? "active" : ""}
            >
              Home
            </button>
            <button
              onClick={() => {
                setcurrComp("Query");
                handleClick("query");
              }}
              className={activeTab === "query" ? "active" : ""}
            >
              Queries
            </button>
          </div>
        </div>
        <div>
          <form
            className="mentors_list flex gap-[0.8rem] items-center"
            onSubmit={(form) => {
              form.preventDefault();
            }}
          >
            <div className="relative">
              <select
                id="mentors"
                className="mr-5 bg-slate-800 text-white outline-1 shadow-inner shadow-slate-900 outline-double  outline-[rgba(15,23,42,0.7)] border-none"
                value={selectedMentor}
                onChange={async (e) => {
                  setselectedMentor(e.target.value);
                  localStorage.setItem("Mentor", e.target.value);
                }}
              >
                {mentors.map((name, index) => (
                  <option key={index} value={name.toLowerCase()}>
                    {name}
                  </option>
                ))}
              </select>
              <div className="absolute right-[1rem] top-1/2 translate-y-[-60%]">
                <img
                  src="/play.svg"
                  className="w-[0.8rem] invert rotate-90"
                  alt=""
                />
              </div>
            </div>
            <button onClick={delToken} className="mr-10">
              Logout
            </button>
          </form>
        </div>
      </nav>
    </>
  );
}

export default Nav;
