import Stock_In from "../schema/Stock_InSchema.js";
import express from "express";
import Stock_Out from "../schema/Stock_OutSchema.js";

const router = express.Router();

function isAuthorized (req, res, next) {
    try {
        if (!req.session.user) {
            return res.status(401).json({ message: 'Login first.' });
        }

        next();
    } catch (err) {
        console.error(err);
    }
}

router.post('/addNew', isAuthorized, async (req, res) => {
    try {
        // Product_Id(FK),Date,Quantity,Unit_Price,Total_Price
        const { Product_Id, Date, Quantity, Unit_Price } = req.body;

        if (!Product_Id || !Date || !Quantity || !Unit_Price) {
            return res.status(400).json({ message: 'Fill out missing fields' });
        }

        const Total_Price = Number(Quantity) * Number(Unit_Price);

        const newStockIn = await Stock_In.create({ Product_Id, Date, Quantity, Unit_Price, Total_Price });

        return res.status(201).json({ message: 'New Stock In', stockIn: newStockIn });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/list', isAuthorized, async (req, res) => {
    try {
        const list = await Stock_In.find().populate("Product_Id");

        return res.status(200).json({ list: list });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/list/:_id', isAuthorized, async (req, res) => {
    try {
        const _id = req.params._id;

        if (!_id) {
            return res.status(400).json({ message: 'Enter Id'});
        }

        const list = await Stock_In.findById(_id).populate("Product_Id");

        return res.status(200).json({ list: list });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/update/:_id', isAuthorized, async (req, res) => {
    try {
        const { _id } = req.params;

        const { Product_Id, Date, Quantity, Unit_Price } = req.body;

        let updated = {};

        if (Product_Id) updated.Product_Id = Product_Id;
        if (Date) updated.Date = Date;
        if (Quantity) updated.Quantity = Quantity;
        if (Unit_Price) updated.Unit_Price = Unit_Price;
       
        const Total_Price = Number(Quantity) * Number(Unit_Price);

        if (Total_Price) updated.Total_Price = Total_Price;

        const updatedStockIn = await Stock_In.findByIdAndUpdate(_id, updated, { new: true });

        return res.status(200).json({ message: 'Updated stock out', updated: updatedStockIn });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });   
    }
});

router.delete('/delete/:_id', isAuthorized, async (req, res) => {
    try {
        const _id = req.params._id;

        await Stock_In.findByIdAndDelete(_id);

        return res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


// report
router.get('/report/daily', isAuthorized, async (req, res) => {
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
        
        const stockIn = await Stock_In.find({
            Date: { $gte: startOfTheDay, $lte: endOfTheDay }
        }).populate("Product_Id");

        return res.status(200).json({ message: 'Daily report', report: stockIn });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// weekly
router.get('/report/weekly', isAuthorized, async (req, res) => {
    try {
        const today = new Date();
        const sevenDayAgo = new Date();
        sevenDayAgo.setDate(today.getDate() - 7);

        const stockIn = await Stock_In.find({
            Date: {
                $gte: sevenDayAgo, $lte: today
            }
        }).populate("Product_Id");

        return res.status(200).json({ message: 'Weekly report', report: stockIn });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Intenal server error' });
    }
});

// monthly
router.get('/report/monthly', isAuthorized, async (req, res) => {
    try {
        const today = new Date();
        
        const startOfTheMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

        const stockIn = await Stock_In.find({
            Date: { $gte: startOfTheMonth }
        }).populate("Product_Id");

        return res.status(200).json({ message: 'Monthly report', report: stockIn });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// totals
router.get('/report/totals', isAuthorized, async (req, res) => {
    try {
        const stockOut = await Stock_Out.find();
        const stockIn = await Stock_In.find();

        const totalStockInQuantity = stockIn.reduce((item, total) => {
            return item + total.Quantity
        }, 0);
        
        const totalStockInAmouth = stockIn.reduce((item, total) => {
            return item + total.Total_Price
        }, 0);

        const totalStockOutQuantity = stockOut.reduce((item, total) => {
            return item + total.Quantity
        }, 0);

        const remainingStock = totalStockInQuantity - totalStockOutQuantity;

        return res.status(200).json({ message: 'Totals', totals: { totalStockInAmouth, totalStockInQuantity, totalStockOutQuantity, remainingStock }});
    } catch (err) {
        console.error(err);
    }
})
export default router;