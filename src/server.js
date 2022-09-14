import express, { urlencoded } from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import UserRouter from "./routers/userRouter";
import boardRouter from "./routers/boardRouter";


const app = express();
// 로그관리 미들웨어 morgan 
const loggerMiddleware = morgan("dev");

// PUG 기본엔진, 경로 지정
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(loggerMiddleware);

// 클라이언트로 부터 받은 http 요청 메시지 형식에서 body데이터를 해석하기위해
app.use(express.urlencoded({extended:true}));

app.use("/", rootRouter);


export default app;