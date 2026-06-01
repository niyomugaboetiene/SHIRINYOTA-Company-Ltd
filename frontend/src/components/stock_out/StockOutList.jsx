import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const StockOutList = () => {
    const [stockOutReport, setStockOutReport] = useState(null);


    const handleGetStockOutReport = async () => {
        try {
           const res = await axios.get('http://localhost:3000/stockOut/list');
           setStockOutReport(res.data.list);
        } catch (error) {
            console.error(error);
        }
    }

  
    useEffect(() => {
        handleGetStockOutReport();
    }, []);


    const handleDeleteStockOut = async (_id) => {
        try {
            const confrim = window.confirm("Are you sure ?");
            if (confrim ){
                await axios.delete(`http://localhost:3000/stockOut/delete/${_id}`);
               await handleGetStockOutReport();
            }
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="bg-blue-50 min-h-screen">
            <div className="max-w-7xl mx-auto w-ful">
                <h1 className="text-xl text-center font-bold text-blue-500">Stock Out List</h1>
                <table className="w-full">
                    <thead className="bg-amber-500 text-gray-800">
                        <tr>
                            <th className="py-3 px-2 text-left">Product Id</th>
                            <th className="py-3 px-2 text-left">Product Name</th>
                            <th className="py-3 px-2 text-left">Date</th>
                            <th className="py-3 px-2 text-left">Quantity</th>
                            <th className="py-3 px-2 text-left" colSpan={2}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {stockOutReport?.map((product, index) => (
                            <tr key={index} className="bg-blue-100 text-gray-800">
                                <td className="py-3 px-2 text-left">{product.Product_Id?.Product_Id}</td>
                                <td className="py-3 px-2 text-left">{product.Product_Id?.Product_Name}</td>
                                <td className="py-3 px-2 text-left">{new Date(product.Date).toLocaleDateString()}</td>
                                <td className="py-3 px-2 text-left">{product.Quantity}</td>
                                <td>
                                    <Link to={`/stockOut/update/${product._id}`} className="bg-amber-500 py-2 px-6 rounded-lg text-white hover:bg-amber-400 transition-colors">Update</Link>
                                </td>
                                <td>
                                   <button
                                    className="bg-red-500 py-2 px-6 rounded-lg text-white hover:bg-amber-400 transition-colors"
                                    onClick={() => handleDeleteStockOut(product._id)}
                                  >
                                    Delete
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StockOutList;