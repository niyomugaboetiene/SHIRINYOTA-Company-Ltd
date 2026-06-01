import { BrowserRouter, Routes, Route } from "react-router-dom"
import DailyReport from "./components/stock_in/DailyReport"
import WeeklyReport from "./components/stock_in/WeeklyReport"
function App() {

  return (
    <BrowserRouter>
       <Routes>
          <Route path="/report/daily" element={<DailyReport />}/>
          <Route path="/report/weekly" element={<WeeklyReport />}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App
