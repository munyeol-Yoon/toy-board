import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";

const app = express();

const PORT = 4040;
// 로그관리 미들웨어 morgan 
const loggerMiddleware = morgan("dev");

const handleListening = () =>{
    console.log("✅ 서버연결완료");
}
// PUG 기본엔진, 경로 지정
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

// 포트지정
app.listen(PORT, handleListening);

app.use(loggerMiddleware);
app.use("/", rootRouter);

export default app;