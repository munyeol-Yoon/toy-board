import "dotenv/config";
import "./db";
import "./models/Board";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = 4040;

const handleListening = () => {
  console.log(`✅ 서버연결완료 http://localhost:${PORT}`);
};

// 포트지정
app.listen(PORT, handleListening);
