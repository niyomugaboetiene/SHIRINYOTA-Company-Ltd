import express from "express";
import cors from "cors";
import session from "express-session";
import ProductRoute from "./routes/ProductRoute.js";
import StockInRoute from "./routes/Stock_InRoute.js";
import StockOutRoute from "./routes/Stock_OutRoute.js";

const app = express();