import express, { Express, NextFunction, Request } from "express";
import { router as userRouter } from "./routes/user.js";
import { router as roomRouter } from "./routes/room.js";

const port: number = Number(process.env.PORT || 1234);
const app: Express = express();

app.use("/", express.json());

app.use("/", (req: Request, _, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

app.use("/", express.static("./src"));

app.use("/user", userRouter);
app.use("/room", roomRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
