import Stock_Out from "../schema/Stock_OutSchema.js";
import express from "express";
import Stock_In from "../schema/Stock_InSchema.js";

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

router.get('/list', isAuthorized, async (req, res) => {
    try {
        const list = await Stock_Out.find().populate("Product_Id");

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

        const list = await Stock_Out.findById(_id).populate("Product_Id");

        return res.status(200).json({ list: list });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/update/:_id', isAuthorized, async (req, res) => {
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
            return res.status(403).json({ message: `You dont have enough stock. your stock is ${totalQuantity}`})
        }

        const updatedStockIn = await Stock_Out.findByIdAndUpdate(_id, updated, { new: true });

        return res.status(200).json({ message: 'Updated Stock out', updated: updatedStockIn });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });   
    }
});

router.delete('/delete/:_id', isAuthorized, async (req, res) => {
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
        
        const stockOut = await Stock_Out.find({
            Date: { $gte: startOfTheDay, $lte: endOfTheDay }
        }).populate("Product_Id");

        return res.status(200).json({ message: 'Daily report', report: stockOut });
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

        const stockOut = await Stock_Out.find({
            Date: {
                $gte: sevenDayAgo, $lte: today
            }
        }).populate("Product_Id");

        return res.status(200).json({ message: 'Weekly report', report: stockOut });
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

        const stockOut = await Stock_Out.find({
            Date: { $gte: startOfTheMonth }
        }).populate("Product_Id");

        return res.status(200).json({ message: 'Monthly report', report: stockOut });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;