import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Login = () => {
    // Product_Id, Product_Name
    const [User_Name, setUser_Name] = useState("");
    const [Password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(""); 

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:3000/user/login', { User_Name, Password }, { withCredentials: true });
           setMessage(res.data.message);
        } catch (err) {
            console.error(err);
            setError(err?.response?.data?.message || "Error occured");
        }
    }

    return (
        <div className="min-h-screen bg-blue-100 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg w-1/5">
           <h1 className="text-center text-xl text-blue-500 font-bold">Login Portal</h1>
           <p className="text-center text-sm text-blue-500 font-bold">Admin members only</p>
           {message && (
            <p>{message}</p>
           )}
           {error && (
            <p>{error}</p>
           )}

            <div className="mt-2">
                <label htmlFor="" className="text-blue-500 block">User Name</label>
                <input type="text" 
                placeholder="User Name"
                className="bg-gray-300 w-full py-3 px-3 rounded-full text-white font-bold focus:outline-2 focus:outline-blue-200"
                onChange={(e) => setUser_Name(e.target.value)} />
            </div>
            <div className="mt-2">
                <label htmlFor="" className="text-blue-500 block">Password</label>
                <input type="password" 
                placeholder="Password"
                className="bg-gray-300 w-full py-3 px-3 rounded-full text-white font-bold focus:outline-2 focus:outline-blue-200"
                onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button
              className="mt-4 bg-blue-300 w-full py-3 px-3 rounded-full text-white font-bold hover:bg-blue-400 transition-colors" 
              onClick={handleLogin}
            >
                Login
            </button>
        </div>
        </div>
    )
}

export default Login;