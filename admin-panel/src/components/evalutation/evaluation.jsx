import { useState,useEffect } from "react";
import { useNavigate,useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";


function Evaluation() {
    const [formData, setFormData] = useState({});
   
    const [total, setTotal] = useState(0);
    const [msg,setMsg] = useState("");

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

   
  
    useEffect(() => {
      
      const id = searchParams.get("id");
  
      
      if (!id || id.trim() === "") {
        
        navigate("/home");
      }
    }, [searchParams, navigate]);
  
    const id = searchParams.get("id");
  
    if (!id || id.trim() === "") {
      return null; 
    }

    const handleMsg = (e) => {
        const { value } = e.target; 
        setMsg(value); 
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        const max = e.target.getAttribute("max");
        const newValue = parseFloat(value) || 0;
    
        if (max && newValue <= Number(max)) {
            setFormData((prevFormData) => {
                const oldValue = prevFormData[name] || 0; // Get the previous value
                const updatedFormData = { ...prevFormData, [name]: newValue };
    
                // Update total directly
                setTotal(prevTotal => prevTotal - oldValue + newValue); // Update total
    
                return updatedFormData; // Update form data properly
            });
        }
    };
    
    async function handleSubmit(e) {
        e.preventDefault();
        const data = {
            id: new URL(document.URL).searchParams.get("id"),
            evaluation: { total, ...formData },
            feedback : msg
        }

        try {
            const response = await fetch('https://backend-newton-capstone-eval.onrender.com/UploadEvaluation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                toast.success('Data saved successfully!');
                navigate("/home");
            } else {
                toast.error('Error saving data!');
               
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Network error');
        }
    };


    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-[150px] py-[10px]">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className='text-[15px]'>
                            <th scope="col" className="px-6 py-3 text-center">Main topic</th>
                            <th scope="col" className="px-6 py-3 text-center">Sub-topic</th>
                            <th scope="col" className="px-6 py-3 text-center">Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-5 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center text-[16px]">
                                HTML
                            </th>
                            <ul>
                                <li className="border-l-2 border-r-2 border-b-2 border-gray-700 px-2 py-2">
                                    Semantic HTML
                                </li>
                                <li className="border-l-2 border-r-2 border-b-2 border-gray-700 px-2 py-2">
                                    Valid HTML Markup
                                </li>
                                <li className="border-l-2 border-r-2 border-b-2 border-gray-700  px-2 py-2">
                                    Image & Media Integration
                                </li>
                                <li className="border-l-2 border-r-2 border-b-2 border-gray-700 px-2 py-2">
                                    Form Elements & Accessibility
                                </li>
                                <li className="border-l-2 border-r-2 border-b-2 border-gray-700 px-2 py-2">
                                    Clean and well-organized code
                                </li>
                            </ul>
                            <td>
                                <ul className="text-center">
                                    <li className="px-1 py-1">
                                        <input placeholder="Max 5"
                                            name="SMH"
                                            type="number"
                                            value={formData.SMH || ""}
                                            className="px-1 py-1 rounded-md w-[80%] outline-none text-center placeholder-gray-400 placeholder-opacity-40"
                                            onChange={handleChange}
                                            max={5}
                                            required
                                        />
                                    </li>
                                    <li className="px-1 py-1">
                                        <input placeholder="Max 5"
                                            name="VHM"
                                            type="int"
                                            value={formData.VHM || ""}
                                            className="px-1 py-1 rounded-md w-[80%] outline-none text-center placeholder-gray-400 placeholder-opacity-40"
                                            onChange={handleChange}
                                            max={5}
                                            required
                                        />
                                    </li>
                                    <li className="px-1 py-1">
                                        <input placeholder="Max 5"
                                            name="IMI"
                                            type="int"
                                            value={formData.IMI || ""}
                                            className="px-1 py-1 rounded-md w-[80%] outline-none text-center placeholder-gray-400 placeholder-opacity-40"
                                            onChange={handleChange}
                                            max={5}
                                            required
                                        />
                                    </li>
                                    <li className="px-1 py-1">
                                        <input placeholder="Max 5"
                                            name="FEA"
                                            type="int"
                                            value={formData.FEA || ""}
                                            className="px-1 py-1 rounded-md w-[80%] outline-none text-center placeholder-gray-400 placeholder-opacity-40"
                                            onChange={handleChange}
                                            max={5}
                                            required
                                        />
                                    </li>
                                    <li className="px-1 py-1">
                                        <input placeholder="Max 5"
                                            name="CWOC"
                                            type="int"
                                            value={formData.CWOC || ""}
                                            className="px-1 py-1 rounded-md w-[80%] outline-none text-center placeholder-gray-400 placeholder-opacity-40"
                                            onChange={handleChange}
                                            max={5}
                                            required
                                        />
                                    </li>
                                </ul>
                            </td>
                        </tr>

                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className=" font-bold text-gray-900 whitespace-nowrap dark:text-white text-center text-[16px]">
                                CSS
                            </th>
                            <ul>
                                <li className="border-l-2 border-r-2 border-b-2 border-gray-700 px-2 py-2">
                                    Layout and Positioniing
                                </li>
                                <li className="border-l-2 border-r-2 border-b-2 border-gray-700 px-2 py-2">
                                    Typography & Color Scheme
                                </li>
                                <li className="border-l-2 border-r-2 border-b-2 border-gray-700 px-2 py-2">
                                    Styling and Visual Consistency
                                </li>
                                <li className="border-l-2 border-r-2 border-b-2 border-gray-700 px-2 py-2">
                                    Responsiveness
                                </li>
                                <li className="border-l-2 border-r-2 border-b-2 border-gray-700 px-2 py-2">
                                    CSS optimization & best practices
                                </li>
                            </ul>
                            <td>
                                <ul className="text-center">
                                    <li className="px-1 py-1">
                                        <input placeholder="Max 10"
                                            className="px-1 py-1 rounded-md w-[80%] outline-none text-center placeholder-gray-400 placeholder-opacity-40"
                                            name="LP"
                                            type="int"
                                            value={formData.LP || ""}
                                            onChange={handleChange}
                                            max={10}
                                            required
                                        />
                                    </li>
                                    <li className="px-1 py-1">
                                        <input placeholder="Max 5"
                                            name="TCS"
                                            className="px-1 py-1 rounded-md w-[80%] outline-none text-center placeholder-gray-400 placeholder-opacity-40"
                                            type="int"
                                            value={formData.TCS || ""}
                                            onChange={handleChange}
                                            max={5}
                                            required
                                        />
                                    </li>
                                    <li className="px-1 py-1">
                                        <input placeholder="Max 10"
                                            name="SVC"
                                            type="int"
                                            value={formData.SVC || ""}
                                            className="px-1 py-1 rounded-md w-[80%] outline-none text-center placeholder-gray-400 placeholder-opacity-40"
                                            onChange={handleChange}
                                            max={10}
                                            required
                                        />
                                    </li>
                                    <li className="px-1 py-1">
                                        <input placeholder="Max 5"
                                            name="Resp"
                                            type="int"
                                            value={formData.Resp || ""}
                                            className="px-1 py-1 rounded-md w-[80%] outline-none text-center placeholder-gray-400 placeholder-opacity-40"
                                            onChange={handleChange}
                                            max={5}
                                            required
                                        />
                                    </li>
                                    <li className="px-1 py-1">
                                        <input placeholder="Max 5"
                                            name="COBP"
                                            type="int"
                                            value={formData.COBP || ""}
                                            className="px-1 py-1 rounded-md w-[80%] outline-none text-center placeholder-gray-400 placeholder-opacity-40"
                                            onChange={handleChange}
                                            max={5}
                                            required
                                        />
                                    </li>
                                </ul>
                            </td>
                        </tr>

                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="text-center font-bold text-gray-900 whitespace-nowrap dark:text-white text-[16px]">
                                Responsiveness & Mobile Optimization
                            </th>
                            <ul>
                                <li className="border-l-2 border-r-2 border-b-2 border-gray-700 px-2 py-2">
                                    Mobile first approach
                                </li>
                                <li className="border-l-2 border-r-2 border-b-2 border-gray-700 px-2 py-2">
                                    Device Compatibility
                                </li>
                            </ul>
                            <td>
                                <ul className="text-center">
                                    <li className="px-1 py-1">
                                        <input placeholder="Max 10"
                                            name="MFA"
                                            type="int"
                                            value={formData.MFA || ""}
                                            className="px-1 py-1 rounded-md w-[80%] outline-none text-center placeholder-gray-400 placeholder-opacity-40"
                                            onChange={handleChange}
                                            max={10}
                                            required
                                        />
                                    </li>
                                    <li className="px-1 py-1">
                                        <input placeholder="Max 10"
                                            name="DC"
                                            type="int"
                                            value={formData.DC || ""}
                                            className="px-1 py-1 rounded-md w-[80%] outline-none text-center placeholder-gray-400 placeholder-opacity-40"
                                            onChange={handleChange}
                                            max={10}
                                            required
                                        />
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-5 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center text-[16px]">
                                Visual and Function Design
                            </th>
                            <ul>
                                <li className="border-l-2 border-r-2 border-b-2 border-gray-700 px-2 py-2">
                                    Accuracy to Figma Design
                                </li>
                                <li className="border-l-2 border-r-2 border-b-2 border-gray-700 px-2 py-2">
                                    Interactive Elements & UX
                                </li>
                            </ul>
                            <td>
                                <ul className="text-center">
                                    <li className="px-1 py-1">
                                        <input placeholder="Max 10"
                                            name="AFD"
                                            type="int"
                                            value={formData.AFD || ""}
                                            className="px-1 py-1 rounded-md w-[80%] outline-none text-center placeholder-gray-400 placeholder-opacity-40"
                                            onChange={handleChange}
                                            max={10}
                                            required
                                        />
                                    </li>
                                    <li className="px-1 py-1">
                                        <input placeholder="Max 5"
                                            name="IEU"
                                            type="int"
                                            value={formData.IEU || ""}
                                            className="px-1 py-1 rounded-md w-[80%] outline-none text-center placeholder-gray-400 placeholder-opacity-40"
                                            onChange={handleChange}
                                            max={5}
                                            required
                                        />
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                            <th scope="row" className="px-5 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white text-center text-[16px]">
                                Testing and Debugging
                            </th>
                            <ul>
                                <li className="border-l-2 border-r-2 border-b-2 border-gray-700 px-2 py-2">
                                    Cross Browser Compatibility
                                </li>
                                <li className="border-l-2 border-r-2 border-b-2 border-gray-700 px-2 py-2 ">
                                    Bug free implementation
                                </li>
                            </ul>
                            <td>
                                <ul className="text-center">
                                    <li className="px-1 py-1">
                                        <input placeholder="Max 3"
                                            name="CBC"
                                            type="int"
                                            value={formData.CBC || ""}
                                            className="px-1 py-1 rounded-md w-[80%] outline-none text-center placeholder-gray-400 placeholder-opacity-40"
                                            onChange={handleChange}
                                            max={3}
                                            required
                                        />
                                    </li>
                                    <li className="px-1 py-1 ">
                                        <input placeholder="Max 2"
                                            name="BFI"
                                            type="int"
                                            value={formData.BFI || ""}
                                            className="px-1 py-1 rounded-md w-[80%] outline-none text-center placeholder-gray-400 placeholder-opacity-40"
                                            onChange={handleChange}
                                            max={2}
                                            required
                                        />
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                            <th scope="row" className="px-5 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white text-right pl-10 text-[16px]">
                                Total
                            </th>
                            <td></td>
                            <td className="text-center text-xl">
                                {total}
                            </td>
                        </tr>

                    </tbody>
                </table>
                <div className="flex w-[100%] items-center">
                
                <textarea
                name="msg"
                
                placeholder="Evaluation feedback for student....."
                className="h-[100px] w-[60%] px-3 py-3 mx-5 my-5 rounded-xl"
                value={msg}
                onChange={handleMsg}
                required
                />
                    <button type="submit" onClick={handleSubmit} className="ml-[20%] mt-2 w-[20%] h-[50%]">Submit</button>
                </div>
            </div>
        </>
    )
}

export default Evaluation;