import { useEffect, useState } from "react";
import axios from "axios";

const Report = () => {
    const [stockInReport, setStockInReport] = useState(null);
    const [stockOutRoute, setStockOutReport] = useState(null);
    

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
}