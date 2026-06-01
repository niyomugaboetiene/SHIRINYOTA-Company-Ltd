import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const AddStockIn = () => {
    // Product_Id(FK),Date,Quantity,Unit_Price,Total_Price
    const [Product_Id, setProduct_Id] = useState("");
    const [Date, setDate] = useState("");
    const [Quantity, setQuantity] = useState(0);
    const [Unit_Price, setUnit_Price] = useState(0);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(""); 
    const [product, setProduct] = useState(null);

    const handleAddStockIn = async () => {
        try {
            const res = await axios.post('http://localhost:3000/stockIn/addNew', { Product_Id, Date, Quantity, Unit_Price });
           setMessage(res.data.message);
        } catch (err) {
            console.error(err);
            setError(err?.response?.data || "Error occured");
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
        <div>
           <h1>Add Stock In Portal</h1>
            <div>
                 <label>Product</label>
                 <select onChange={(e) => setProduct_Id(e.target.value)}>
                    {product?.map((prod, index) => (
                        <option value={prod._id} key={index}>{prod.Product_Name}</option>
                    ))}
                 </select>
            </div>
            <div>
                <label htmlFor="">Date</label>
                <input type="date" onChange={(e) => setDate(e.target.value)} />
            </div>
            {/* Quantity,Unit_Price */}
            <div>
                <label htmlFor="">Quantity</label>
                <input type="number" onChange={(e) => setQuantity(e.target.value)} />
            </div>
            <div>
                <label htmlFor="">Unit Price</label>
                <input type="number" onChange={(e) => setUnit_Price(e.target.value)} />
            </div>

            <button onClick={handleAddStockIn}>Save</button>
        </div>
    )
}

export default AddStockIn;