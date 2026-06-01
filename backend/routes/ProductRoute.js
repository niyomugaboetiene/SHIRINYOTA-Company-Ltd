import Product from "../schema/ProductSchema.js";
import express from "express";

const router = express.Router();

router.post('/addNew', async (req, res) => {
    try {
        // Product_Id(PK), Product_Name,
        const { Product_Id, Product_Name } = req.body;

        if (!Product_Id || !Product_Name) {
            return res.status(400).json({ message: 'Fill out missing fields' });
        }

        const newProduct = await Product.create({ Product_Id, Product_Name });

        return res.status(201).json({ message: 'New Product', product: newProduct });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
})