import Nav from "./components/nav/nav";
import "./App.css";
import StudentTable from "./components/landing/student_table";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Evaluation from "./components/evalutation/evaluation";
import Queries from "./components/queries";
import Login from "./components/login";

function App() {
  const [selectedMentor, setselectedMentor] = useState("");
  const [curcompName, setcurcompName] = useState("student_table")


  useEffect(()=>{

    if (localStorage.getItem("Mentor")) {
      setselectedMentor(localStorage.getItem("Mentor"))
    }
    else {
      setselectedMentor("Vishal Sharma")
    }
  },[])

  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/"
                  element = {<Login/>}
          />
          <Route
            path="/home"
            element={
              <>
                <Nav
                  selectedMentor={selectedMentor}
                  
                  setcurrComp={setcurcompName}
                  setselectedMentor={setselectedMentor}
                
                />
                {curcompName == "student_table" ? 
                <StudentTable selectedMentor={selectedMentor}  /> : <Queries selectedMentor={selectedMentor} />}
              </>
            }
          />
          <Route path="/evaluate" element={<Evaluation />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
