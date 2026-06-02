import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    // Product_Id, Product_Name
    const [Product_Id, setProduct_Id] = useState("");
    const [Product_Name, setProduct_Name] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(""); 
    const navigate = useNavigate();

    const handleAddProduct = async () => {
        try {
            const res = await axios.post('http://localhost:3000/product/addNew', { Product_Id, Product_Name }, { withCredentials: true });
           setMessage(res.data.message);
           navigate('/product/list');
        } catch (err) {
            console.error(err);
            setError(err?.response?.data?.message || "Error occured");
        }
    }

    return (
        <div className="min-h-screen bg-blue-100 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg w-1/5">
           <h1 className="text-center text-xl text-blue-500 font-bold">Add Product Portal</h1>
           {message && (
            <p>{message}</p>
           )}
           {error && (
            <p>{error}</p>
           )}

            <div className="mt-2">
                <label htmlFor="" className="text-blue-500 block">Product Id</label>
                <input type="text" 
                placeholder="Product Id"
                className="bg-gray-300 w-full py-3 px-3 rounded-full text-white font-bold focus:outline-2 focus:outline-blue-200"
                onChange={(e) => setProduct_Id(e.target.value)} />
            </div>
            <div className="mt-2">
                <label htmlFor="" className="text-blue-500 block">Product Name</label>
                <input type="text" 
                placeholder="Product Name"
                className="bg-gray-300 w-full py-3 px-3 rounded-full text-white font-bold focus:outline-2 focus:outline-blue-200"
                onChange={(e) => setProduct_Name(e.target.value)} />
            </div>

            <button
              className="mt-4 bg-blue-300 w-full py-3 px-3 rounded-full text-white font-bold hover:bg-blue-400 transition-colors" 
              onClick={handleAddProduct}
            >
                Save
            </button>
        </div>
        </div>
    )
}

export default AddProduct;