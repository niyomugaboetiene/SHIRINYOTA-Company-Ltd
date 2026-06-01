import express from "express";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute.js";
import StockInRoute from "./routes/Stock_InRoute.js";
import StockOutRoute from "./routes/Stock_OutRoute.js";
import connection from "./config/conn.js";
import session from "express-session";

connection();

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true }
}));

app.use('/product', ProductRoute);
app.use('/stockIn', StockInRoute);
app.use('/stockOut', StockOutRoute);


app.listen(3000, () => {
    console.log("http://localhost:3000");
});