import mongoose from "mongoose";

const Stock_InSchema = new mongoose.Schema({
    // Product_Id(FK),Date,Quantity,Unit_Price,Total_Price
    Product_Id: { type: mongoose.Schema.Types.ObjectId, required: true,ref: "Products" },
    Date: { type: Date, default: new Date.now() },
    Quantity: { type: Number, required: true },
    Unit_Price: { type: Number, required: true },
    Total_Price: { type: Number }
});

const Stock_In = mongoose.model("Stock_ins", Stock_InSchema);

export default Stock_In;