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
});

router.get('/list', async (req, res) => {
    try {
        const list = await Product.find();

        return res.status(200).json({ list: list });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/list/:_id', async (req, res) => {
    try {
        const _id = req.params._id;

        if (!_id) {
            return res.status(400).json({ message: 'Enter Id'});
        }

        const list = await Product.findById(_id);

        return res.status(200).json({ list: list });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/update/:_id', async (req, res) => {
    try {
        const { _id } = req.params;

        const { Product_Id, Product_Name } = req.body;

        let updated = {};

        if (Product_Id) updated.Product_Id = Product_Id;
        if (Product_Name) updated.Product_Name = Product_Name;

        const updatedProduct = await Product.findByIdAndUpdate(_id, updated, { new: true });

        return res.status(200).json({ message: 'Updated product', updated: updatedProduct });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });   
    }
});

router.delete('/delete/:_id', async (req, res) => {
    try {
        const _id = req.params._id;

        await Product.findByIdAndDelete(_id);

        return res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;