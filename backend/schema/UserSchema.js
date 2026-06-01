import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    // UserId(PK),User_Name,Password)
    User_Name: { type: String, required: true },
    Password: { type: String, required: true }
});

const User = mongoose.model("users", UserSchema);

export default User;