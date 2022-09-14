import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
const handleError = (error) => console.log("❌ DB Erorr");
const handleOpen = () => console.log("✅ DB 연결완료");

db.on("error", handleError);
db.once("open", handleOpen);