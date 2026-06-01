import Stock_Out from "../schema/Stock_OutSchema.js";
import express from "express";
import Stock_In from "../schema/Stock_InSchema.js";

const router = express.Router();

router.post('/addNew', async (req, res) => {
    try {
        // Product_Id(FK),Date,Quantity,
        const { Product_Id, Date, Quantity } = req.body;

        if (!Product_Id || !Date || !Quantity) {
            return res.status(400).json({ message: 'Fill out missing fields' });
        }

        const stocksIn = await Stock_In.find({ Product_Id: Product_Id });

        const totalQuantity = stocksIn.reduce((total, item) => {
            return total + item.Quantity
        }, 0);

        if (Quantity > totalQuantity) {
            return res.status(403).json({ messsage: `You dont have enough stock. your stock is ${totalQuantity}`})
        }

        const newStockOut = await Stock_Out.create({ Product_Id, Date, Quantity });

        return res.status(201).json({ message: 'New Stock Out', stockOut: newStockOut });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/list', async (req, res) => {
    try {
        const list = await Stock_Out.find();

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

        const list = await Stock_Out.findById(_id);

        return res.status(200).json({ list: list });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/update/:_id', async (req, res) => {
    try {
        const { _id } = req.params;

        const { Product_Id, Date, Quantity } = req.body;

        let updated = {};

        if (Product_Id) updated.Product_Id = Product_Id;
        if (Date) updated.Date = Date;
        if (Quantity) updated.Quantity = Quantity;
       
        const stocksIn = await Stock_In.find({ Product_Id: Product_Id });

        const totalQuantity = stocksIn.reduce((total, item) => {
            return total + item.Quantity
        }, 0);

        if (Quantity > totalQuantity) {
            return res.status(403).json({ messsage: `You dont have enough stock. your stock is ${totalQuantity}`})
        }

        const updatedStockIn = await Stock_Out.findByIdAndUpdate(_id, updated, { new: true });

        return res.status(200).json({ message: 'Updated Stock out', updated: updatedStockIn });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });   
    }
});

router.delete('/delete/:_id', async (req, res) => {
    try {
        const _id = req.params._id;

        await Stock_Out.findByIdAndDelete(_id);

        return res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// report
router.get('/report/daily', async (req, res) => {
    try {
        const today = new Date();

        const startOfTheDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );

        const endOfTheDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1
        );

        const stockOut = Stock_Out.find({
            Date: { $gte: startOfTheDay, $lte: endOfTheDay }
        });

        return res.status(200).json({ message: 'Daily report', report: stockOut });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;