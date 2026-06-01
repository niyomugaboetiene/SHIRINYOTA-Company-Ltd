import mongoose from "mongoose";

const connection = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/shirinyota');
        console.log("connected successfully");
    } catch (err) {
        console.error(err);
    }
} 

connection();

export default connection;