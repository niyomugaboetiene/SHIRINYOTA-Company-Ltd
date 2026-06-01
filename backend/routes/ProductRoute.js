import Product from "../schema/ProductSchema.js";
import express from "express";

const router = express.Router();

router.post('/addNew', async (req, res) => {
    try {
        // Product_Id(PK), Product_Name,
        const { Product_Id, Product_Name } = req.body;

        if (!Product_Id || !Product_Name) {
            return res.status()
        }
    }
})