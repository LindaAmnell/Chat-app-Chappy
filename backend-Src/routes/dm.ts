import express, { Request, Response, Router } from "express";
import { Dm } from "../interfaces/Dm.js";
import { creatDm } from "../mongoDb/Dm/creatDm.js";
import jwt from "jsonwebtoken";
import { isValidDm } from "../data/validation/validationDmMessage.js";
import { getAllDms } from "../mongoDb/Dm/getAllDms.js";
import { WithId } from "mongodb";
import { getDmsForUser, getUserData } from "./funktioner/dmUser.js";

export const router: Router = express.Router();
const { verify } = jwt;

export interface Payload {
  userId: string;
  iat: number;
}
router.get("/protected", async (req: Request, res: Response) => {

  if (!process.env.SECRET) {
    res.sendStatus(500);
    return;
  }
  let token = req.headers.authorization;

  if (!token) {
    res.sendStatus(401);
    return;
  }
  let payload: Payload;
  try {
    payload = verify(token, process.env.SECRET) as Payload;
  } catch (error) {
    res.sendStatus(400);
    return;
  }
  let userId = payload.userId;
  const user = await getUserData(userId);
  if (!user) {
    res.sendStatus(404);
    return;
  }
  const userDms = await getDmsForUser(user.name);

  res.json({ userDms, user });
});

router.get("/", async (_, res: Response<WithId<Dm>[]>) => {
  try {
    const dms: WithId<Dm>[] = await getAllDms();
    if (!dms || dms.length === 0) {
      res.sendStatus(404);
    }
    res.send(dms);
  } catch (error) {
    res.sendStatus(500);
  }
});
router.post("/", async (req: Request, res: Response) => {
  const newDm: Dm = req.body;

  if (isValidDm(newDm)) {
    try {
      await creatDm(newDm);
      res.sendStatus(201);
    } catch (error) {
      console.error("Error inserting DM:", error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(400);
  }
});
