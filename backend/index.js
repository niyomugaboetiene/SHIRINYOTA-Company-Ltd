import express from "express";
import cors from "cors";
import session from "express-session";
import ProductRoute from "./routes/ProductRoute.js";
import StockInRoute from "./routes/Stock_InRoute.js";
import StockOutRoute from "./routes/Stock_OutRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/product', ProductRoute);
app.use('/stockIn', StockInRoute);
app.use('/stockOut', StockOutRoute);


app.listen(5000, () => {
    console.log("http://localhost:5000");
});