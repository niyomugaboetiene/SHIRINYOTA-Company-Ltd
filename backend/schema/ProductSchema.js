import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    // (Product_Id(PK), Product_Name,)
    Product_Id: { type: String, required: true, unique: true },
    Product_Name: { type: String, required: true },

});

const Product = mongoose.model("Products", ProductSchema);

export default Product;