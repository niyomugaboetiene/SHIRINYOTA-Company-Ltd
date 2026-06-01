import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DailyReport = () => {
    const [stockInReport, setStockInReport] = useState(null);
    const [stockOutReport, setStockOutReport] = useState(null);
    const [totals, setTotals] = useState(null);
    

    const handleGetStockOutReport = async () => {
        try {
           const res = await axios.get('http://localhost:3000/stockOut/report/daily');
           setStockOutReport(res.data.report);
        } catch (error) {
            console.error(error);
        }
    }

    const handleGetStockInReport = async () => {
        try {
           const res = await axios.get('http://localhost:3000/stockIn/report/daily');
           setStockInReport(res.data.report);
        } catch (error) {
            console.error(error);
        }
    }

    const handleGetStockTotals = async () => {
        try {
           const res = await axios.get('http://localhost:3000/stockIn/report/totals');
           setTotals(res.data.totals);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleGetStockInReport();
    }, []);

    useEffect(() => {
        handleGetStockTotals();
    }, []); 
  
    useEffect(() => {
        handleGetStockOutReport();
    }, []);

    return (
        <div className="bg-blue-50 min-h-screen">
            <div>
                <h1>Reports</h1>
                <div>
                     
                </div>
            </div>
            <div className="max-w-7xl mx-auto w-full">
                <h1 className="text-xl text-center font-bold text-blue-500">Stock Out Daily Report</h1>
                <table className="w-full">
                    <thead className="bg-amber-500 text-gray-800">
                        <tr>
                            <th className="py-3 px-2 text-left">Product Id</th>
                            <th className="py-3 px-2 text-left">Product Name</th>
                            <th className="py-3 px-2 text-left">Date</th>
                            <th className="py-3 px-2 text-left">Quantity</th>
                            <th className="py-3 px-2 text-left">Actions</th>
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
                                    <Link className="bg-amber-500 py-2 px-6 rounded-lg text-white hover:bg-amber-400 transition-colors">View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="max-w-7xl mx-auto w-full mt-12">
                <h1 className="text-xl text-center font-bold text-blue-500">Stock In Daily Report</h1>
                <table className="w-full">
                    <thead className="bg-amber-500 text-gray-800">
                        <tr>
                            <th className="py-3 px-2 text-left">Product Id</th>
                            <th className="py-3 px-2 text-left">Product Name</th>
                            <th className="py-3 px-2 text-left">Date</th>
                            <th className="py-3 px-2 text-left">Quantity</th>
                            <th className="py-3 px-2 text-left">Unit Price</th>
                            <th className="py-3 px-2 text-left">Total Price</th>
                            <th className="py-3 px-2 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {stockInReport?.map((product, index) => (
                            <tr key={index} className="bg-blue-100 text-gray-800">
                                <td className="py-3 px-2 text-left">{product.Product_Id?.Product_Id}</td>
                                <td className="py-3 px-2 text-left">{product.Product_Id?.Product_Name}</td>
                                <td className="py-3 px-2 text-left">{new Date(product.Date).toLocaleDateString()}</td>
                                <td className="py-3 px-2 text-left">{product.Quantity}</td>
                                <td className="py-3 px-2 text-left">{product.Unit_Price}</td>
                                <td className="py-3 px-2 text-left">{product.Total_Price}</td>
                                <td>
                                    <Link className="bg-amber-500 py-2 px-6 rounded-lg text-white hover:bg-amber-400 transition-colors">View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DailyReport;