/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./loader";
import { toast } from "react-toastify";
// import link from "../../assets/link.png";

function Queries({ selectedMentor }) {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://backend-newton-capstone-eval.onrender.com/AskQuery/queries?mentor=" +
          selectedMentor,
        {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        }
      );

      if (response.data && response.data.msg) {
        setTableData(response.data.msg);
        console.log(response.data.msg);
      }
    } catch (error) {
      //   const errorMessage = error.response
      //     ? `Error ${error.response.status}: ${error.response.data}`
      //     : "Failed to fetch data. Please check your network connection.";
      //   setError(errorMessage);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [selectedMentor]);

  const [showTooltipId, setShowTooltipId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [message, setMessage] = useState("");

  const sendMessage = async (id) => {
    try {
      const response = await fetch(
        "https://backend-newton-capstone-eval.onrender.com/AskQuery/queries",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ feedback: message, id: id }),
        }
      );

      if (response.ok) {
        toast.success("Reply sent successfully!");
        setMessage("");
        fetchData();
      } else {
        toast.error("Failed to send reply.");
      }
    } catch (error) {
      toast.error("Failed to send reply.");
      console.error("Error sending message:", error);
      alert("An error occurred while sending the message.");
    }
  };

  return (
    <>
      {!loading ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-[60px] mx-[120px]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Student name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Query
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  File
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Your Reply
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map((item) => (
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
                    <div className="flex justify-center items-center">
                      <div className="flex justify-center items-center">
                        <div className="relative inline-block">
                          <div
                            className="text-blue-600 border-b-2 border-dotted cursor-pointer"
                            onMouseEnter={() => setShowTooltipId(item._id)}
                            onMouseLeave={() => setShowTooltipId(null)}
                          >
                            Show Query
                          </div>
                          {showTooltipId === item._id && (
                            <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-[350px] bg-black text-white text-center rounded p-2 z-10 mr-2">
                              <span className="absolute top-1/2 right-full transform -translate-y-1/2 border-transparent border-5 border-r-black"></span>
                              {item.query}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-2">
                    {item?.file ? (
                      <div className="flex items-center justify-center">
                        <a href={item.file} target="blank">
                          <img src={"/link.png"} className="h-5" />
                        </a>
                      </div>
                    ) : (
                      <h3 className="pl-[2rem]">No File!</h3>
                    )}
                  </td>
                  <td className="px-2 py-2 text-center w-[40%]">
                    {item.feedback ? (
                      <div>{item.feedback}</div>
                    ) : (
                      <>
                        <button onClick={toggleModal} className="">
                          Reply
                        </button>

                        {isModalOpen && (
                          <div
                            id="static-modal"
                            className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden flex backdrop-blur-sm"
                          >
                            <div className="relative p-4 w-[50%] max-h-full">
                              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className="flex items-center justify-between p-3 border-b rounded-t dark:border-gray-600 flex-col">
                                  <button
                                    onClick={toggleModal}
                                    className="ml-auto"
                                  >
                                    X
                                  </button>
                                  <textarea
                                    name=""
                                    id=""
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="h-[200px] w-[80%] rounded-xl p-3"
                                  ></textarea>
                                </div>
                                <button
                                  onClick={() => {
                                    toggleModal();
                                    sendMessage(item._id);
                                  }}
                                  type="button"
                                  className="m-3"
                                >
                                  Send Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
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
          {error}
        </div>
      )}
    </>
  );
}

export default Queries;
