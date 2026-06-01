import { useEffect, useState } from "react";
import axios from "axios";

const Report = () => {
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
                            <th>Product Id</th>
                            <th>Product Id</th>
                        </tr>
                    </thead>

                    <tbody>
                        {stockOutReport?.map((product, index) => (
                            <tr>
                                <td>{product.Product_Id?.Product_Id}</td>
                                <td>{product.Product_Id?.Product_Name}</td>
                                <td>{new Date(product.Date).toLocaleDateString()}</td>
                                <td>{product.Quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}