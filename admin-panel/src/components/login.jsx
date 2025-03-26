import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://backend-newton-capstone-eval.onrender.com/AdminLogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const result = await response.json();
      if (result.status) {
        localStorage.setItem("authToken", result.token);
        // setTimeout(() => {
        //   setLoading(false);
        navigate("/home");
        // }, 1500);
        toast.success("Login Successfully!", { position: "top-right" });
      } else {
        // toast.error(result.error)
        toast.error("Invalid Credentials");
      }
      setLoading(false);
      //   if (!response.ok) {
      //     throw new Error(result.message || "Login failed");
      //   }
    } catch (error) {
      setLoading(false);
      toast.error("Invalid Credentials");
      console.error("Error:", error);
      alert("Network error");
    }
    // setLoading(false);
  }

  function pass() {
    alert("Kindly contact you admin !");
  }

  const [loading, setLoading] = useState(false);

  return (
    <>
      <form className="flex flex-col items-center justify-center max-w-[100%] h-[40vw]">
        <div className="bg-slate-700 rounded-2xl flex items-center justify-center flex-col">
          {loading ? (
            <div className="flex flex-col px-2 py-1 w-[350px] h-[300px] items-center justify-center">
              <Loader />
            </div>
          ) : (
            <>
              <div className="pt-10 pb-2 px-8">
                <label htmlFor="email" className="flex flex-col px-2 py-1">
                  Enter your email :
                </label>
                <input
                  placeholder="Email"
                  id="email"
                  name="email"
                  type="email"
                  //   required
                  value={formData.email}
                  onChange={handleChange}
                  className="h-[40px] w-[350px] px-3 py-2 rounded-xl"
                  required
                />
              </div>
              <div className="pt-2 pb-2 px-8">
                <label htmlFor="pass" className="flex flex-col px-2 py-1">
                  Enter your password :
                </label>
                <input
                  placeholder="Password"
                  name="password"
                  id="pass"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-[40px] w-[350px] px-3 py-2 rounded-xl"
                  required
                />
                <div className="ml-[220px] mt-2 cursor-pointer" onClick={pass}>
                  Forgot password?
                </div>
              </div>
              <button
                className="pt-2 mx-[150px] px-8 mt-5 mb-10"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </>
          )}
        </div>
        {/* <ToastContainer/> */}
      </form>
    </>
  );
}

export default Login;
