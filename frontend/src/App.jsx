import { BrowserRouter, Routes, Route } from "react-router-dom"

import DailyReport from "./components/stock_in/DailyReport"
import WeeklyReport from "./components/stock_in/WeeklyReport"
import MonthlyReport from "./components/stock_in/MonthlyReport"

import AddStockIn from "./components/stock_in/AddStockIn"

function App() {

  return (
    <BrowserRouter>
       <Routes>
          <Route path="/report/daily" element={<DailyReport />}/>
          <Route path="/report/weekly" element={<WeeklyReport />}/>
          <Route path="/report/monthly" element={<MonthlyReport />}/>

          <Route path="/stockIn/add" element={<AddStockIn />}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App
