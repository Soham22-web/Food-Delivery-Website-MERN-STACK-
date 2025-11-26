import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose
        .connect('mongodb+srv://foodel:foodel123@cluster1.rgk9llx.mongodb.net/food-del')
        .then(() => console.log("DB connected"))
        .catch((err) => console.log(err));
};
