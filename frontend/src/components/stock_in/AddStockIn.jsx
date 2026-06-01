import axios from "axios";
import { useState } from "react";

const HandleAddStockIn = () => {
    // Product_Id(FK),Date,Quantity,Unit_Price,Total_Price
    const [Product_Id, setProduct_Id] = useState("");
    const [Date, setDate] = useState("");
    const [Quantity, setQuantity] = useState(0);
    const [Unit_Price, setUnit_Price] = useState(0);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(""); 

    const handleAddStockIn = async () => {
        try {
            const res = await axios.post('http://localhost:3000/stockIn/addNew', { Product_Id, Date, Quantity, Unit_Price });
           setMessage(res.data.message);
        } catch (err) {
            console.error(err);
            setError(err?.response?.data || "Error occured");
        }
    }

    const handleGetProduc
    return (
        <div>
           <h1>Add Stock In Portal</h1>
            <div>
                 <label htmlFor="">Product</label>
                 <select >

                 </select>
            </div>
        </div>
    )
}