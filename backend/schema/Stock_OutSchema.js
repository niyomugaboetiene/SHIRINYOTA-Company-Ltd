import mongoose from "mongoose";

const Stock_OutSchema = new mongoose.Schema({
    // Product_Id(FK),Date,Quantity
    Product_Id: { type: mongoose.Schema.Types.ObjectId, required: true,ref: "Products" },
    Date: { type: Date, default: Date.now() },
    Quantity: { type: Number, required: true },
});

const Stock_Out = mongoose.model("Stock_Outs", Stock_OutSchema);

export default Stock_Out;