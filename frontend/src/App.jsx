import { BrowserRouter, Routes, Route } from "react-router-dom"

import DailyReport from "./components/stock_in/DailyReport"
import WeeklyReport from "./components/stock_in/WeeklyReport"
import MonthlyReport from "./components/stock_in/MonthlyReport"

import AddStockIn from "./components/stock_in/AddStockIn"
import StockInList from "./components/stock_in/StockInList"
import UpdateStockIn from "./components/stock_in/UpdateStockIn"

import StockOutList from "./components/stock_out/StockOutList"
import AddStockOut from "./components/stock_out/AddStockOut"
import UpdateStockOut from "./components/stock_out/UpdateStockOut"

import ProductList from "./components/Products/ProductList";
import AddProduct from "./components/Products/AddProduct"
import UpdateProduct from "./components/Products/UpdateProduct"

function App() {

  return (
    <BrowserRouter>
       <Routes>
          <Route path="/report/daily" element={<DailyReport />}/>
          <Route path="/report/weekly" element={<WeeklyReport />}/>
          <Route path="/report/monthly" element={<MonthlyReport />}/>

          <Route path="/stockIn/add" element={<AddStockIn />}/>
          <Route path="/stockIn/list" element={<StockInList />}/>
          <Route path="/stockIn/update/:_id" element={<UpdateStockIn />}/>

          <Route path="/stockOut/add" element={<AddStockOut /> }/>
          <Route path="/stockOut/list" element={<StockOutList /> }/>
          <Route path="/stockOut/update/:_id" element={<UpdateStockOut />}/>

          <Route path="/product/add" element={<AddProduct /> }/>
          <Route path="/product/list" element={<ProductList /> }/>
          <Route path="/product/update/:_id" element={<UpdateProduct />}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App
