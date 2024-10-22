import express, { Express, NextFunction, Request } from "express";
import { router as userRouter } from "./routes/user.js";
import { router as roomRouter } from "./routes/room.js";
import { router as dmRouter } from "./routes/dm.js";

const port: number = Number(process.env.PORT || 1989);
const app: Express = express();

app.use("/", express.json());

app.use("/", express.static("./dist"));
app.use("/", (req: Request, _, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

app.use("/api/user", userRouter);
app.use("/api/room", roomRouter);
app.use("/api/dm", dmRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
