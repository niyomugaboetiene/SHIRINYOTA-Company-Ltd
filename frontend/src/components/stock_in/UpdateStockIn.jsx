import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const UpdateStockIn = () => {
    // Product_Id(FK),Date,Quantity,Unit_Price,Total_Price
    const [Product_Id, setProduct_Id] = useState("");
    const [Date, setDate] = useState("");
    const [Quantity, setQuantity] = useState(0);
    const [Unit_Price, setUnit_Price] = useState(0);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(""); 
    const { _id } = useParams();
    const [product, setProduct] = useState(null);

     const handleGetExistingStock = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/stockIn/list/${_id}`);
            const data = res.data.list;

            setProduct_Id(data.Product_Id);
            setQuantity(data.Quantity);
            setUnit_Price(data.Unit_Price);
        } catch (err) {
            console.error(err);
        }
    }

    const handleUpdateStockIn = async () => {
        try {
            const res = await axios.put(`http://localhost:3000/stockIn/update/${_id}`, { Product_Id, Date, Quantity, Unit_Price });
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

    useEffect(() => {
        handleGetExistingStock();
    }, [_id]);

    return (
        <div className="min-h-screen bg-blue-100 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg w-1/5">
           <h1 className="text-center text-xl text-blue-500 font-bold">Update Stock In Portal</h1>
           {message && (
            <p>{message}</p>
           )}
           {error && (
            <p>{error}</p>
           )}
            <div className="mt-2">
                 <label className="block text-blue-500">Product</label>
                 <select value={Product_Id} onChange={(e) => setProduct_Id(e.target.value)} className="bg-gray-300 w-full py-3 px-3 rounded-full text-white font-bold focus:outline-2 focus:outline-blue-200">
                    {product?.map((prod, index) => (
                        <option value={prod._id} key={index}>{prod.Product_Name}</option>
                    ))}
                 </select>
            </div>
            <div className="mt-2">
                <label htmlFor="" className="text-blue-500 block">Date</label>
                <input type="date"  value={Date}
                className="bg-gray-300 w-full py-3 px-3 rounded-full text-white font-bold focus:outline-2 focus:outline-blue-200"
                onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="mt-2">
                <label htmlFor="" className="text-blue-500 block">Quantity</label>
                <input type="number" value={Quantity}
                className="bg-gray-300 w-full py-3 px-3 rounded-full text-white font-bold focus:outline-2 focus:outline-blue-200"
                onChange={(e) => setQuantity(e.target.value)} />
            </div>
            <div className="mt-2">
                <label htmlFor="" className="text-blue-500 block">Unit Price</label>
                <input type="number"  value={Unit_Price}
                className="bg-gray-300 w-full py-3 px-3 rounded-full text-white font-bold focus:outline-2 focus:outline-blue-200"
                onChange={(e) => setUnit_Price(e.target.value)} />
            </div>

            <button
              className="mt-4 bg-blue-300 w-full py-3 px-3 rounded-full text-white font-bold hover:bg-blue-400 transition-colors" 
              onClick={handleUpdateStockIn}
            >
                Save
            </button>
        </div>
        </div>
    )
}

export default UpdateStockIn;