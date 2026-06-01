import { BrowserRouter, Routes, Route } from "react-router-dom"
import DailyReport from "./components/stock_in/DailyReport"
function App() {

  return (
    <BrowserRouter>
       <Routes>
          <Route path="/report/daily" element={<DailyReport />}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App
