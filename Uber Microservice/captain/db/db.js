import mongoose from "mongoose";

export const connectToDb = () => {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("mongodb is connected");
    }).catch((error) => {
        console.log(error);
    })
}