import User from "../schema/UserSchema.js";
import express from "express";
import bcrypt from "bcrypt";


const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { User_Name, Password } = req.body;

        if (!User_Name || !Password) {
            return res.status(400).json({ message: 'Fill out missing fields' });
        }

        const isUserNameExist = await User.find({ User_Name });

        if (isUserNameExist.length > 0) {
            return res.status(403).json({ message: 'User name already taken' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        const newUser = await User.create({ User_Name, Password: hashedPassword });

        return res.status(201).json({ message: 'New user added successfully' });
    } catch (err) {
        console.error(err);
    }
});


router.post('/login', async (req, res) => {
    try {
        const { User_Name, Password } = req.body;

        if (!User_Name || !Password) {
            return res.status(400).json({ message: 'Fill out missing fields' });
        }

        const isUserNameExist = await User.find({ User_Name });

        if (!isUserNameExist) {
            return res.status(403).json({ message: 'Invalid User name' });
        }

        const hashedPassword = isUserNameExist.Password;

        const isPasswordCorrect = await bcrypt.compare(Password, hashedPassword);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Incorrect Password' });
        }

        req.session.user = {
            _id: isUserNameExist._id,
            User_Name: isUserNameExist.User_Name
        }

        return res.status(201).json({ message: 'Logged in successfully', user: req.session.user });
    } catch (err) {
        console.error(err);
    }
});