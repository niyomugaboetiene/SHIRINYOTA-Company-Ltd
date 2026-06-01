import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DailyReport = () => {
    const [stockInReport, setStockInReport] = useState(null);
    const [stockOutReport, setStockOutReport] = useState(null);
    

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

    useEffect(() => {
        handleGetStockInReport();
    }, []); 
  
    useEffect(() => {
        handleGetStockOutReport();
    }, []);

    return (
        <div>
            <div>
                <h1>Stock Out Daily Report</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Date</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {stockOutReport?.map((product, index) => (
                            <tr key={index}>
                                <td>{product.Product_Id?.Product_Id}</td>
                                <td>{product.Product_Id?.Product_Name}</td>
                                <td>{new Date(product.Date).toLocaleDateString()}</td>
                                <td>{product.Quantity}</td>

                                <td>
                                    <Link>View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div>
                <h1>Stock In Daily Report</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Date</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {stockInReport?.map((product, index) => (
                            <tr key={index}>
                                <td>{product.Product_Id?.Product_Id}</td>
                                <td>{product.Product_Id?.Product_Name}</td>
                                <td>{new Date(product.Date).toLocaleDateString()}</td>
                                <td>{product.Quantity}</td>
                                <td>{product.Unit_Price}</td>
                                <td>{product.Total_Price}</td>
                                <td>
                                    <Link>View</Link>
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