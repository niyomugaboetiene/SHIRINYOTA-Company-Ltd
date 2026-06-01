import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const AddStockOut = () => {
    // Product_Id(FK),Date,Quantity,Unit_Price,Total_Price
    const [Product_Id, setProduct_Id] = useState("");
    const [Date, setDate] = useState("");
    const [Quantity, setQuantity] = useState(0);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(""); 
    const [product, setProduct] = useState(null);

    const handleAddStockOut = async () => {
        try {
            const res = await axios.post('http://localhost:3000/stockOut/addNew', { Product_Id, Date, Quantity });
           setMessage(res.data.message);
        } catch (err) {
            console.error(err);
            setError(err?.response?.data?.message || "Error occured");
        }
    }

    const handleGetProduct = async () => {
        try {
            const res = await axios.get('http://localhost:3000/product/list');
            setProduct(res.data.list);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        handleGetProduct();
    }, []);
    return (
        <div className="min-h-screen bg-blue-100 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg w-1/5">
           <h1 className="text-center text-xl text-blue-500 font-bold">Add Stock Out Portal</h1>
           {message && (
            <p>{message}</p>
           )}
           {error && (
            <p>{error}</p>
           )}
            <div className="mt-2">
                 <label className="block text-blue-500">Product</label>
                 <select onChange={(e) => setProduct_Id(e.target.value)} className="bg-gray-300 w-full py-3 px-3 rounded-full text-white font-bold focus:outline-2 focus:outline-blue-200">
                    {product?.map((prod, index) => (
                        <option value={prod._id} key={index}>{prod.Product_Name}</option>
                    ))}
                 </select>
            </div>
            <div className="mt-2">
                <label htmlFor="" className="text-blue-500 block">Date</label>
                <input type="date" 
                className="bg-gray-300 w-full py-3 px-3 rounded-full text-white font-bold focus:outline-2 focus:outline-blue-200"
                onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="mt-2">
                <label htmlFor="" className="text-blue-500 block">Quantity</label>
                <input type="number" 
                className="bg-gray-300 w-full py-3 px-3 rounded-full text-white font-bold focus:outline-2 focus:outline-blue-200"
                onChange={(e) => setQuantity(e.target.value)} />
            </div>

            <button
              className="mt-4 bg-blue-300 w-full py-3 px-3 rounded-full text-white font-bold hover:bg-blue-400 transition-colors" 
              onClick={handleAddStockOut}
            >
                Save
            </button>
        </div>
        </div>
    )
}

export default AddStockOut;