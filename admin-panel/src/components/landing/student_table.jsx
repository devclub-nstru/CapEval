/* eslint-disable react/prop-types */
import link from "../../assets/link.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../loader";
import { toast } from "react-toastify";
// import { ToastContainer,toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function StudentTable({ selectedMentor }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");
  if (!token) {
    navigate("/");
  }

  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://backend-newton-capstone-eval.onrender.com/studentlist?mentor=" +
            selectedMentor,
          {
            headers: {
              "ngrok-skip-browser-warning": true,
            },
          }
        );

        if (response.data && response.data.data) {
          setTableData(response.data.data);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.data);

          setError(`Error ${error.response.status}: ${error.response.data}`);
        } else {
          setError("Failed to fetch data.");
        }
        setTableData([]);
      } finally {
        setLoading(false);
      }
    };
    if (selectedMentor) {
      fetchData();
    }
  }, [selectedMentor]);

  const [showTooltipId, setShowTooltipId] = useState(null);

  async function sendMail(mail) {
    try {
      const response = await fetch(
        "https://backend-newton-capstone-eval.onrender.com/sendMail/sendReport",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ to: mail }),
        }
      );
      var body = await response.json();
      if (body.status) {
        toast.success("Report send successfully!", { position: "top-right" });
      } else {
        toast.error(body.msg);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast("An error occurred while sending the message.");
    }
  }

  return (
    <>
      {!loading ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-[2rem] mx-[2rem]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-[15px]">
                <th scope="col" className="px-6 py-3">
                  Student name
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Github
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Hosted Link
                </th>
                <th scope="col" className="px-6 py-3">
                  Query
                </th>
                <th scope="col" className="px-6 py-3">
                  Video
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Report
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Evaluate
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Send Email
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(tableData) &&
                tableData.map((item) => (
                  <tr
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.name}
                    </th>
                    <td className="px-2 py-2">{item.email}</td>
                    <td className="px-2 py-2">
                      <div className="flex items-center justify-center">
                        <a
                          href={item.githubRepo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={link} alt="Github link" className="h-5" />
                        </a>
                      </div>
                    </td>

                    <td className="px-2 py-2">
                      <div className="flex items-center justify-center">
                        <a href={item.hostedLink} target="blank">
                          <img src={link} className="h-5" />
                        </a>
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <div className="flex justify-center items-center">
                        <div className="relative inline-block">
                          <div
                            className="text-blue-600 cursor-pointer"
                            onMouseEnter={() => setShowTooltipId(item._id)}
                            onMouseLeave={() => setShowTooltipId(null)}
                            onClick={() => alert(item.query)}
                          >
                            Show Query
                          </div>
                          {showTooltipId === item._id && (
                            <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-[350px] bg-black text-white text-center rounded p-2 z-10 ml-2">
                              <span className="absolute top-1/2 right-full transform -translate-y-1/2 border-transparent border-5 border-r-black"></span>
                              {item.query}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <div className="cursor-pointer flex items-center justify-center">
                        <a href={item.video} target="blank">
                          <img src={link} className="h-5" />
                        </a>
                      </div>
                    </td>
                    <td className="px-2 py-2 ">
                      <div className="flex justify-center items-center">
                        {item.report?.total > 0 ? (
                          <div>{item.report?.total || 0}</div>
                        ) : (
                          <div>0</div>
                        )}
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <div className="flex justify-center items-center">
                        <button
                          onClick={() => navigate(`/evaluate?id=${item._id}`)}
                        >
                          {item.report?.total ? (
                            <>Re-Evaluate</>
                          ) : (
                            <>Evaluate</>
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <div className="flex items-center justify-center">
                        <button
                          disabled={item.report?.total <= 0}
                          aria-label={`Send email to ${item.email}`}
                          onClick={() => sendMail(item.email)}
                        >
                          {item?.isMailSend ? <>Resend</> : <>Send</>}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[600px]">
          <Loader />
        </div>
      )}

      {error && (
        <div className="error flex items-center justify-center h-[600px]">
          {}
        </div>
      )}
      {/* <ToastContainer/> */}
    </>
  );
}
export default StudentTable;
